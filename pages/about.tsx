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
              Hey! I&apos;m a BCA student and passionate developer from India. I
              primarily work with JavaScript and modern web technologies.
            </p>
            <p className={styles.paragraph}>
              I focus on full stack development using React, Node.js, Express,
              and MongoDB, and I enjoy building real-world projects that solve
              practical problems.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Experience</h2>
            <p className={styles.paragraph}>
              Recently completed my internship at{' '}
              <span className={styles.highlight}>Central Coalfields Limited (CCL), Ranchi</span>{' '}
              where I worked as a Web Development Intern.
            </p>
            <p className={styles.paragraph}>
              During the internship, I built an Internship Management System to
              centralize applications, tracking, and communication. I also led
              technical responsibilities and collaborated closely with the team.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Community & Learning</h2>
            <p className={styles.paragraph}>
              I actively work on strengthening my skills in DSA, backend
              architectures, and system design. I&apos;m also building a tech
              community in my college to share roadmaps, hackathons, and tech
              trends.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Beyond Code</h2>
            <p className={styles.paragraph}>
              Beyond coding, I enjoy helping peers with technical problems,
              exploring new technologies, and staying updated with the latest
              trends in AI and web development.
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
