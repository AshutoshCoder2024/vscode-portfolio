import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { VscChevronRight } from 'react-icons/vsc';

import { projects } from '@/data/projects';
import styles from '@/styles/Explorer.module.css';

const explorerItems = [
  {
    name: 'home.tsx',
    path: '/',
    icon: '/logos/react_icon.svg',
  },
  {
    name: 'about.html',
    path: '/about',
    icon: '/logos/html_icon.svg',
  },
  {
    name: 'contact.css',
    path: '/contact',
    icon: '/logos/css_icon.svg',
  },
  {
    name: 'projects.js',
    path: '/projects',
    icon: '/logos/js_icon.svg',
  },
  {
    name: 'github.md',
    path: '/github',
    icon: '/logos/markdown_icon.svg',
  },
];

const Explorer = () => {
  const [portfolioOpen, setPortfolioOpen] = useState(true);
  const [projectsOpen, setProjectsOpen] = useState(true);

  return (
    <nav className={styles.explorer} aria-label="File explorer">
      <p className={styles.title} id="explorer-title">Explorer</p>
      <div className={styles.explorerScroll}>
      <div role="group" aria-labelledby="explorer-title">
        <input
          type="checkbox"
          className={styles.checkbox}
          id="portfolio-checkbox"
          checked={portfolioOpen}
          onChange={() => setPortfolioOpen(!portfolioOpen)}
          aria-expanded={portfolioOpen}
          aria-controls="portfolio-files"
        />
        <label htmlFor="portfolio-checkbox" className={styles.heading}>
          <VscChevronRight
            className={styles.chevron}
            style={portfolioOpen ? { transform: 'rotate(90deg)' } : {}}
          />
          Portfolio
        </label>
        <div
          id="portfolio-files"
          className={styles.files}
          style={portfolioOpen ? { display: 'block' } : { display: 'none' }}
          role="list"
        >
          {explorerItems.map((item) => (
            <Link href={item.path} key={item.name}>
              <div className={styles.file}>
                <Image src={item.icon} alt={item.name} height={18} width={18} />{' '}
                <p>{item.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <input
          type="checkbox"
          className={styles.checkbox}
          id="projects-checkbox"
          checked={projectsOpen}
          onChange={() => setProjectsOpen(!projectsOpen)}
          aria-expanded={projectsOpen}
          aria-controls="projects-files"
        />
        <label htmlFor="projects-checkbox" className={styles.heading}>
          <VscChevronRight
            className={styles.chevron}
            style={projectsOpen ? { transform: 'rotate(90deg)' } : {}}
          />
          Projects
        </label>
        <div
          id="projects-files"
          className={styles.files}
          style={projectsOpen ? { display: 'block' } : { display: 'none' }}
          role="list"
        >
          {projects.map((project) => (
            <Link href={`/projects/${project.slug}`} key={project.slug}>
              <div className={styles.projectFile}>
                <span>📁</span>
                <p>{project.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      </div>
    </nav>
  );
};

export default Explorer;
