import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ContactForm } from '@/components/ContactForm';
import styles from '@/app/contact/page.module.css';

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Contact us</h1>
          <p className={styles.subtitle}>
            Have a question or want to work together? Send us a message.
          </p>
          <ContactForm source="contact" />
        </div>
      </main>
      <Footer />
    </>
  );
}
