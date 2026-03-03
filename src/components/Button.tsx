import Link from 'next/link';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  href?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  external?: boolean;
  large?: boolean;
};

export function Button({
  children,
  variant = 'primary',
  href,
  type = 'button',
  onClick,
  disabled,
  className = '',
  external = false,
  large,
}: ButtonProps) {
  const style = [
    styles.base,
    styles[variant],
    large && styles.large,
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={style}>
          {children}
        </a>
      );
    }
    return <Link href={href} className={style}>{children}</Link>;
  }

  return (
    <button type={type} className={style} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
