import { useState, useEffect } from 'react';
import Link from 'next/link';
import { VscArrowRight } from 'react-icons/vsc';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';

import styles from '@/styles/HomePage.module.css';

export default function HomePage() {
  const [activeLineIndex, setActiveLineIndex] = useState(0);

  const codeLines = [
    { code: 'function HomePage() {', type: 'function' },
    { code: '  const [developerInfo, setDeveloperInfo] = useState({', type: 'variable' },
    { code: "    name: 'Ashutosh Sahu',", type: 'array-item' },
    { code: "    role: 'Full Stack Developer',", type: 'array-item' },
    { code: "    skills: ['React', 'Next.js', 'TypeScript', 'Node.js']", type: 'array-item' },
    { code: '  });', type: 'array-end' },
    { code: '', type: 'blank' },
    { code: '  const [isLoaded, setIsLoaded] = useState(false);', type: 'variable' },
    { code: '', type: 'blank' },
    { code: '  useEffect(() => {', type: 'nested-function' },
    {
      code: '    document.title = `${developerInfo.name} | Portfolio`;',
      type: 'return',
    },
    { code: '    setIsLoaded(true);', type: 'function-call' },
    { code: '  }, []);', type: 'close' },
    { code: '', type: 'blank' },
    { code: '  return (', type: 'return-object' },
    { code: '    <main className="hero-container">', type: 'object-method' },
    { code: '      <h1>{developerInfo.name}</h1>', type: 'object-method' },
    { code: '      <p>{developerInfo.role}</p>', type: 'object-method' },
    { code: '      <div className="cta">', type: 'object-method' },
    {
      code: '        <Link href="/projects">View Projects</Link>',
      type: 'object-method',
    },
    { code: '      </div>', type: 'object-method' },
    { code: '    </main>', type: 'object-method' },
    { code: '  );', type: 'close' },
    { code: '}', type: 'close-function' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLineIndex((prev) => (prev + 1) % codeLines.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.heroLayout}>
      <div className={styles.container}>
        <div className={styles.codeSection}>
          <div className={styles.codeContainer}>
            <div className={styles.editorContent}>
              <div className={styles.lineNumbers}>
                {codeLines.map((_, index) => (
                  <div
                    key={index}
                    className={`${styles.lineNumber} ${
                      index === activeLineIndex ? styles.activeLine : ''
                    }`}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>

              <div className={styles.codeEditor}>
                {codeLines.map((line, index) => (
                  <div
                    key={index}
                    className={`${styles.codeLine} ${styles[line.type]} ${
                      index === activeLineIndex ? styles.highlightedLine : ''
                    }`}
                  >
                    {line.code}
                  </div>
                ))}
              </div>

              <div className={styles.overlayGlow}></div>
            </div>
          </div>
        </div>

        <div className={styles.infoSection}>
          <h1 className={styles.developerName}>
            Ashutosh <span className={styles.accentText}>Sahu</span>
          </h1>

          <div className={styles.developerRole}>Full Stack Web Developer</div>

          <p className={styles.bio}>
            I build elegant, responsive web applications with modern
            technologies. Focused on clean code and intuitive user experiences.
          </p>

          <div className={styles.socialLinks}>
            <a
              href="https://github.com/AshutoshCoder2024"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/ashutosh-kumar-sahu-5a5713331/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://twitter.com/ashutoshsa22"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="mailto:ashutoshsahu9601@gmail.com"
              className={styles.socialIcon}
              aria-label="Email"
            >
              <HiMail />
            </a>
            <a
              href="https://instagram.com/ashutosh_sahu_18"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>

          <div className={styles.actionLinks}>
            <Link href="/projects" className={styles.primaryLink}>
              View Projects <VscArrowRight />
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.decorElements}>
        <div className={styles.codeFlare}></div>
        <div className={styles.gridLines}></div>
        <div className={styles.codeBlock1}>{'{'}</div>
        <div className={styles.codeBlock2}>{'}'}</div>
        <div className={styles.codeBlock3}>{'<>'}</div>
        <div className={styles.codeBlock4}>{'/>'}</div>
        <div className={styles.orb1}></div>
        <div className={styles.orb2}></div>
        <div className={styles.orb3}></div>
        <div className={styles.codeSymbol1}>{'()'}</div>
        <div className={styles.codeSymbol2}>{'[]'}</div>
        <div className={styles.codeSymbol3}>{'=>'}</div>
        <div className={styles.dotPattern}></div>
        <div className={styles.mobileAccent}></div>
      </div>
    </div>
  );
}


