import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { ProjectCardProps } from '../../types';

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.div
      className="bg-surface rounded-lg overflow-hidden border border-surface hover:border-accent transition-colors group"
      whileHover={{ y: -4 }}
    >
      <div className="aspect-video bg-background flex items-center justify-center">
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-muted">Project Image</span>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-background text-xs rounded-full text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        
        <p className="text-muted text-sm mb-4 line-clamp-3">
          {project.summary}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted">{project.date}</span>
          <Link
            to={`/projects/${project.slug}`}
            className="text-accent hover:underline text-sm font-medium"
          >
            View Details →
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
