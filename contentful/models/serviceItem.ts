import { ContentTypeProps } from 'contentful-management';

export const serviceItemModel: Omit<ContentTypeProps, 'sys'> = {
  name: 'Service Item',
  displayField: 'title',
  description: 'Individual service item with title, rich content, and image',
  fields: [
    {
      id: 'title',
      name: 'Service Title',
      type: 'Symbol',
      required: true,
      localized: false,
      validations: [
        { size: { min: 1, max: 100 } }
      ]
    },
    {
      id: 'content',
      name: 'Service Description',
      type: 'RichText',
      required: true,
      localized: false,
      validations: [
        { size: { min: 50, max: 1000 } }
      ]
    },
    {
      id: 'image',
      name: 'Service Image',
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
            width: { min: 800, max: 2400 },
            height: { min: 600, max: 1800 }
          }
        },
        {
          assetFileSize: {
            max: 1500000 // 1.5MB max
          }
        }
      ]
    },
    {
      id: 'imageAlt',
      name: 'Image Alt Text',
      type: 'Symbol',
      required: true,
      localized: false,
      validations: [
        { size: { min: 1, max: 150 } }
      ]
    },
    {
      id: 'order',
      name: 'Display Order',
      type: 'Integer',
      required: true,
      localized: false,
      validations: [
        { range: { min: 0, max: 100 } }
      ]
    },
    {
      id: 'featured',
      name: 'Featured Service',
      type: 'Boolean',
      required: false,
      localized: false
    }
  ]
};

export const SERVICE_ITEM_ID = 'serviceItem';
