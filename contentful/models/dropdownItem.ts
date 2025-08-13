import { ContentTypeProps } from 'contentful-management';

export const dropdownItemModel: Omit<ContentTypeProps, 'sys'> = {
  name: 'Dropdown Item',
  displayField: 'label',
  description: 'Individual items within dropdown menus',
  fields: [
    {
      id: 'label',
      name: 'Label',
      type: 'Symbol',
      required: true,
      localized: false,
      validations: [
        { size: { min: 1, max: 50 } }
      ]
    },
    {
      id: 'link',
      name: 'Link',
      type: 'Symbol',
      required: true,
      localized: false,
      validations: [
        { 
          regexp: { 
            pattern: '^(\/|http|https|mailto:|tel:)',
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
      defaultValue: { 'en-US': 1 }
    }
  ]
};

export const DROPDOWN_ITEM_ID = 'dropdownItem';
