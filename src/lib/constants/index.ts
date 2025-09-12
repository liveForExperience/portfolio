export const SITE_CONFIG = {
  name: 'Chen Yue - Portfolio',
  description: '个人作品集网站，展示项目、技能、兴趣，吸引潜在雇主与合作者。',
  url: 'https://chenyue.github.io/chen-yue-portfolio',
  author: {
    name: 'Chen Yue',
    email: 'hello@chenyue.dev',
    github: 'https://github.com/chenyue',
    linkedin: 'https://linkedin.com/in/chenyue',
    twitter: 'https://twitter.com/chenyue',
  },
} as const;

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PROJECTS: '/projects',
  PROJECT_DETAIL: '/projects/:slug',
  SKILLS: '/skills',
  INTERESTS: '/interests',
  CONTACT: '/contact',
} as const;

export const API_ENDPOINTS = {
  PROJECTS: '/api/projects',
  PROJECT_BY_SLUG: '/api/projects',
  VIDEOS: '/api/videos',
} as const;

export const CACHE_CONFIG = {
  TTL: 600000, // 10 minutes
  STALE_WHILE_REVALIDATE: 3600000, // 1 hour
} as const;
