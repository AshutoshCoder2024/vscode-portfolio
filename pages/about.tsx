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
      Hi, I’m a BCA student and a passionate full-stack developer with a strong
      focus on building modern, scalable web applications. I primarily work
      with JavaScript and contemporary web technologies to turn ideas into
      reliable digital solutions.
    </p>
    <p className={styles.paragraph}>
      My core expertise lies in the MERN stack — React, Node.js, Express, and
      MongoDB. I enjoy developing real-world projects that solve practical
      problems while following clean code practices and efficient
      architectures.
    </p>
  </section>

  <section className={styles.section}>
    <h2 className={styles.sectionTitle}>Experience</h2>
    <p className={styles.paragraph}>
      I recently completed a Web Development Internship at{' '}
      <span className={styles.highlight}>
        Central Coalfields Limited (CCL), Ranchi
      </span>
      , where I gained hands-on experience working on real organizational
      challenges.
    </p>
    <p className={styles.paragraph}>
      During my internship, I designed and developed an Internship Management
      System that streamlined application handling, improved tracking, and
      enhanced communication between students and administrators.
    </p>
  </section>

  <section className={styles.section}>
    <h2 className={styles.sectionTitle}>Community & Learning</h2>
    <p className={styles.paragraph}>
      I am continuously strengthening my skills in Data Structures & Algorithms,
      backend system architecture, and system design. Alongside my technical
      growth, I lead a tech community in my college where I organize workshops,
      share industry trends, and encourage collaborative learning.
    </p>
  </section>

  <section className={styles.section}>
    <h2 className={styles.sectionTitle}>Beyond Code</h2>
    <p className={styles.paragraph}>
      Beyond coding, I enjoy mentoring peers, solving technical challenges, and
      exploring emerging technologies. I actively stay updated with the latest
      trends in AI, web development, and software engineering to continuously
      evolve as a developer.
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
