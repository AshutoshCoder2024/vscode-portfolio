import Image from 'next/image';
import { VscGithubAlt } from 'react-icons/vsc';

import { Project } from '@/types';

import styles from '@/styles/ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const handleCardClick = (e: React.MouseEvent) => {
    // If clicking on the View Code link, don't trigger card click
    if ((e.target as HTMLElement).closest('.viewCodeLink')) {
      return;
    }
    window.open(project.link, '_blank', 'noopener,noreferrer');
  };

  const handleViewCodeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.githubLink) {
      window.open(project.githubLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card} onClick={handleCardClick}>
        {project.image ? (
          <div className={styles.imageContainer}>
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              className={styles.projectImage}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className={styles.imagePlaceholder}>
            <Image
              src={project.logo}
              alt={`${project.title} logo`}
              width={64}
              height={64}
              className={styles.placeholderLogo}
              loading="lazy"
            />
          </div>
        )}
      </div>
      <div className={styles.cardInfo}>
        <h3 className={styles.title}>{project.title}</h3>
        {project.category && (
          <p className={styles.category}>{project.category}</p>
        )}
        {project.githubLink && (
          <a
            href={project.githubLink}
            onClick={handleViewCodeClick}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.viewCodeLink} viewCodeLink`}
          >
            <VscGithubAlt className={styles.githubIcon} />
            <span>View Code</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
