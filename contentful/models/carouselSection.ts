import { ContentTypeProps } from 'contentful-management';

export const carouselSectionModel: Omit<ContentTypeProps, 'sys'> = {
  name: 'Carousel Section',
  displayField: 'title',
  description: 'Carousel section with header content and collection of slides',
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
      id: 'slides',
      name: 'Carousel Slides',
      type: 'Array',
      required: true,
      localized: false,
      items: {
        type: 'Link',
        linkType: 'Entry',
        validations: [
          {
            linkContentType: ['carouselSlide']
          }
        ]
      },
      validations: [
        { size: { min: 2, max: 10 } }
      ]
    },
    {
      id: 'autoAdvance',
      name: 'Auto-advance Slides',
      type: 'Boolean',
      required: false,
      localized: false
    },
    {
      id: 'autoAdvanceInterval',
      name: 'Auto-advance Interval (seconds)',
      type: 'Integer',
      required: false,
      localized: false,
      validations: [
        { range: { min: 3, max: 20 } }
      ]
    },
    {
      id: 'showThumbnails',
      name: 'Show Thumbnail Navigation',
      type: 'Boolean',
      required: false,
      localized: false
    },
    {
      id: 'showIndicators',
      name: 'Show Slide Indicators',
      type: 'Boolean',
      required: false,
      localized: false
    }
  ]
};

export const CAROUSEL_SECTION_ID = 'carouselSection';
