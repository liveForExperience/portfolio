import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from '../components';
import { fetchProjects } from '../services';
import { fadeUp, stagger } from '../lib/utils';
import type { Project } from '../types';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectsData = await fetchProjects();
        setProjects(projectsData);
        setFilteredProjects(projectsData);
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const filters = ['all', 'web', 'mobile', 'design', 'open-source'];

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    if (filter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter(project =>
          project.tags.some(tag => tag.toLowerCase().includes(filter))
        )
      );
    }
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="text-center mb-16"
          >
            <motion.h1 variants={fadeUp} className="text-h1 font-bold mb-6">
              Projects
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-xl text-muted max-w-2xl mx-auto"
            >
              A collection of projects showcasing my expertise in frontend
              development, design systems, and user experience.
            </motion.p>
          </motion.div>

          {/* Project Filters */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedFilter === filter
                    ? 'bg-accent text-background'
                    : 'bg-surface text-muted hover:text-text hover:bg-surface/80'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </motion.div>

          {/* Project Grid */}
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map(project => (
                <motion.div key={project.id} variants={fadeUp}>
                  <ProjectCard project={project} />
                </motion.div>
              ))
            ) : (
              <motion.div
                variants={fadeUp}
                className="col-span-full text-center py-12"
              >
                <p className="text-muted">
                  No projects found for the selected filter.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
