export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  coverImage: string;
  gallery: string[];
  repoUrl: string;
  demoUrl: string;
  tags: string[];
  roles: string[];
  date: string;
  content: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
  weight: number;
}

export interface Video {
  id: string;
  title: string;
  source: 'youtube' | 'vimeo' | 'selfhost';
  url: string;
  thumbnail: string;
  duration: number;
  captions: string | null;
}

export interface HeroProps {
  title: string;
  subtitle: string;
  cta: Array<{
    label: string;
    url: string;
  }>;
}

export interface ProjectCardProps {
  project: Project;
}

export interface ProjectDetailProps {
  project: Project;
}

export interface SkillBarProps {
  skill: Skill;
}

export interface VideoGalleryProps {
  videos: Video[];
}

export interface FooterProps {
  links: Array<{
    label: string;
    url: string;
  }>;
}
