import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Client } from '@notionhq/client';
import type { Project } from '../../src/types';

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

const DATABASE_ID = process.env.NOTION_PROJECT_DB_ID!;

// Cache configuration
const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=3600',
};

const mapNotionPageToProject = (page: any): Project => {
  const properties = page.properties;
  
  return {
    id: page.id,
    title: properties.Title?.title?.[0]?.plain_text || '',
    slug: properties.Slug?.rich_text?.[0]?.plain_text || '',
    summary: properties.Summary?.rich_text?.[0]?.plain_text || '',
    coverImage: properties.CoverImage?.url || properties.CoverImage?.files?.[0]?.file?.url || '',
    gallery: properties.Gallery?.files?.map((file: any) => file.file?.url || file.external?.url) || [],
    repoUrl: properties.RepoURL?.url || '',
    demoUrl: properties.DemoURL?.url || '',
    tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
    roles: properties.Roles?.multi_select?.map((role: any) => role.name) || [],
    date: properties.Date?.date?.start || '',
    content: properties.Content?.rich_text?.[0]?.plain_text || '',
  };
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ error: 'Slug parameter is required' });
  }

  try {
    if (!process.env.NOTION_SECRET || !process.env.NOTION_PROJECT_DB_ID) {
      console.error('Missing Notion configuration');
      // Return mock data for development
      const mockProjects: { [key: string]: Project } = {
        'ecommerce-platform': {
          id: '1',
          title: 'E-commerce Platform',
          slug: 'ecommerce-platform',
          summary: 'A modern e-commerce platform built with React and TypeScript',
          coverImage: '',
          gallery: [],
          repoUrl: 'https://github.com/chenyue/ecommerce',
          demoUrl: 'https://ecommerce-demo.vercel.app',
          tags: ['React', 'TypeScript', 'Next.js', 'Stripe'],
          roles: ['Frontend Developer', 'UI/UX Designer'],
          date: '2024-01-15',
          content: 'A comprehensive e-commerce solution featuring modern design, seamless checkout, and admin dashboard. Built with performance and scalability in mind.',
        },
        'design-system': {
          id: '2',
          title: 'Design System',
          slug: 'design-system',
          summary: 'Comprehensive design system with React components and documentation',
          coverImage: '',
          gallery: [],
          repoUrl: 'https://github.com/chenyue/design-system',
          demoUrl: 'https://design-system.vercel.app',
          tags: ['React', 'Storybook', 'TypeScript', 'Design Tokens'],
          roles: ['Frontend Architect', 'Design Systems Lead'],
          date: '2023-11-20',
          content: 'A scalable design system built for enterprise applications with comprehensive documentation and automated testing.',
        }
      };
      
      const project = mockProjects[slug];
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      
      return res.status(200).setHeader('Cache-Control', CACHE_HEADERS['Cache-Control']).json(project);
    }

    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        and: [
          {
            property: 'Status',
            select: {
              equals: 'Published'
            }
          },
          {
            property: 'Slug',
            rich_text: {
              equals: slug
            }
          }
        ]
      }
    });

    if (response.results.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const project = mapNotionPageToProject(response.results[0]);

    res.setHeader('Cache-Control', CACHE_HEADERS['Cache-Control']);
    return res.status(200).json(project);

  } catch (error) {
    console.error('Error fetching project:', error);
    return res.status(500).json({ error: 'Failed to fetch project' });
  }
}
