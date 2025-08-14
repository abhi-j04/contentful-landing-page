import { ContentTypeProps } from 'contentful-management';

export const companyLogoModel: Omit<ContentTypeProps, 'sys'> = {
  name: 'Company Logo',
  displayField: 'name',
  description: 'Company logo for trust indicators and partner sections',
  fields: [
    {
      id: 'name',
      name: 'Company Name',
      type: 'Symbol',
      required: true,
      localized: false,
      validations: [
        { size: { min: 1, max: 100 } }
      ]
    },
    {
      id: 'logo',
      name: 'Company Logo Image',
      type: 'Link',
      required: true,
      localized: false,
      linkType: 'Asset',
      validations: [
        {
          linkMimetypeGroup: ['image']
        },
        {
          assetImageDimensions: {
            width: { min: 120, max: 600 },
            height: { min: 40, max: 200 }
          }
        },
        {
          assetFileSize: {
            max: 300000 // 300KB max for logos
          }
        }
      ]
    },
    {
      id: 'altText',
      name: 'Alt Text',
      type: 'Symbol',
      required: true,
      localized: false,
      validations: [
        { size: { min: 1, max: 100 } }
      ]
    },
    {
      id: 'website',
      name: 'Company Website (Optional)',
      type: 'Symbol',
      required: false,
      localized: false,
      validations: [
        { 
          regexp: { 
            pattern: '^(https?://)',
            flags: 'i'
          }
        }
      ]
    }
  ]
};

export const COMPANY_LOGO_ID = 'companyLogo';
