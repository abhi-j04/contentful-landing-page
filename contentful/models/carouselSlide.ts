import { ContentTypeProps } from 'contentful-management';

export const carouselSlideModel: Omit<ContentTypeProps, 'sys'> = {
  name: 'Carousel Slide',
  displayField: 'title',
  description: 'Individual slide for carousel sections with image and title',
  fields: [
    {
      id: 'title',
      name: 'Slide Title',
      type: 'Symbol',
      required: true,
      localized: false,
      validations: [
        { size: { min: 1, max: 100 } }
      ]
    },
    {
      id: 'image',
      name: 'Slide Image',
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
            height: { min: 450, max: 1350 }
          }
        },
        {
          assetFileSize: {
            max: 1500000 // 1.5MB max for carousel images
          }
        }
      ]
    },
    {
      id: 'altText',
      name: 'Image Alt Text',
      type: 'Symbol',
      required: true,
      localized: false,
      validations: [
        { size: { min: 1, max: 150 } }
      ]
    },
    {
      id: 'description',
      name: 'Slide Description (Optional)',
      type: 'Text',
      required: false,
      localized: false,
      validations: [
        { size: { min: 0, max: 200 } }
      ]
    },
    {
      id: 'link',
      name: 'Slide Link (Optional)',
      type: 'Symbol',
      required: false,
      localized: false,
      validations: [
        { 
          regexp: { 
            pattern: '^(\/|http|https|mailto:|tel:|#)',
            flags: 'i'
          }
        }
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
    }
  ]
};

export const CAROUSEL_SLIDE_ID = 'carouselSlide';
