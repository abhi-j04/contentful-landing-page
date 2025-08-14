import { ContentTypeProps } from 'contentful-management';

export const socialLinkModel: Omit<ContentTypeProps, 'sys'> = {
  name: 'Social Link',
  displayField: 'platform',
  description: 'Social media platform link with icon',
  fields: [
    {
      id: 'platform',
      name: 'Platform Name',
      type: 'Symbol',
      required: true,
      localized: false,
      validations: [
        { size: { min: 1, max: 50 } }
      ]
    },
    {
      id: 'url',
      name: 'Profile URL',
      type: 'Symbol',
      required: true,
      localized: false,
      validations: [
        { 
          regexp: { 
            pattern: '^https://',
            flags: 'i'
          }
        }
      ]
    },
    {
      id: 'icon',
      name: 'Icon Type',
      type: 'Symbol',
      required: true,
      localized: false,
      validations: [
        {
          in: ['twitter', 'linkedin', 'github', 'facebook', 'instagram', 'youtube', 'dribbble', 'behance']
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

export const SOCIAL_LINK_ID = 'socialLink';
