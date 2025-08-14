import { ContentTypeProps } from 'contentful-management';

export const heroSectionModel: Omit<ContentTypeProps, 'sys'> = {
  name: 'Hero Section',
  displayField: 'title',
  description: 'Hero section with background images, content, CTA buttons, and company logos',
  fields: [
    {
      id: 'title',
      name: 'Main Title',
      type: 'Symbol',
      required: true,
      localized: false,
      validations: [
        { size: { min: 1, max: 100 } }
      ]
    },
    {
      id: 'highlightedTitle',
      name: 'Highlighted Title (Gradient Text)',
      type: 'Symbol',
      required: true,
      localized: false,
      validations: [
        { size: { min: 1, max: 100 } }
      ]
    },
    {
      id: 'subtitleMobile',
      name: 'Subtitle (Mobile - Short Version)',
      type: 'Text',
      required: true,
      localized: false,
      validations: [
        { size: { min: 10, max: 150 } }
      ]
    },
    {
      id: 'subtitleDesktop',
      name: 'Subtitle (Desktop - Full Version)',
      type: 'Text',
      required: true,
      localized: false,
      validations: [
        { size: { min: 10, max: 300 } }
      ]
    },
    {
      id: 'backgroundImageMobile',
      name: 'Background Image (Mobile)',
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
            width: { min: 600, max: 1200 },
            height: { min: 800, max: 1600 }
          }
        },
        {
          assetFileSize: {
            max: 800000 // 800KB max for mobile
          }
        }
      ]
    },
    {
      id: 'backgroundImageDesktop',
      name: 'Background Image (Desktop)',
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
            width: { min: 1600, max: 4000 },
            height: { min: 900, max: 2400 }
          }
        },
        {
          assetFileSize: {
            max: 2000000 // 2MB max for desktop
          }
        }
      ]
    },
    {
      id: 'backgroundImageAlt',
      name: 'Background Image Alt Text',
      type: 'Symbol',
      required: true,
      localized: false,
      validations: [
        { size: { min: 1, max: 150 } }
      ]
    },
    {
      id: 'primaryCta',
      name: 'Primary CTA Button',
      type: 'Link',
      required: true,
      localized: false,
      linkType: 'Entry',
      validations: [
        {
          linkContentType: ['ctaButton']
        }
      ]
    },
    {
      id: 'secondaryCta',
      name: 'Secondary CTA Button',
      type: 'Link',
      required: false,
      localized: false,
      linkType: 'Entry',
      validations: [
        {
          linkContentType: ['ctaButton']
        }
      ]
    },
    {
      id: 'showTrustSection',
      name: 'Show Trust Section',
      type: 'Boolean',
      required: false,
      localized: false
    },
    {
      id: 'trustSectionTitle',
      name: 'Trust Section Title',
      type: 'Symbol',
      required: false,
      localized: false,
      validations: [
        { size: { min: 1, max: 100 } }
      ]
    },
    {
      id: 'companyLogos',
      name: 'Company Logos',
      type: 'Array',
      required: false,
      localized: false,
      items: {
        type: 'Link',
        linkType: 'Entry',
        validations: [
          {
            linkContentType: ['companyLogo']
          }
        ]
      },
      validations: [
        { size: { min: 0, max: 8 } }
      ]
    }
  ]
};

export const HERO_SECTION_ID = 'heroSection';
