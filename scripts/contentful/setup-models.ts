import { config } from 'dotenv';
import { createClient } from 'contentful-management';
import { modelRegistry } from '../../contentful/models';

// Load environment variables
config({ path: '.env.local' });

const requireEnv = (k: string) => {
  const v = process.env[k];
  if (!v) throw new Error(`Missing environment variable: ${k}`);
  return v;
};

async function setupContentModels() {
  try {
    const managementToken = requireEnv('CONTENTFUL_MANAGEMENT_TOKEN');
    const spaceId = requireEnv('CONTENTFUL_SPACE_ID');
    const envId = process.env.CONTENTFUL_ENVIRONMENT ?? 'master';

    console.log('🚀 Setting up Contentful content models...');
    console.log(`📍 Space: ${spaceId} | Environment: ${envId}\n`);

    const client = createClient({
      accessToken: managementToken,
    });

    const space = await client.getSpace(spaceId);
    const environment = await space.getEnvironment(envId);
    
    let created = 0;
    let skipped = 0;
    
    for (const { id, model } of modelRegistry) {
      console.log(`📝 Processing ${model.name}...`);
      
      try {
        await environment.getContentType(id);
        console.log(`⚠️  ${model.name} already exists - skipping...`);
        skipped++;
      } catch (notFoundError) {
        const contentType = await environment.createContentTypeWithId(id, model);
        await contentType.publish();
        console.log(`✅ ${model.name} created and published`);
        created++;
      }
    }
    
    console.log('\n🎉 Content model setup completed!');
    console.log(`📊 Summary: ${created} created, ${skipped} skipped`);
    console.log('\n📋 Next steps:');
    console.log('1. Go to Contentful web app → Content model');
    console.log('2. Create content entries for your navigation');
    console.log('3. Test the integration with your React components');
    
  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }
}

setupContentModels();
