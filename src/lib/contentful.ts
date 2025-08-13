import { createClient } from 'contentful';

// Validate environment variables
const requiredEnvVars = {
  CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
  CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_PREVIEW_ACCESS_TOKEN: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
};

// Check for missing environment variables
const missingEnvVars = Object.entries(requiredEnvVars)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(', ')}`
  );
}

// Create client with error handling
const createContentfulClient = (isPreview = false) => {
  try {
    return createClient({
      space: requiredEnvVars.CONTENTFUL_SPACE_ID!,
      accessToken: isPreview 
        ? requiredEnvVars.CONTENTFUL_PREVIEW_ACCESS_TOKEN!
        : requiredEnvVars.CONTENTFUL_ACCESS_TOKEN!,
      ...(isPreview && { host: 'preview.contentful.com' }),
    });
  } catch (error) {
    console.error('Failed to create Contentful client:', error);
    throw error;
  }
};

export const client = createContentfulClient();
export const previewClient = createContentfulClient(true);

export default client;
