import styles from '../styles/ContactCode.module.css';

const contactItems = [
  {
    social: 'website',
    link: 'krishnamkatiyar.in',
    href: 'https://krishnamkatiyar.in',
  },
  {
    social: 'email',
    link: 'krishnamkatiyar@gmail.com',
    href: 'mailto:krishnamkatiyar@gmail.com',
  },
  {
    social: 'github',
    link: 'KrishnamKatiyar',
    href: 'https://github.com/KrishnamKatiyar',
  },
  {
    social: 'linkedin',
    link: 'krishnamkatiyar',
    href: 'https://www.linkedin.com/in/krishnamkatiyar/',
  },
  {
    social: 'twitter',
    link: 'KrishnamKatiyar',
    href: 'https://x.com/KrishnamKatiyar',
  },
  {
    social: 'leetcode',
    link: 'krishnamkatiyar',
    href: 'https://leetcode.com/u/krishnamkatiyar/',
  },
  {
    social: 'telegram',
    link: '@krishnamkatiyar',
    href: 'https://t.me/krishnamkatiyar',
  },
];

const ContactCode = () => {
  return (
    <div className={styles.code}>
      <p className={styles.line}>
        <span className={styles.className}>.socials</span> &#123;
      </p>
      {contactItems.slice(0, 8).map((item, index) => (
        <p className={styles.line} key={index}>
          &nbsp;&nbsp;&nbsp;{item.social}:{' '}
          <a href={item.href} target="_blank" rel="noopener">
            {item.link}
          </a>
          ;
        </p>
      ))}
      {contactItems.slice(8, contactItems.length).map((item, index) => (
        <p className={styles.line} key={index}>
          &nbsp;&nbsp;{item.social}:{' '}
          <a href={item.href} target="_blank" rel="noopener">
            {item.link}
          </a>
          ;
        </p>
      ))}
      <p className={styles.line}>&#125;</p>
    </div>
  );
};

export default ContactCode;
