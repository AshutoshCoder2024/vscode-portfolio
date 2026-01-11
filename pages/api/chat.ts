import type { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { SYSTEM_PROMPT } from '@/lib/prompts';

// Rate limiting: simple in-memory store (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10; // Max 10 requests per minute per IP

/**
 * Simple rate limiting middleware
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(ip);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (userLimit.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  userLimit.count++;
  return true;
}

/**
 * Get client IP address from request
 */
function getClientIP(req: NextApiRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded
    ? (Array.isArray(forwarded) ? forwarded[0] : forwarded.split(',')[0])
    : req.socket.remoteAddress || 'unknown';
  return ip.trim();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Rate limiting check
    const clientIP = getClientIP(req);
    if (!checkRateLimit(clientIP)) {
      return res.status(429).json({
        error: 'Too many requests. Please try again in a minute.',
      });
    }

    // Validate request body
    const { message, conversationHistory } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (message.length > 1000) {
      return res.status(400).json({ error: 'Message too long (max 1000 characters)' });
    }

    // Validate conversation history format
    if (conversationHistory && !Array.isArray(conversationHistory)) {
      return res.status(400).json({ error: 'Invalid conversation history format' });
    }

    // Check for Gemini API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY is not set in environment variables');
      return res.status(500).json({
        error: 'Chatbot service is not configured. Please contact the administrator.',
      });
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Use generateContent directly with system instruction in the prompt
    // This approach works better with different API versions
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-pro',
    });

    // Build conversation history for Gemini
    // Filter and format history - ensure first message is from user
    let history: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];
    
    if (conversationHistory && Array.isArray(conversationHistory) && conversationHistory.length > 0) {
      // Filter out assistant messages and take only user-assistant pairs
      // Ensure we start with a user message
      const filteredHistory: Array<{ role: string; content: string }> = [];
      
      for (let i = 0; i < conversationHistory.length; i++) {
        const msg = conversationHistory[i];
        // Skip if it's the first message and it's from assistant (welcome message)
        if (i === 0 && msg.role === 'assistant') {
          continue;
        }
        filteredHistory.push(msg);
      }
      
      // Take last 10 messages (ensuring pairs)
      const recentHistory = filteredHistory.slice(-10);
      
      // Find first user message index
      let startIndex = -1;
      for (let i = 0; i < recentHistory.length; i++) {
        if (recentHistory[i].role === 'user') {
          startIndex = i;
          break;
        }
      }
      
      // Build history starting from first user message
      if (startIndex >= 0) {
        history = recentHistory.slice(startIndex).map((msg: { role: string; content: string }) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        }));
        
        // Ensure history starts with user and has proper pairs
        if (history.length > 0 && history[0].role !== 'user') {
          history = [];
        }
      }
    }

    // Use generateContent directly instead of startChat for better compatibility
    // Build the full prompt with system instruction and conversation
    let fullPrompt = SYSTEM_PROMPT + '\n\n';
    
    if (history.length > 0) {
      fullPrompt += 'Previous conversation:\n';
      history.forEach((msg) => {
        fullPrompt += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.parts[0].text}\n`;
      });
      fullPrompt += '\n';
    }
    
    fullPrompt += `User: ${message}\nAssistant:`;

    // Generate response from Gemini using generateContent
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    if (!text || text.trim().length === 0) {
      return res.status(500).json({ error: 'Failed to generate response' });
    }

    // Return successful response
    return res.status(200).json({
      message: text.trim(),
      success: true,
    });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });

    // Handle specific Gemini API errors
    if (error.message?.includes('API key') || error.message?.includes('API_KEY')) {
      return res.status(500).json({
        error: 'Invalid API configuration. Please check GEMINI_API_KEY environment variable.',
      });
    }

    if (error.message?.includes('quota') || error.message?.includes('rate limit') || error.message?.includes('429')) {
      return res.status(429).json({
        error: 'Service temporarily unavailable. Please try again later.',
      });
    }

    if (error.message?.includes('400') || error.message?.includes('Bad Request')) {
      return res.status(400).json({
        error: 'Invalid request. Please check your message format.',
      });
    }

    // Return more detailed error in development, generic in production
    const isDevelopment = process.env.NODE_ENV === 'development';
    return res.status(500).json({
      error: isDevelopment
        ? `Error: ${error.message || 'Unknown error occurred'}`
        : 'An error occurred while processing your request. Please try again.',
    });
  }
}

