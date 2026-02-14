import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  VscAccount,
  VscSettings,
  VscMail,
  VscGithubAlt,
  VscCode,
  VscFiles,
} from 'react-icons/vsc';

import styles from '@/styles/Sidebar.module.css';

const sidebarTopItems = [
  { Icon: VscFiles, path: '/' },
  { Icon: VscGithubAlt, path: '/github' },
  { Icon: VscCode, path: '/projects' },
  { Icon: VscMail, path: '/contact' },
];

const sidebarBottomItems = [
  { Icon: VscAccount, path: '/about' },
  { Icon: VscSettings, path: '/settings' },
];

const Sidebar = () => {
  const router = useRouter();

  const navLabel = 'Main navigation';
  return (
    <aside className={styles.sidebar} aria-label={navLabel}>
      <nav className={styles.sidebarTop} aria-label={navLabel}>
        {sidebarTopItems.map(({ Icon, path }) => (
          <Link
            href={path}
            key={path}
            className={`${styles.iconContainer} ${
              router.pathname === path ? styles.active : ''
            }`}
            aria-label={path === '/' ? 'Home' : path.slice(1).replace(/\//g, ' ')}
          >
            <Icon
              size={16}
              fill={
                router.pathname === path
                  ? 'rgb(225, 228, 232)'
                  : 'rgb(106, 115, 125)'
              }
              className={styles.icon}
              aria-hidden
            />
          </Link>
        ))}
      </nav>
      <nav className={styles.sidebarBottom} aria-label="Secondary navigation">
        {sidebarBottomItems.map(({ Icon, path }) => (
          <Link
            href={path}
            key={path}
            className={`${styles.iconContainer} ${
              router.pathname === path ? styles.active : ''
            }`}
            aria-label={path === '/about' ? 'About' : 'Settings'}
          >
            <Icon
              fill={
                router.pathname === path
                  ? 'rgb(225, 228, 232)'
                  : 'rgb(106, 115, 125)'
              }
              className={styles.icon}
              aria-hidden
            />
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
