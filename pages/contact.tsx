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
      // You can integrate with an API service like Formspree, EmailJS, or your own backend
      // For now, we'll simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
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
        Feel free to reach out to me through any of the social platforms below
        or use the contact form. I&apos;m always open to new opportunities and
        connections.
      </p>
      <div className={styles.container}>
        <div className={styles.leftPanel}>
          <ContactCode />
        </div>
        <div className={styles.rightPanel}>
          <div className={styles.contactForm}>
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
