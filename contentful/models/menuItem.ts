import { ContentTypeProps } from 'contentful-management';

export const menuItemModel: Omit<ContentTypeProps, 'sys'> = {
  name: 'Menu Item',
  displayField: 'label',
  description: 'Navigation menu items that can be direct links or dropdown menus',
  fields: [
    {
      id: 'label',
      name: 'Label',
      type: 'Symbol',
      required: true,
      localized: false,
      validations: [
        { size: { min: 1, max: 30 } }
      ]
    },
    {
      id: 'type',
      name: 'Menu Type',
      type: 'Symbol',
      required: true,
      localized: false,
      validations: [
        {
          in: ['direct', 'dropdown']
        }
      ]
    },
    {
      id: 'link',
      name: 'Direct Link',
      type: 'Symbol',
      required: false,
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
      id: 'dropdownItems',
      name: 'Dropdown Items',
      type: 'Array',
      required: false,
      localized: false,
      items: {
        type: 'Link',
        linkType: 'Entry',
        validations: [
          {
            linkContentType: ['dropdownItem']
          }
        ]
      }
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

export const MENU_ITEM_ID = 'menuItem';
