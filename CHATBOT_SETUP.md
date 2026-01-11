# AI Chatbot Setup Guide

This guide will help you set up the AI chatbot for your portfolio website using Google's Gemini API.

## Overview

The chatbot acts as your personal AI assistant, answering questions about your background, skills, projects, and experience. It uses Google's Gemini Pro model via the Gemini API.

## Architecture

```
Frontend (ChatBot Component)
    ↓
Next.js API Route (/api/chat)
    ↓
Gemini API (Google Generative AI)
    ↓
Response back to Frontend
```

## Setup Instructions

### 1. Install Dependencies

The Gemini SDK is already added to `package.json`. Run:

```bash
npm install
```

### 2. Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key (it will look like: `AIza...`)

### 3. Add API Key to Environment Variables

Create a `.env.local` file in your project root (if it doesn't exist):

```bash
# .env.local
GEMINI_API_KEY=your_api_key_here
```

**Important:** Never commit `.env.local` to version control. It's already in `.gitignore`.

### 4. For Production (Vercel/Netlify)

When deploying to Vercel or Netlify:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** Your Gemini API key
4. Redeploy your application

## File Structure

```
├── lib/
│   └── prompts.ts              # System prompt and prompt formatting
├── pages/
│   └── api/
│       └── chat.ts             # API route handler
├── components/
│   └── ChatBot.tsx             # Chat UI component
├── styles/
│   └── ChatBot.module.css      # Chat styling
└── pages/
    └── contact.tsx             # Contact page (includes chatbot)
```

## How It Works

### 1. System Prompt (`lib/prompts.ts`)

The system prompt defines:
- Your personal information
- Technical skills
- Professional experience
- Projects
- Community involvement
- Response guidelines

The AI is instructed to:
- Speak in third person
- Only answer questions about you
- Be professional and recruiter-friendly
- Not hallucinate information

### 2. API Route (`pages/api/chat.ts`)

The API route:
- Validates incoming requests
- Implements rate limiting (10 requests/minute per IP)
- Formats the prompt with conversation history
- Calls Gemini API
- Returns the response

**Rate Limiting:**
- 10 requests per minute per IP address
- Prevents abuse and manages API costs

### 3. Chat Component (`components/ChatBot.tsx`)

The chat component:
- Manages conversation state
- Sends messages to `/api/chat`
- Displays messages in a chat interface
- Handles loading and error states
- Maintains conversation history (last 10 messages)

### 4. Data Flow

1. **User types message** → ChatBot component
2. **ChatBot sends POST request** → `/api/chat` with message and conversation history
3. **API route validates** → Rate limit check, input validation
4. **API formats prompt** → System prompt + conversation history + user message
5. **API calls Gemini** → Sends formatted prompt to Gemini Pro
6. **Gemini generates response** → Returns AI-generated text
7. **API returns response** → JSON with message content
8. **ChatBot displays** → Shows assistant message in chat UI

## Customization

### Update Your Information

Edit `lib/prompts.ts` to update:
- Personal details
- Skills and technologies
- Projects
- Experience
- Any other information

### Modify Rate Limits

In `pages/api/chat.ts`, adjust:
```typescript
const MAX_REQUESTS_PER_WINDOW = 10; // Change this number
const RATE_LIMIT_WINDOW = 60 * 1000; // Change time window (milliseconds)
```

### Change Chatbot Appearance

Edit `styles/ChatBot.module.css` to customize:
- Colors
- Sizes
- Animations
- Layout

### Add to Different Pages

Import and use the ChatBot component anywhere:

```tsx
import ChatBot from '@/components/ChatBot';

// In your component
<ChatBot />
```

## Security Best Practices

1. **Never expose API key** - Keep it in environment variables only
2. **Rate limiting** - Prevents abuse and manages costs
3. **Input validation** - Validates message length and format
4. **Error handling** - Graceful error messages without exposing internals
5. **Production ready** - Use Redis or similar for rate limiting in production

## Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/contact` page

3. Try asking:
   - "What are Ashutosh's skills?"
   - "Tell me about his projects"
   - "What is his experience?"
   - "What technologies does he know?"

## Troubleshooting

### Chatbot not responding

1. Check if `GEMINI_API_KEY` is set in `.env.local`
2. Verify API key is valid
3. Check browser console for errors
4. Check server logs for API errors

### Rate limit errors

- Wait a minute before trying again
- Increase rate limit in `pages/api/chat.ts` if needed

### API errors

- Verify Gemini API key is correct
- Check API quota/limits in Google AI Studio
- Ensure you have internet connection

## Production Considerations

For production, consider:

1. **Redis for rate limiting** - More scalable than in-memory
2. **Logging** - Log conversations for analytics
3. **Monitoring** - Track API usage and errors
4. **Caching** - Cache common responses
5. **Analytics** - Track popular questions

## Cost Management

Gemini API has free tier with limits. Monitor usage:
- Check [Google AI Studio Dashboard](https://makersuite.google.com/app/apikey)
- Set up billing alerts
- Consider caching common responses

## Support

For issues or questions:
- Check Gemini API documentation: https://ai.google.dev/docs
- Review Next.js API routes: https://nextjs.org/docs/api-routes/introduction

