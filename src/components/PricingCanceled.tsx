'use client';

import { useEffect, useState } from 'react';
import styles from './PricingCanceled.module.css';

export function PricingCanceled() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(
      typeof window !== 'undefined' ? window.location.search : ''
    );
    setShow(params.get('canceled') === '1');
  }, []);

  if (!show) return null;
  return (
    <p className={styles.canceled}>
      Checkout was canceled. You can try again anytime.
    </p>
  );
}
