'use client';

import { useState } from 'react';
import { Button } from './Button';
import styles from './PricingCards.module.css';

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? '';

type PaidPlanId = 'starter' | 'business';

export function PricingCards() {
  const [loading, setLoading] = useState<PaidPlanId | null>(null);

  const handlePaidPlan = async (planId: PaidPlanId) => {
    setLoading(planId);
    try {
      const res = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else throw new Error(data.error || 'Failed to create session');
    } catch (e) {
      console.error(e);
      setLoading(null);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <div className={styles.badge}>Free</div>
        <h3 className={styles.planName}>For exploring Trak</h3>
        <p className={styles.description}>
          Perfect for solo builders or brands evaluating Trak.
        </p>
        <ul className={styles.features}>
          <li className={styles.featureItem}>1 Workspace</li>
          <li className={styles.featureItem}>Up to 3 Active Projects</li>
          <li className={styles.featureItem}>Core Blocks &amp; Views</li>
          <li className={styles.featureItem}>Basic Collaboration</li>
          <li className={styles.featureItem}>Community Support</li>
        </ul>
        <Button
          href={appUrl ? `${appUrl}/signup` : '#'}
          external={!!appUrl}
          large
          className={styles.cta}
        >
          Start Free
        </Button>
      </div>

      <div className={`${styles.card} ${styles.cardPrimary}`}>
        <div className={styles.badge}>Starter</div>
        <h3 className={styles.planName}>Starter — $15 / user / month</h3>
        <p className={styles.description}>
          Move beyond scattered docs and spreadsheets. Run launches, campaigns,
          and operations in one organized workspace.
        </p>
        <ul className={styles.features}>
          <li className={styles.featureItem}>
            Includes everything in Free, plus:
          </li>
          <li className={styles.featureItem}>1 Workspace</li>
          <li className={styles.featureItem}>Unlimited Projects</li>
          <li className={styles.featureItem}>Custom Properties</li>
          <li className={styles.featureItem}>Core AI Assistance</li>
          <li className={styles.featureItem}>Standard Permissions</li>
          <li className={styles.featureItem}>Email Support</li>
        </ul>
        <Button
          large
          className={styles.cta}
          onClick={() => handlePaidPlan('starter')}
          disabled={!!loading}
        >
          {loading === 'starter' ? 'Redirecting…' : 'Start with Starter'}
        </Button>
      </div>

      <div className={styles.card}>
        <div className={styles.badge}>Business</div>
        <h3 className={styles.planName}>Business — $39 / user / month</h3>
        <p className={styles.description}>
          Manage multiple teams, divisions, or brands under one organization.
          Gain visibility across workspaces and operate with clarity.
        </p>
        <ul className={styles.features}>
          <li className={styles.featureItem}>
            Includes everything in Starter, plus:
          </li>
          <li className={styles.featureItem}>Unlimited Workspaces</li>
          <li className={styles.featureItem}>Organizations</li>
          <li className={styles.featureItem}>
            Granular Roles &amp; Access Controls
          </li>
          <li className={styles.featureItem}>Cross-Workspace Management</li>
          <li className={styles.featureItem}>Priority AI Processing</li>
          <li className={styles.featureItem}>Advanced Reporting</li>
          <li className={styles.featureItem}>Guest &amp; External Access</li>
          <li className={styles.featureItem}>Priority Support</li>
        </ul>
        <Button
          large
          className={styles.cta}
          onClick={() => handlePaidPlan('business')}
          disabled={!!loading}
        >
          {loading === 'business' ? 'Redirecting…' : 'Upgrade to Business'}
        </Button>
      </div>
    </div>
  );
}
