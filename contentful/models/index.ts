// Model definitions
export * from './dropdownItem';
export * from './menuItem';
export * from './navigation';
export * from './ctaButton';
export * from './companyLogo';
export * from './heroSection';

// Model registry for deployment
import { dropdownItemModel, DROPDOWN_ITEM_ID } from './dropdownItem';
import { menuItemModel, MENU_ITEM_ID } from './menuItem';
import { navigationModel, NAVIGATION_ID } from './navigation';
import { ctaButtonModel, CTA_BUTTON_ID } from './ctaButton';
import { companyLogoModel, COMPANY_LOGO_ID } from './companyLogo';
import { heroSectionModel, HERO_SECTION_ID } from './heroSection';
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
  },
  {
    id: CTA_BUTTON_ID,
    model: ctaButtonModel,
    dependencies: [] // Independent component
  },
  {
    id: COMPANY_LOGO_ID,
    model: companyLogoModel,
    dependencies: [] // Independent component
  },
  {
    id: HERO_SECTION_ID,
    model: heroSectionModel,
    dependencies: [CTA_BUTTON_ID, COMPANY_LOGO_ID] // Depends on both CTA and Company Logo
  }
];
