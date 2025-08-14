import { ContentTypeProps } from 'contentful-management';

export const ctaButtonModel: Omit<ContentTypeProps, 'sys'> = {
  name: 'CTA Button',
  displayField: 'text',
  description: 'Reusable call-to-action button component for hero sections and other areas',
  fields: [
    {
      id: 'text',
      name: 'Button Text',
      type: 'Symbol',
      required: true,
      localized: false,
      validations: [
        { size: { min: 1, max: 50 } }
      ]
    },
    {
      id: 'link',
      name: 'Button Link',
      type: 'Symbol',
      required: true,
      localized: false,
      validations: [
        { 
          regexp: { 
            pattern: '^(\/|http|https|mailto:|tel:|#)',
            flags: 'i'
          }
        },
        { size: { min: 1, max: 200 } }
      ]
    },
    {
      id: 'style',
      name: 'Button Style',
      type: 'Symbol',
      required: true,
      localized: false,
      validations: [
        {
          in: ['primary', 'secondary', 'outline']
        }
      ]
    },
    {
      id: 'openInNewTab',
      name: 'Open in New Tab',
      type: 'Boolean',
      required: false,
      localized: false
    }
  ]
};

export const CTA_BUTTON_ID = 'ctaButton';
