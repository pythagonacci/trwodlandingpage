'use client';

import { useState } from 'react';
import { Button } from './Button';
import styles from './ContactForm.module.css';

type Props = { source: 'contact' | 'demo' };

export function ContactForm({ source }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const honeypot = (form.querySelector('[name="website_url"]') as HTMLInputElement)?.value;
    if (honeypot) {
      setStatus('success');
      return;
    }
    const name = (form.querySelector('[name="name"]') as HTMLInputElement)?.value ?? '';
    const email = (form.querySelector('[name="email"]') as HTMLInputElement)?.value ?? '';
    const company = (form.querySelector('[name="company"]') as HTMLInputElement)?.value ?? '';
    const message = (form.querySelector('[name="message"]') as HTMLTextAreaElement)?.value ?? '';

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim() || undefined,
          email: email.trim(),
          company: company.trim() || undefined,
          message: message.trim() || undefined,
          source,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setErrorMessage(data.error ?? 'Something went wrong.');
        return;
      }
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.success}>
        <p>Thanks for reaching out. We&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="name">
        Name
      </label>
      <input
        id="name"
        name="name"
        type="text"
        className={styles.input}
        autoComplete="name"
      />
      <label className={styles.label} htmlFor="email">
        Email <span className={styles.required}>*</span>
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        className={styles.input}
        autoComplete="email"
      />
      <label className={styles.label} htmlFor="company">
        Company
      </label>
      <input
        id="company"
        name="company"
        type="text"
        className={styles.input}
        autoComplete="organization"
      />
      <label className={styles.label} htmlFor="message">
        Message
      </label>
      <textarea
        id="message"
        name="message"
        rows={4}
        className={styles.textarea}
      />
      <div className={styles.honeypot} aria-hidden>
        <label htmlFor="website_url">Website URL</label>
        <input id="website_url" name="website_url" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {status === 'error' && (
        <p className={styles.error}>{errorMessage}</p>
      )}
      <Button type="submit" disabled={status === 'loading'} className={styles.submit}>
        {status === 'loading' ? 'Sending…' : 'Send'}
      </Button>
    </form>
  );
}
