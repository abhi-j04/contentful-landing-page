import { ContentTypeProps } from 'contentful-management';

export const servicesSectionModel: Omit<ContentTypeProps, 'sys'> = {
  name: 'Services Section',
  displayField: 'title',
  description: 'Services section with header content and collection of service items',
  fields: [
    {
      id: 'title',
      name: 'Section Title',
      type: 'Symbol',
      required: true,
      localized: false,
      validations: [
        { size: { min: 1, max: 100 } }
      ]
    },
    {
      id: 'subtitle',
      name: 'Section Subtitle',
      type: 'Text',
      required: true,
      localized: false,
      validations: [
        { size: { min: 10, max: 300 } }
      ]
    },
    {
      id: 'services',
      name: 'Service Items',
      type: 'Array',
      required: true,
      localized: false,
      items: {
        type: 'Link',
        linkType: 'Entry',
        validations: [
          {
            linkContentType: ['serviceItem']
          }
        ]
      },
      validations: [
        { size: { min: 1, max: 12 } }
      ]
    },
    {
      id: 'backgroundColor',
      name: 'Background Color',
      type: 'Symbol',
      required: false,
      localized: false,
      validations: [
        {
          in: ['gray', 'white', 'blue', 'custom']
        }
      ]
    },
    {
      id: 'layout',
      name: 'Layout Style',
      type: 'Symbol',
      required: false,
      localized: false,
      validations: [
        {
          in: ['alternating', 'uniform-left', 'uniform-right']
        }
      ]
    }
  ]
};

export const SERVICES_SECTION_ID = 'servicesSection';
