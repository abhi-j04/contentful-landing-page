import { createClient } from 'contentful';

// Only create client if environment variables are available
function createContentfulClient(isPreview = false) {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = isPreview 
    ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
    : process.env.CONTENTFUL_ACCESS_TOKEN;

  if (!spaceId || !accessToken) {
    console.warn('Contentful configuration missing, using mock client');
    return null;
  }

  try {
    return createClient({
      space: spaceId,
      accessToken: accessToken,
      ...(isPreview && { host: 'preview.contentful.com' }),
    });
  } catch (error) {
    console.error('Failed to create Contentful client:', error);
    return null;
  }
}

export const client = createContentfulClient();
export const previewClient = createContentfulClient(true);

export default client;
