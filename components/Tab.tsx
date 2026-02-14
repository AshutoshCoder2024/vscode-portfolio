import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import styles from '@/styles/Tab.module.css';

interface TabProps {
  icon: string;
  filename: string;
  path: string;
}

const Tab = ({ icon, filename, path }: TabProps) => {
  const router = useRouter();

  const isActive = router.pathname === path;
  return (
    <Link
      href={path}
      className={`${styles.tab} ${isActive ? styles.active : ''}`}
      aria-current={isActive ? 'page' : undefined}
    >
      <Image src={icon} alt="" height={18} width={18} aria-hidden />
      <span>{filename}</span>
    </Link>
  );
};

export default Tab;
