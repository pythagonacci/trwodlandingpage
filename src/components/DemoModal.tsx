'use client';

import { useEffect, useRef } from 'react';
import styles from './DemoModal.module.css';

type Props = {
  open: boolean;
  onClose: () => void;
};

const DEMO_VIDEO_SRC = '/demos/hero.mp4';

export function DemoModal({ open, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  const handleClose = () => {
    dialogRef.current?.close();
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) handleClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onCancel={handleClose}
      onClick={handleBackdropClick}
      aria-label="Watch demo video"
    >
      <div className={styles.content}>
        <button
          type="button"
          className={styles.close}
          onClick={handleClose}
          aria-label="Close"
        >
          Close
        </button>
        <div className={styles.videoWrap}>
          <video
            src={DEMO_VIDEO_SRC}
            controls
            autoPlay
            className={styles.video}
          />
        </div>
      </div>
    </dialog>
  );
}
