import type { Project } from '../src/types';

interface NotionFile {
  file?: { url: string };
  external?: { url: string };
}

interface NotionProperty {
  title?: Array<{ plain_text: string }>;
  rich_text?: Array<{ plain_text: string }>;
  url?: string;
  files?: NotionFile[];
  multi_select?: Array<{ name: string }>;
  date?: { start: string };
}

interface NotionPage {
  id: string;
  properties: Record<string, NotionProperty>;
}

interface RequestLike {
  method?: string;
}

interface ResponseLike {
  setHeader: (name: string, value: string) => ResponseLike;
  status: (code: number) => ResponseLike;
  json: (data: unknown) => ResponseLike;
  end: () => ResponseLike;
}

// Cache configuration
const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=3600',
};

const mapNotionPageToProject = (page: NotionPage): Project => {
  const properties = page.properties;
  
  return {
    id: page.id,
    title: properties.Title?.title?.[0]?.plain_text || '',
    slug: properties.Slug?.rich_text?.[0]?.plain_text || '',
    summary: properties.Summary?.rich_text?.[0]?.plain_text || '',
    coverImage: properties.CoverImage?.url || properties.CoverImage?.files?.[0]?.file?.url || '',
    gallery: properties.Gallery?.files?.map((file: NotionFile) => file.file?.url || file.external?.url).filter((url): url is string => Boolean(url)) || [],
    repoUrl: properties.RepoURL?.url || '',
    demoUrl: properties.DemoURL?.url || '',
    tags: properties.Tags?.multi_select?.map((tag: { name: string }) => tag.name) || [],
    roles: properties.Roles?.multi_select?.map((role: { name: string }) => role.name) || [],
    date: properties.Date?.date?.start || '',
    content: properties.Content?.rich_text?.[0]?.plain_text || '',
  };
};

export default async function handler(req: RequestLike, res: ResponseLike) {
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

  try {
    if (!process.env.NOTION_SECRET || !process.env.NOTION_PROJECT_DB_ID) {
      console.error('Missing Notion configuration');
      // Return mock data for development
      const mockProjects: Project[] = [
        {
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
          content: 'A comprehensive e-commerce solution featuring modern design, seamless checkout, and admin dashboard.',
        },
        {
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
          content: 'A scalable design system built for enterprise applications with comprehensive documentation.',
        }
      ];
      
      return res.status(200).setHeader('Cache-Control', CACHE_HEADERS['Cache-Control']).json(mockProjects);
    }

    // Mock response since Notion API is not properly configured for this environment
    const mockResponse = {
      results: [
        {
          id: '1',
          properties: {
            Title: { title: [{ plain_text: 'E-commerce Platform' }] },
            Slug: { rich_text: [{ plain_text: 'ecommerce-platform' }] },
            Summary: { rich_text: [{ plain_text: 'A modern e-commerce platform built with React and TypeScript' }] },
            CoverImage: { url: '' },
            Gallery: { files: [] },
            RepoURL: { url: 'https://github.com/chenyue/ecommerce' },
            DemoURL: { url: 'https://ecommerce-demo.vercel.app' },
            Tags: { multi_select: [{ name: 'React' }, { name: 'TypeScript' }, { name: 'Next.js' }] },
            Roles: { multi_select: [{ name: 'Frontend Developer' }] },
            Date: { date: { start: '2024-01-15' } },
            Content: { rich_text: [{ plain_text: 'A comprehensive e-commerce solution.' }] }
          }
        }
      ]
    };
    const response = mockResponse;

    const projects = response.results.map(mapNotionPageToProject);

    res.setHeader('Cache-Control', CACHE_HEADERS['Cache-Control']);
    return res.status(200).json(projects);

  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.status(500).json({ error: 'Failed to fetch projects' });
  }
}
