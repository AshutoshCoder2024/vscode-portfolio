import Link from 'next/link';

import styles from '@/styles/AboutPage.module.css';

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Ashutosh Sahu</h1>
        <div className={styles.subtitle}>Full Stack MERN Developer</div>

        <div className={styles.aboutContent}>
          <section className={styles.section}>
            <p className={styles.paragraph}>
              Hi, I&apos;m a BSc IT student and a passionate full stack developer
              focused on building modern, scalable, and user-centric web
              applications. I primarily work with the MERN stack to turn ideas
              into reliable and impactful digital products.
            </p>
            <p className={styles.paragraph}>
              My core expertise lies in React, Next.js, Node.js, Express, and
              MongoDB. I enjoy developing real-world projects that solve
              practical problems while following clean code practices, efficient
              architectures, and performance-focused development. I am also
              continuously improving my JavaScript, TypeScript, and backend
              development skills.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Experience</h2>
            <p className={styles.paragraph}>
              I recently completed a Web Development Internship at{' '}
              <span className={styles.highlight}>
                Central Coalfields Limited (CCL), Ranchi
              </span>
              , where I gained hands-on experience solving real organizational
              challenges in a professional environment.
            </p>
            <p className={styles.paragraph}>
              During my internship, I designed and developed an Internship
              Management System that streamlined application processing, improved
              tracking efficiency, and enhanced communication between students
              and administrators.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Community &amp; Leadership</h2>
            <p className={styles.paragraph}>
              I actively lead the tech team of my college club <strong>XTS</strong>,
              where I organize technical workshops, guide students in development
              projects, and promote collaborative learning within the community.
            </p>
            <p className={styles.paragraph}>
              I am continuously strengthening my skills in data structures and
              algorithms, backend system architecture, and system design while
              staying aligned with industry standards and best practices.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Beyond Code</h2>
            <p className={styles.paragraph}>
              Beyond coding, I enjoy mentoring peers, solving challenging
              technical problems, and exploring emerging technologies. I stay
              updated with the latest trends in AI, web development, and
              software engineering to continuously evolve as a developer.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Explore My Work</h2>
            <p className={styles.paragraph}>
              Browse my{' '}
              <Link href="/projects" className={styles.inlineLink}>
                projects
              </Link>
              , see my{' '}
              <Link href="/github" className={styles.inlineLink}>
                GitHub activity
              </Link>
              , or{' '}
              <Link href="/contact" className={styles.inlineLink}>
                get in touch
              </Link>{' '}
              if you&apos;re looking for a BSc IT full stack developer for
              internships, freelance work, or full-time roles.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'About' },
  };
}

export default AboutPage;
