import { ContentTypeProps } from 'contentful-management';

export const navigationModel: Omit<ContentTypeProps, 'sys'> = {
  name: 'Navigation',
  displayField: 'title',
  description: 'Main website navigation configuration',
  fields: [
    {
      id: 'title',
      name: 'Navigation Title',
      type: 'Symbol',
      required: true,
      localized: false,
      validations: [
        { size: { min: 1, max: 100 } }
      ]
    },
    {
      id: 'logo',
      name: 'Logo Image',
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
            width: { min: 120, max: 400 },
            height: { min: 40, max: 120 }
          }
        },
        {
          assetFileSize: {
            max: 500000
          }
        }
      ]
    },
    {
      id: 'menuItems',
      name: 'Menu Items',
      type: 'Array',
      required: true,
      localized: false,
      items: {
        type: 'Link',
        linkType: 'Entry',
        validations: [
          {
            linkContentType: ['menuItem']
          }
        ]
      },
      validations: [
        { size: { min: 1, max: 8 } }
      ]
    },
    {
      id: 'ctaText',
      name: 'CTA Button Text',
      type: 'Symbol',
      required: false,
      localized: false,
      validations: [
        { size: { min: 1, max: 20 } }
      ]
    },
    {
      id: 'ctaLink',
      name: 'CTA Button Link',
      type: 'Symbol',
      required: false,
      localized: false,
      validations: [
        { 
          regexp: { 
            pattern: '^(\/|http|https|mailto:|tel:)',
            flags: 'i'
          }
        }
      ]
    }
  ]
};

export const NAVIGATION_ID = 'navigation';
