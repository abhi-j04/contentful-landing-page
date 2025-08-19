import { createClient } from 'contentful-management';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { config } from 'dotenv';

config({ path: '.env.local' });

const requireEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing environment variable: ${key}`);
  return value;
};

async function exportModels() {
  try {
    const managementToken = requireEnv('CONTENTFUL_MANAGEMENT_TOKEN');
    const spaceId = requireEnv('CONTENTFUL_SPACE_ID');
    const environmentId = process.env.CONTENTFUL_ENVIRONMENT || 'master';

    console.log('📤 Exporting Contentful content models...');
    console.log(`📍 Space: ${spaceId} | Environment: ${environmentId}\n`);

    const client = createClient({
      accessToken: managementToken,
    });

    const space = await client.getSpace(spaceId);
    const environment = await space.getEnvironment(environmentId);
    
    const contentTypes = await environment.getContentTypes();
    
    const models = contentTypes.items.map(ct => ({
      sys: ct.sys,
      name: ct.name,
      fields: ct.fields,
      displayField: ct.displayField,
      description: ct.description,
    }));

    // Ensure directory exists
    if (!existsSync('contentful/models')) {
      mkdirSync('contentful/models', { recursive: true });
    }

    writeFileSync(
      'contentful/models/content-models.json',
      JSON.stringify(models, null, 2)
    );

    console.log('✅ Content models exported to contentful/models/content-models.json');
    console.log(`📊 Exported ${models.length} content models`);
  } catch (error) {
    console.error('❌ Error exporting models:', error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}

exportModels();
