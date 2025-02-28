import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { toast, Toaster } from 'react-hot-toast';
import ContactCode from '../components/ContactCode';
import styles from '../styles/ContactPage.module.css';

const EMAILJS_SERVICE_ID = 'service_58y9zxs';
const EMAILJS_TEMPLATE_ID = 'template_p86tpvd';
const EMAILJS_PUBLIC_KEY = 'PlB2Q01JKlePJeIX4';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
      };

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      if (result.status === 200) {
        toast.success('Sent successfully!');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div>
        <h3 className={styles.heading}>Reach Out Via Socials</h3>
        <ContactCode />
      </div>
      <div>
        <h3 className={styles.heading}>Or Fill Out This Form</h3>
        <form className={styles.form} onSubmit={submitForm}>
          <div className={styles.flex}>
            <div>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>
          <div>
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <textarea id="message" rows="5" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
          </div>
          <button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Submit'}</button>
        </form>
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
