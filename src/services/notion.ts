import type { Project, Video } from '../types';
import { CACHE_CONFIG } from '../lib/constants';

const API_BASE = '/api';

// Cache configuration
const CACHE_TTL = CACHE_CONFIG.TTL;
const cache = new Map<string, { data: unknown; timestamp: number }>();

const getCachedData = <T>(key: string): T | null => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }
  cache.delete(key);
  return null;
};

const setCachedData = <T>(key: string, data: T): void => {
  cache.set(key, { data, timestamp: Date.now() });
};

export const fetchProjects = async (): Promise<Project[]> => {
  const cacheKey = 'projects';
  const cached = getCachedData<Project[]>(cacheKey);
  
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(`${API_BASE}/projects`);
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }
    
    const projects = await response.json();
    setCachedData(cacheKey, projects);
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

export const fetchProjectBySlug = async (slug: string): Promise<Project | null> => {
  const cacheKey = `project-${slug}`;
  const cached = getCachedData<Project>(cacheKey);
  
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(`${API_BASE}/projects/${slug}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch project: ${response.statusText}`);
    }
    
    const project = await response.json();
    setCachedData(cacheKey, project);
    return project;
  } catch (error) {
    console.error(`Error fetching project ${slug}:`, error);
    return null;
  }
};

export const fetchVideos = async (): Promise<Video[]> => {
  const cacheKey = 'videos';
  const cached = getCachedData<Video[]>(cacheKey);
  
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(`${API_BASE}/videos`);
    if (!response.ok) {
      throw new Error(`Failed to fetch videos: ${response.statusText}`);
    }
    
    const videos = await response.json();
    setCachedData(cacheKey, videos);
    return videos;
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
};
