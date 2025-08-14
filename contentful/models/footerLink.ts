import { ContentTypeProps } from 'contentful-management';

export const footerLinkModel: Omit<ContentTypeProps, 'sys'> = {
  name: 'Footer Link',
  displayField: 'label',
  description: 'Individual link item for footer navigation groups',
  fields: [
    {
      id: 'label',
      name: 'Link Label',
      type: 'Symbol',
      required: true,
      localized: false,
      validations: [
        { size: { min: 1, max: 50 } }
      ]
    },
    {
      id: 'url',
      name: 'Link URL',
      type: 'Symbol',
      required: true,
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
      id: 'openInNewTab',
      name: 'Open in New Tab',
      type: 'Boolean',
      required: false,
      localized: false
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

export const FOOTER_LINK_ID = 'footerLink';
