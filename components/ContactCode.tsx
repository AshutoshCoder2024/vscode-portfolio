import { FaGlobe, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import styles from '@/styles/ContactCode.module.css';

const contactItems = [
  {
    social: 'website',
    link: 'ashutoshdev.in',
    href: 'https://ashutoshdev.in/',
    icon: FaGlobe,
  },
  {
    social: 'email',
    link: 'ashutoshsahu9601@gmail.com',
    href: 'mailto:ashutoshsahu9601@gmail.com',
    icon: HiMail,
  },
  {
    social: 'github',
    link: 'AshutoshCoder2024',
    href: 'https://github.com/AshutoshCoder2024',
    icon: FaGithub,
  },
  {
    social: 'linkedin',
    link: 'Ashutosh kumar sahu',
    href: 'https://www.linkedin.com/in/ashutosh-kumar-sahu-5a5713331/',
    icon: FaLinkedin,
  },
  {
    social: 'twitter',
    link: 'ashutoshsahu',
    href: 'https://twitter.com/ashutoshsa22',
    icon: FaTwitter,
  },
];

const ContactCode = () => {
  return (
    <div className={styles.code}>
      <p className={styles.line}>
        <span className={styles.className}>.socials</span> &#123;
      </p>
      {contactItems.map((item, index) => {
        const Icon = item.icon;
        return (
        <p className={styles.line} key={index}>
          &nbsp;&nbsp;&nbsp;{item.social}:{' '}
          <a href={item.href} target="_blank" rel="noopener">
            {item.link}
          </a>
            ; <Icon className={styles.inlineIcon} />
        </p>
        );
      })}
      <p className={styles.line}>&#125;</p>
    </div>
  );
};

export default ContactCode;
