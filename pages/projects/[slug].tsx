import Image from 'next/image';
import { GetStaticPaths, GetStaticProps } from 'next';

import { projects, Project } from '@/data/projects';
import styles from '@/styles/ProjectDetail.module.css';

interface ProjectDetailProps {
  project: Project;
}

const ProjectDetailPage = ({ project }: ProjectDetailProps) => {
  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <h1 className={styles.title}>{project.title}</h1>
      </div>

      <div className={styles.content}>
        {project.image && (
          <div className={styles.imageWrapper}>
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              className={styles.image}
              priority
            />
          </div>
        )}

        <div className={styles.info}>
          <p className={styles.description}>{project.description}</p>

          <div className={styles.actions}>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryButton}
              >
                View Live
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryButton}
              >
                View Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = projects.map((project) => ({
    params: { slug: project.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ProjectDetailProps> = async (
  context
) => {
  const slug = context.params?.slug as string;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      project,
      title: project.title,
    } as any,
  };
};

export default ProjectDetailPage;


