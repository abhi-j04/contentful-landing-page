import { Asset } from 'contentful';

// Navigation types
export interface DropdownItemFields {
  label: string;
  link: string;
  order: number;
}

export interface MenuItemFields {
  label: string;
  type: 'direct' | 'dropdown';
  link?: string;
  dropdownItems?: DropdownItemEntry[];
  order: number;
}

export interface NavigationFields {
  title: string;
  logo: Asset;
  menuItems: MenuItemEntry[];
  ctaText?: string;
  ctaLink?: string;
}

// CTA Button types
export interface CtaButtonFields {
  text: string;
  link: string;
  style: 'primary' | 'secondary' | 'outline';
  openInNewTab?: boolean;
}

// Company Logo types
export interface CompanyLogoFields {
  name: string;
  logo: Asset;
  altText: string;
  website?: string;
}

// Hero Section types (Updated to match our model)
export interface HeroSectionFields {
  title: string;
  highlightedTitle: string;
  subtitleMobile: string;
  subtitleDesktop: string;
  backgroundImageMobile: Asset;
  backgroundImageDesktop: Asset;
  backgroundImageAlt: string;
  primaryCta: CtaButtonEntry;
  secondaryCta?: CtaButtonEntry;
  showTrustSection?: boolean;
  trustSectionTitle?: string;
  companyLogos?: CompanyLogoEntry[];
}

// Carousel Slide types
export interface CarouselSlideFields {
  title: string;
  image: Asset;
  altText: string;
  description?: string;
  link?: string;
  order: number;
}

// Carousel Section types
export interface CarouselSectionFields {
  title: string;
  subtitle: string;
  slides: CarouselSlideEntry[];
  autoAdvance?: boolean;
  autoAdvanceInterval?: number;
  showThumbnails?: boolean;
  showIndicators?: boolean;
}

// Entry interfaces
export interface DropdownItemEntry {
  sys: { id: string; contentType: { sys: { id: string } } };
  fields: DropdownItemFields;
}

export interface MenuItemEntry {
  sys: { id: string; contentType: { sys: { id: string } } };
  fields: MenuItemFields;
}

export interface NavigationEntry {
  sys: { id: string; contentType: { sys: { id: string } } };
  fields: NavigationFields;
}

export interface CtaButtonEntry {
  sys: { id: string; contentType: { sys: { id: string } } };
  fields: CtaButtonFields;
}

export interface CompanyLogoEntry {
  sys: { id: string; contentType: { sys: { id: string } } };
  fields: CompanyLogoFields;
}

export interface HeroSectionEntry {
  sys: { id: string; contentType: { sys: { id: string } } };
  fields: HeroSectionFields;
}

export interface CarouselSlideEntry {
  sys: { id: string; contentType: { sys: { id: string } } };
  fields: CarouselSlideFields;
}

export interface CarouselSectionEntry {
  sys: { id: string; contentType: { sys: { id: string } } };
  fields: CarouselSectionFields;
}

// Feature types
export interface FeatureFields {
  title: string;
  description: string;
  order: number;
  icon?: Asset;
}

export interface FeatureEntry {
  sys: { id: string; contentType: { sys: { id: string } } };
  fields: FeatureFields;
}

// Content model constants
export const CONTENT_TYPES = {
  DROPDOWN_ITEM: 'dropdownItem',
  MENU_ITEM: 'menuItem',
  NAVIGATION: 'navigation',
  CTA_BUTTON: 'ctaButton',
  COMPANY_LOGO: 'companyLogo',
  HERO_SECTION: 'heroSection',
  CAROUSEL_SLIDE: 'carouselSlide',
  CAROUSEL_SECTION: 'carouselSection',
  FEATURE: 'feature',
} as const;

export type ContentType = typeof CONTENT_TYPES[keyof typeof CONTENT_TYPES];

// Utility types
export interface ContentfulCollection<T> {
  items: T[];
  total: number;
  skip: number;
  limit: number;
}
