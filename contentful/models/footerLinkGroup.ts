import { ContentTypeProps } from 'contentful-management';

export const footerLinkGroupModel: Omit<ContentTypeProps, 'sys'> = {
  name: 'Footer Link Group',
  displayField: 'title',
  description: 'Grouped collection of footer links (Navigation, Services, Legal, etc.)',
  fields: [
    {
      id: 'title',
      name: 'Group Title',
      type: 'Symbol',
      required: true,
      localized: false,
      validations: [
        { size: { min: 1, max: 50 } }
      ]
    },
    {
      id: 'links',
      name: 'Links',
      type: 'Array',
      required: true,
      localized: false,
      items: {
        type: 'Link',
        linkType: 'Entry',
        validations: [
          {
            linkContentType: ['footerLink']
          }
        ]
      },
      validations: [
        { size: { min: 1, max: 10 } }
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

export const FOOTER_LINK_GROUP_ID = 'footerLinkGroup';
