'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NavigationEntry } from '@/types/contentful';

interface NavItem {
  label: string;
  href: string;
  dropdown?: { label: string; href: string; }[];
}

interface LogoData {
  url: string;
  alt: string;
  width: number;
  height: number;
}

interface CTAData {
  text: string;
  href: string;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [navigationData, setNavigationData] = useState<NavigationEntry | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch navigation data from API
  useEffect(() => {
    async function fetchNavigationData() {
      try {
        const response = await fetch('/api/navigation');
        const result = await response.json();
        
        if (result.success && result.data) {
          setNavigationData(result.data);
        }
      } catch (error) {
        console.error('Error fetching navigation:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchNavigationData();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  // Transform Contentful data to component format
  const getNavItems = (): NavItem[] => {
    if (!navigationData?.fields.menuItems) return [];

    return navigationData.fields.menuItems
      .sort((a, b) => (a.fields.order || 0) - (b.fields.order || 0))
      .map(item => {
        const baseItem: NavItem = {
          label: item.fields.label,
          href: item.fields.link || '/',
        };

        if (item.fields.type === 'dropdown' && item.fields.dropdownItems?.length) {
          baseItem.dropdown = item.fields.dropdownItems
            .sort((a, b) => (a.fields.order || 0) - (b.fields.order || 0))
            .map(dropdownItem => ({
              label: dropdownItem.fields.label,
              href: dropdownItem.fields.link,
            }));
        }

        return baseItem;
      });
  };

  const getLogoData = (): LogoData | null => {
    if (!navigationData?.fields.logo?.fields?.file) return null;
    
    const logo = navigationData.fields.logo;
    const file = logo.fields.file;
    
    if (!file || !file.url) return null;
    
    const details = file.details as any;
    
    return {
      url: `https:${file.url}`,
      alt: (logo.fields.title as string) || navigationData.fields.title || 'Logo',
      width: details?.image?.width || 160,
      height: details?.image?.height || 40,
    };
  };

  const getCTAData = (): CTAData | null => {
    if (!navigationData?.fields.ctaText) return null;
    
    return {
      text: navigationData.fields.ctaText,
      href: navigationData.fields.ctaLink || '/contact',
    };
  };

  const navItems = getNavItems();
  const logoData = getLogoData();
  const ctaData = getCTAData();

  // Loading skeleton
  if (loading) {
    return (
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="animate-pulse">
              <div className="w-32 h-8 bg-gray-200 rounded"></div>
            </div>
            <div className="hidden lg:flex space-x-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center" onClick={closeMenu}>
            {logoData ? (
              <Image
                src={logoData.url}
                alt={logoData.alt}
                width={logoData.width}
                height={logoData.height}
                className="h-8 w-auto max-w-[160px]"
                priority
              />
            ) : (
              <>
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <span className="text-xl font-bold text-gray-900">LandingPro</span>
              </>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                {item.dropdown ? (
                  <div className="relative group">
                    <button className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200">
                      {item.label}
                      <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.label}
                          href={dropdownItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {/* CTA Button */}
            {ctaData && (
              <Link
                href={ctaData.href}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                {ctaData.text}
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-gray-700 hover:text-blue-600 p-2"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-16 z-40">
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={closeMenu} />
            <div className="absolute top-0 right-0 bg-white h-full shadow-xl sm:w-80 w-full sm:border-l border-gray-200">
              <div className="flex flex-col h-full px-6 py-6">
                <div className="flex-1 space-y-1">
                  {navItems.map((item) => (
                    <div key={item.label}>
                      {item.dropdown ? (
                        <div>
                          <button
                            onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                            className="flex items-center justify-between w-full text-left text-gray-700 hover:text-blue-600 px-3 py-3 text-base font-medium transition-colors duration-200"
                          >
                            {item.label}
                            <svg 
                              className={`h-5 w-5 transform transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`} 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          {openDropdown === item.label && (
                            <div className="pl-6 space-y-1">
                              {item.dropdown.map((dropdownItem) => (
                                <Link
                                  key={dropdownItem.label}
                                  href={dropdownItem.href}
                                  className="block text-gray-600 hover:text-blue-600 px-3 py-2 text-sm transition-colors duration-200"
                                  onClick={closeMenu}
                                >
                                  {dropdownItem.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className="block text-gray-700 hover:text-blue-600 px-3 py-3 text-base font-medium transition-colors duration-200"
                          onClick={closeMenu}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Mobile CTA Button */}
                {ctaData && (
                  <div className="pt-6 border-t border-gray-200">
                    <Link
                      href={ctaData.href}
                      className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center px-6 py-3 rounded-lg text-base font-medium transition-colors duration-200"
                      onClick={closeMenu}
                    >
                      {ctaData.text}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
