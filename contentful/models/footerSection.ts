import { ContentTypeProps } from 'contentful-management';

export const footerSectionModel: Omit<ContentTypeProps, 'sys'> = {
  name: 'Footer Section',
  displayField: 'companyName',
  description: 'Main footer configuration with company info, links, and settings',
  fields: [
    {
      id: 'companyName',
      name: 'Company Name',
      type: 'Symbol',
      required: true,
      localized: false,
      validations: [
        { size: { min: 1, max: 100 } }
      ]
    },
    {
      id: 'companyLogo',
      name: 'Company Logo (Optional)',
      type: 'Link',
      required: false,
      localized: false,
      linkType: 'Asset',
      validations: [
        {
          linkMimetypeGroup: ['image']
        },
        {
          assetImageDimensions: {
            width: { min: 32, max: 200 },
            height: { min: 32, max: 200 }
          }
        },
        {
          assetFileSize: {
            max: 200000 // 200KB max
          }
        }
      ]
    },
    {
      id: 'companyDescription',
      name: 'Company Description',
      type: 'Text',
      required: true,
      localized: false,
      validations: [
        { size: { min: 10, max: 300 } }
      ]
    },
    {
      id: 'email',
      name: 'Email Address',
      type: 'Symbol',
      required: true,
      localized: false,
      validations: [
        { 
          regexp: { 
            pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
            flags: 'i'
          }
        }
      ]
    },
    {
      id: 'phone',
      name: 'Phone Number',
      type: 'Symbol',
      required: false,
      localized: false,
      validations: [
        { size: { min: 0, max: 50 } }
      ]
    },
    {
      id: 'address',
      name: 'Physical Address',
      type: 'Text',
      required: false,
      localized: false,
      validations: [
        { size: { min: 0, max: 200 } }
      ]
    },
    {
      id: 'linkGroups',
      name: 'Link Groups',
      type: 'Array',
      required: true,
      localized: false,
      items: {
        type: 'Link',
        linkType: 'Entry',
        validations: [
          {
            linkContentType: ['footerLinkGroup']
          }
        ]
      },
      validations: [
        { size: { min: 1, max: 6 } }
      ]
    },
    {
      id: 'socialLinks',
      name: 'Social Media Links',
      type: 'Array',
      required: false,
      localized: false,
      items: {
        type: 'Link',
        linkType: 'Entry',
        validations: [
          {
            linkContentType: ['socialLink']
          }
        ]
      },
      validations: [
        { size: { min: 0, max: 8 } }
      ]
    },
    {
      id: 'copyrightText',
      name: 'Copyright Text',
      type: 'Symbol',
      required: true,
      localized: false,
      validations: [
        { size: { min: 1, max: 200 } }
      ]
    },
    {
      id: 'showBackToTop',
      name: 'Show Back to Top Button',
      type: 'Boolean',
      required: false,
      localized: false
    },
    {
      id: 'backgroundColor',
      name: 'Background Color Theme',
      type: 'Symbol',
      required: false,
      localized: false,
      validations: [
        {
          in: ['dark', 'light', 'blue', 'custom']
        }
      ]
    }
  ]
};

export const FOOTER_SECTION_ID = 'footerSection';
