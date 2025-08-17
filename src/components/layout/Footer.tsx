'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FooterSectionEntry } from '@/types/contentful';

interface LinkData {
  label: string;
  href: string;
  openInNewTab?: boolean | undefined;
  order: number;
}

interface LinkGroupData {
  title: string;
  links: LinkData[];
  order: number;
}

interface SocialData {
  platform: string;
  url: string;
  icon: string;
  order: number;
}

interface FooterProps {
  initialData?: FooterSectionEntry | null | undefined;
}

const Footer = ({ initialData }: FooterProps) => {
  const footerData = initialData;
  const currentYear = new Date().getFullYear();

  // Transform Contentful data to component format
  const getLinkGroups = (): LinkGroupData[] => {
    if (!footerData?.fields.linkGroups?.length) return [];

    return footerData.fields.linkGroups
      .sort((a, b) => (a.fields.order || 0) - (b.fields.order || 0))
      .map((group) => ({
        title: group.fields.title,
        order: group.fields.order,
        links:
          group.fields.links
            ?.sort((a, b) => (a.fields.order || 0) - (b.fields.order || 0))
            .map((link) => ({
              label: link.fields.label,
              href: link.fields.url,
              openInNewTab: link.fields.openInNewTab,
              order: link.fields.order,
            })) || [],
      }));
  };

  const getSocialLinks = (): SocialData[] => {
    if (!footerData?.fields.socialLinks?.length) return [];

    return footerData.fields.socialLinks
      .sort((a, b) => (a.fields.order || 0) - (b.fields.order || 0))
      .map((social) => ({
        platform: social.fields.platform,
        url: social.fields.url,
        icon: social.fields.icon,
        order: social.fields.order,
      }));
  };

  const linkGroups = getLinkGroups();
  const socialLinks = getSocialLinks();
  const showBackToTop = footerData?.fields.showBackToTop ?? true;
  const backgroundColor = footerData?.fields.backgroundColor || 'dark';

  const getSectionBgClass = () => {
    const bgClasses = {
      dark: 'bg-gray-900 text-white',
      light: 'bg-gray-100 text-gray-900',
      blue: 'bg-blue-900 text-white',
      custom: 'bg-gradient-to-br from-gray-900 to-blue-900 text-white',
    };
    return bgClasses[backgroundColor];
  };

  const SocialIcon = ({ icon }: { icon: string }) => {
    const iconPaths = {
      twitter:
        'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z',
      linkedin:
        'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 2a2 2 0 100 4 2 2 0 000-4z',
      github:
        'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22',
      facebook: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
      instagram: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z',
      youtube:
        'M23 12s0-4-1-6c-1-1-2-1-3-1-4 0-10 0-10 0s-6 0-10 0c-1 0-2 0-3 1-1 2-1 6-1 6s0 4 1 6c1 1 2 1 3 1 4 0 10 0 10 0s6 0 10 0c1 0 2 0 3-1 1-2 1-6 1-6z',
      dribbble: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z',
      behance: 'M6.5 17.5l1.5-4h3l1.5 4h2l-4-10h-2l-4 10h2z',
    };

    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={iconPaths[icon as keyof typeof iconPaths]}
        />
      </svg>
    );
  };

  // Fallback footer when no Contentful data
  if (!footerData) {
    return (
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12 lg:py-16">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <span className="text-xl font-bold">LandingPro</span>
              </div>
              <p className="text-gray-400">Footer content loading...</p>
            </div>
          </div>
          <div className="border-t border-gray-800 py-6">
            <div className="text-center text-gray-400 text-sm">
              © {currentYear} LandingPro. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className={getSectionBgClass()}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-4">
                {footerData.fields.companyLogo?.fields?.file ? (
                  <Image
                    src={`https:${footerData.fields.companyLogo.fields.file.url}`}
                    alt={footerData.fields.companyName}
                    width={32}
                    height={32}
                    className="w-8 h-8 mr-3"
                  />
                ) : (
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-lg">
                      {footerData.fields.companyName.charAt(0)}
                    </span>
                  </div>
                )}
                <span className="text-xl font-bold">{footerData.fields.companyName}</span>
              </div>
              <p
                className={`mb-4 leading-relaxed ${backgroundColor === 'light' ? 'text-gray-600' : 'text-gray-400'}`}
              >
                {footerData.fields.companyDescription}
              </p>
              <div
                className={`text-sm space-y-1 ${backgroundColor === 'light' ? 'text-gray-600' : 'text-gray-400'}`}
              >
                <p>📧 {footerData.fields.email}</p>
                {footerData.fields.phone && <p>📞 {footerData.fields.phone}</p>}
                {footerData.fields.address && <p>📍 {footerData.fields.address}</p>}
              </div>
            </div>

            {/* Dynamic Link Groups */}
            {linkGroups.slice(0, 3).map((group) => (
              <div key={group.title}>
                <h3 className="text-lg font-semibold mb-4">{group.title}</h3>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className={`transition-colors duration-200 ${
                          backgroundColor === 'light'
                            ? 'text-gray-600 hover:text-gray-900'
                            : 'text-gray-400 hover:text-white'
                        }`}
                        target={link.openInNewTab ? '_blank' : undefined}
                        rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Social Media */}
            {socialLinks.length > 0 && (
              <div className={linkGroups.length < 3 ? '' : 'lg:col-start-4'}>
                <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.platform}
                      href={social.url}
                      className={`transition-colors duration-200 ${
                        backgroundColor === 'light'
                          ? 'text-gray-600 hover:text-gray-900'
                          : 'text-gray-400 hover:text-white'
                      }`}
                      aria-label={social.platform}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SocialIcon icon={social.icon} />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`border-t py-6 ${backgroundColor === 'light' ? 'border-gray-300' : 'border-gray-800'}`}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div
              className={`text-sm ${backgroundColor === 'light' ? 'text-gray-600' : 'text-gray-400'}`}
            >
              © {currentYear} {footerData.fields.copyrightText}
            </div>

            {/* Quick Links from first group */}
            {linkGroups.length > 0 && (
              <div className="flex flex-wrap justify-center sm:justify-end space-x-6 text-sm">
                {linkGroups[0].links.slice(0, 3).map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`transition-colors duration-200 ${
                      backgroundColor === 'light'
                        ? 'text-gray-600 hover:text-gray-900'
                        : 'text-gray-400 hover:text-white'
                    }`}
                    target={link.openInNewTab ? '_blank' : undefined}
                    rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors duration-200 z-30"
            aria-label="Back to top"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        )}
      </div>
    </footer>
  );
};

export default Footer;
