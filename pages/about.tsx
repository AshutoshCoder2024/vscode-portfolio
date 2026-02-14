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
      Hi, I’m a BSc IT student and a passionate Full-Stack Developer with a strong
      focus on building modern, scalable, and user-centric web applications.
      I primarily work with JavaScript and contemporary web technologies to turn
      ideas into reliable and impactful digital solutions.
    </p>
    <p className={styles.paragraph}>
      My core expertise lies in the MERN stack — React, Node.js, Express, and
      MongoDB. I enjoy developing real-world projects that solve practical
      problems while following clean code practices, efficient architectures,
      and performance-focused development. I am also continuously improving my
      JavaScript fundamentals and backend development skills.
    </p>
  </section>

  <section className={styles.section}>
    <h2 className={styles.sectionTitle}>Experience</h2>
    <p className={styles.paragraph}>
      I recently completed a Web Development Internship at{" "}
      <span className={styles.highlight}>
        Central Coalfields Limited (CCL), Ranchi
      </span>
      , where I gained hands-on experience solving real organizational
      challenges in a professional environment.
    </p>
    <p className={styles.paragraph}>
      During my internship, I designed and developed an Internship Management
      System that streamlined application processing, improved tracking
      efficiency, and enhanced communication between students and administrators.
    </p>
  </section>

  <section className={styles.section}>
    <h2 className={styles.sectionTitle}>Community & Leadership</h2>
    <p className={styles.paragraph}>
      I actively lead the Tech Team of my college club <strong>XTS</strong>,
      where I organize technical workshops, guide students in development
      projects, and promote collaborative learning within the community.
    </p>
    <p className={styles.paragraph}>
      I am continuously strengthening my skills in Data Structures & Algorithms,
      backend system architecture, and system design while staying aligned with
      industry standards and best practices.
    </p>
  </section>

  <section className={styles.section}>
    <h2 className={styles.sectionTitle}>Beyond Code</h2>
    <p className={styles.paragraph}>
      Beyond coding, I enjoy mentoring peers, solving challenging technical
      problems, and exploring emerging technologies. I actively stay updated
      with the latest trends in AI, web development, and software engineering
      to continuously evolve as a developer.
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
