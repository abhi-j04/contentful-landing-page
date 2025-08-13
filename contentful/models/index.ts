// Model definitions
export * from './dropdownItem';
export * from './menuItem';
export * from './navigation';

// Model registry for deployment
import { dropdownItemModel, DROPDOWN_ITEM_ID } from './dropdownItem';
import { menuItemModel, MENU_ITEM_ID } from './menuItem';
import { navigationModel, NAVIGATION_ID } from './navigation';
import { ContentTypeProps } from 'contentful-management';

export interface ModelDefinition {
  id: string;
  model: Omit<ContentTypeProps, 'sys'>;
  dependencies?: string[]; // Models this depends on (must be created first)
}

// Define deployment order (dependencies first)
export const modelRegistry: ModelDefinition[] = [
  {
    id: DROPDOWN_ITEM_ID,
    model: dropdownItemModel,
    dependencies: []
  },
  {
    id: MENU_ITEM_ID,
    model: menuItemModel,
    dependencies: [DROPDOWN_ITEM_ID] // Depends on dropdownItem
  },
  {
    id: NAVIGATION_ID,
    model: navigationModel,
    dependencies: [MENU_ITEM_ID] // Depends on menuItem
  }
];
