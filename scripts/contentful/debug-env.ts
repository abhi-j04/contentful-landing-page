import 'dotenv/config';

console.log('🔍 Environment Variables Debug:');
console.log('CONTENTFUL_SPACE_ID:', process.env.CONTENTFUL_SPACE_ID ? '✅ Set' : '❌ Missing');
console.log('CONTENTFUL_MANAGEMENT_TOKEN:', process.env.CONTENTFUL_MANAGEMENT_TOKEN ? '✅ Set' : '❌ Missing');
console.log('CONTENTFUL_ACCESS_TOKEN:', process.env.CONTENTFUL_ACCESS_TOKEN ? '✅ Set' : '❌ Missing');

console.log('\nActual values (first 10 chars):');
console.log('SPACE_ID:', process.env.CONTENTFUL_SPACE_ID?.substring(0, 10) + '...');
console.log('MANAGEMENT_TOKEN:', process.env.CONTENTFUL_MANAGEMENT_TOKEN?.substring(0, 10) + '...');
