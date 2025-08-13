const contentful = require('contentful-management');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

async function exportModels() {
  try {
    if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_MANAGEMENT_TOKEN) {
      throw new Error('Missing required environment variables. Please check your .env.local file.');
    }

    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || 'master');
    
    const contentTypes = await environment.getContentTypes();
    
    const models = contentTypes.items.map(ct => ({
      sys: ct.sys,
      name: ct.name,
      fields: ct.fields,
      displayField: ct.displayField,
      description: ct.description,
    }));

    // Ensure directory exists
    if (!fs.existsSync('contentful/models')) {
      fs.mkdirSync('contentful/models', { recursive: true });
    }

    fs.writeFileSync(
      'contentful/models/content-models.json',
      JSON.stringify(models, null, 2)
    );

    console.log('✅ Content models exported to contentful/models/content-models.json');
    console.log(`📊 Exported ${models.length} content models`);
  } catch (error) {
    console.error('❌ Error exporting models:', error.message);
    process.exit(1);
  }
}

exportModels();
