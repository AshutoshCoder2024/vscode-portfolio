import { useEffect } from 'react';
import { useRouter } from 'next/router';

import Titlebar from '@/components/Titlebar';
import Sidebar from '@/components/Sidebar';
import Explorer from '@/components/Explorer';
import Bottombar from '@/components/Bottombar';
import Tabsbar from '@/components/Tabsbar';
import styles from '@/styles/Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  // set scroll to top of main content on url pathname change
  const router = useRouter();
  useEffect(() => {
    const main = document.getElementById('main-editor');
    if (main) {
      main.scrollTop = 0;
    }
  }, [router.pathname]);

  return (
    <>
      <a href="#main-editor" className={styles.skipLink}>
        Skip to main content
      </a>
      <Titlebar />
      <div className={styles.main}>
        <aside className={styles.leftSidebar} aria-label="Navigation and explorer">
          <Sidebar />
          <Explorer />
        </aside>
        <div className={styles.mainContent}>
          <Tabsbar />
          <main id="main-editor" className={styles.content} role="main" tabIndex={-1}>
            {children}
          </main>
        </div>
      </div>
      <Bottombar />
    </>
  );
};

export default Layout;
