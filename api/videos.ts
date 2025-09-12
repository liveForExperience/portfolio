import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Client } from '@notionhq/client';
import type { Video } from '../src/types';

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

const DATABASE_ID = process.env.NOTION_VIDEO_DB_ID!;

// Cache configuration
const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=3600',
};

const mapNotionPageToVideo = (page: any): Video => {
  const properties = page.properties;
  
  return {
    id: page.id,
    title: properties.Title?.title?.[0]?.plain_text || '',
    source: properties.Source?.select?.name?.toLowerCase() || 'youtube',
    url: properties.URL?.url || '',
    thumbnail: properties.Thumbnail?.url || properties.Thumbnail?.files?.[0]?.file?.url || '',
    duration: properties.Duration?.number || 0,
    captions: properties.Captions?.rich_text?.[0]?.plain_text || null,
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

  try {
    if (!process.env.NOTION_SECRET || !process.env.NOTION_VIDEO_DB_ID) {
      console.error('Missing Notion configuration');
      // Return mock data for development
      const mockVideos: Video[] = [
        {
          id: '1',
          title: 'Champions League Final Highlights 2024',
          source: 'youtube',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          thumbnail: '',
          duration: 180,
          captions: 'Amazing goals and saves from the final',
        },
        {
          id: '2',
          title: 'Best Football Skills Compilation',
          source: 'youtube',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          thumbnail: '',
          duration: 240,
          captions: 'Incredible skills from top players',
        },
        {
          id: '3',
          title: 'Tactical Analysis: Modern Football',
          source: 'vimeo',
          url: 'https://vimeo.com/123456789',
          thumbnail: '',
          duration: 360,
          captions: 'Deep dive into modern football tactics',
        }
      ];
      
      return res.status(200).setHeader('Cache-Control', CACHE_HEADERS['Cache-Control']).json(mockVideos);
    }

    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: 'Status',
        select: {
          equals: 'Published'
        }
      },
      sorts: [
        {
          property: 'Created',
          direction: 'descending'
        }
      ]
    });

    const videos = response.results.map(mapNotionPageToVideo);

    res.setHeader('Cache-Control', CACHE_HEADERS['Cache-Control']);
    return res.status(200).json(videos);

  } catch (error) {
    console.error('Error fetching videos:', error);
    return res.status(500).json({ error: 'Failed to fetch videos' });
  }
}
