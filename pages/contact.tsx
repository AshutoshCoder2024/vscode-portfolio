import { useState } from 'react';
import { VscAccount, VscMail, VscComment } from 'react-icons/vsc';
import ContactCode from '@/components/ContactCode';

import styles from '@/styles/ContactPage.module.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      setSubmitStatus({
        type: 'error',
        message: 'Please enter your name',
      });
      return;
    }

    if (!validateEmail(formData.email)) {
      setSubmitStatus({
        type: 'error',
        message: 'Please enter a valid email address',
      });
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setSubmitStatus({
        type: 'error',
        message: 'Please enter a message (at least 10 characters)',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('https://formspree.io/f/xkovbazg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your message! I will get back to you soon.',
      });
      setFormData({ name: '', email: '', message: '' });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 5000);
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Something went wrong. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.layout}>
      <h1 className={styles.pageTitle}>Contact Me</h1>
      <p className={styles.pageSubtitle}>
        Want to collaborate, hire me, or just say hi? Use the form below and
        I&apos;ll get back to you as soon as possible.
      </p>
      <div className={styles.container}>
        <div className={styles.leftPanel}>
          <ContactCode />
        </div>
        <div className={styles.rightPanel}>
          <div className={styles.contactForm}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Send a message</h2>
              <p className={styles.formSubtitle}>
                Share a few details about your project, idea, or opportunity.
              </p>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputWrapper}>
                <VscAccount className={styles.inputIcon} />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  aria-label="Your full name"
                />
              </div>
              <div className={styles.inputWrapper}>
                <VscMail className={styles.inputIcon} />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  aria-label="Your email address"
                />
              </div>
              <div className={styles.inputWrapper}>
                <VscComment className={styles.inputIcon} />
                <textarea
                  name="message"
                  placeholder="Let's create something amazing together!"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className={styles.textarea}
                />
              </div>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                aria-live="polite"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {submitStatus.type && (
                <div
                  className={`${styles.statusMessage} ${
                    submitStatus.type === 'success'
                      ? styles.success
                      : styles.error
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'Contact' },
  };
}

export default ContactPage;
