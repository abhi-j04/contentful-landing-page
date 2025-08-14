import client, { previewClient } from './contentful';
import { CONTENT_TYPES, HeroSectionEntry } from '@/types/contentful';

interface FetchOptions {
  preview?: boolean;
  limit?: number;
  order?: string[];
}

/**
 * Generic function to fetch entries by content type
 */
export async function fetchEntriesByType(
  contentType: string, 
  options: FetchOptions = {}
) {
  try {
    const contentfulClient = options.preview ? previewClient : client;
    
    if (!contentfulClient) {
      return {
        success: false,
        error: 'Contentful client not available',
        data: [],
      };
    }
    
    const response = await contentfulClient.getEntries({
      content_type: contentType,
      include: 3,
      limit: options.limit || 10,
      ...(options.order && { order: options.order }),
    });

    return {
      success: true,
      data: response.items,
      total: response.total,
    };
  } catch (error) {
    console.error(`Error fetching ${contentType}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      data: [],
    };
  }
}

/**
 * Fetch single navigation entry
 */
export async function fetchNavigation(options: FetchOptions = {}) {
  const result = await fetchEntriesByType(CONTENT_TYPES.NAVIGATION, {
    ...options,
    limit: 1,
    order: ['-sys.createdAt'],
  });
  
  return {
    ...result,
    data: result.data[0] || null,
  };
}

/**
 * Fetch hero section entry
 */
export async function fetchHeroSection(options: FetchOptions = {}) {
  const result = await fetchEntriesByType(CONTENT_TYPES.HERO_SECTION, {
    ...options,
    limit: 1,
    order: ['-sys.createdAt'],
  });
  
  return {
    ...result,
    data: (result.data[0] as unknown as HeroSectionEntry) || null,
  };
}
