import Link from 'next/link';
import Image from 'next/image';
import { HeroSectionEntry } from '@/types/contentful';

interface CTAData {
  text: string;
  href: string;
  style: 'primary' | 'secondary' | 'outline';
  openInNewTab?: boolean | undefined;
}

interface LogoData {
  id: string;
  name: string;
  url: string;
  alt: string;
  website?: string | undefined;
}

interface BackgroundImageData {
  mobile: { url: string; alt: string };
  desktop: { url: string; alt: string };
}

interface HeroSectionProps {
  initialData?: HeroSectionEntry | null;
}

const HeroSection = ({ initialData }: HeroSectionProps) => {
  const heroData = initialData;

  const getPrimaryCTA = (): CTAData | null => {
    if (!heroData?.fields.primaryCta) return null;

    const cta = heroData.fields.primaryCta;
    return {
      text: cta.fields.text,
      href: cta.fields.link,
      style: cta.fields.style,
      openInNewTab: cta.fields.openInNewTab,
    };
  };

  const getSecondaryCTA = (): CTAData | null => {
    if (!heroData?.fields.secondaryCta) return null;

    const cta = heroData.fields.secondaryCta;
    return {
      text: cta.fields.text,
      href: cta.fields.link,
      style: cta.fields.style,
      openInNewTab: cta.fields.openInNewTab,
    };
  };

  const getBackgroundImages = (): BackgroundImageData | null => {
    if (
      !heroData?.fields.backgroundImageMobile?.fields?.file ||
      !heroData?.fields.backgroundImageDesktop?.fields?.file
    )
      return null;

    return {
      mobile: {
        url: `https:${heroData.fields.backgroundImageMobile.fields.file.url}`,
        alt: heroData.fields.backgroundImageAlt,
      },
      desktop: {
        url: `https:${heroData.fields.backgroundImageDesktop.fields.file.url}`,
        alt: heroData.fields.backgroundImageAlt,
      },
    };
  };

  const getCompanyLogos = (): LogoData[] => {
    if (!heroData?.fields.companyLogos?.length) return [];

    return heroData.fields.companyLogos
      .filter((logo) => logo.fields?.logo?.fields?.file) // Filter out logos without valid files
      .map((logo) => ({
        id: logo.sys.id,
        name: logo.fields.name,
        url: `https:${logo.fields.logo.fields.file!.url}`,
        alt: logo.fields.altText,
        website: logo.fields.website,
      }));
  };

  const renderCTAButton = (ctaData: CTAData) => {
    const baseClasses =
      'w-full sm:w-auto font-semibold py-3 px-6 lg:py-4 lg:px-8 rounded-lg text-base lg:text-lg transition-colors duration-200';

    const styleClasses = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white',
      secondary:
        'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20 hover:border-white/30',
      outline: 'border-2 border-white text-white hover:bg-white hover:text-blue-600',
    };

    const classes = `${baseClasses} ${styleClasses[ctaData.style]}`;

    return (
      <Link
        href={ctaData.href}
        className={classes}
        target={ctaData.openInNewTab ? '_blank' : undefined}
        rel={ctaData.openInNewTab ? 'noopener noreferrer' : undefined}
      >
        {ctaData.text}
      </Link>
    );
  };

  const primaryCTA = getPrimaryCTA();
  const secondaryCTA = getSecondaryCTA();
  const backgroundImages = getBackgroundImages();
  const companyLogos = getCompanyLogos();

  // Add proper min-heights and prevent layout shift
  if (!heroData) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-100">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-black animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-black/70 z-10" />
        <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            <div className="h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 bg-white/10 rounded animate-pulse" />
            <div className="h-16 sm:h-20 bg-white/10 rounded animate-pulse max-w-3xl mx-auto" />
            <div className="flex gap-4 justify-center pt-4 sm:pt-6 lg:pt-8">
              <div className="w-40 h-12 lg:h-14 bg-white/10 rounded animate-pulse" />
              <div className="w-40 h-12 lg:h-14 bg-white/10 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      {backgroundImages ? (
        <>
          <Image
            src={backgroundImages.mobile.url}
            alt={backgroundImages.mobile.alt}
            fill
            className="object-cover md:hidden"
            priority={true}
            quality={75}
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
          />
          <Image
            src={backgroundImages.desktop.url}
            alt={backgroundImages.desktop.alt}
            fill
            className="object-cover hidden md:block"
            priority={true}
            quality={85}
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
          />
        </>
      ) : (
        // Fallback background
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-black" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-black/70 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
            <span className="block">{heroData?.fields.title || 'Transform Your'}</span>
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {heroData?.fields.highlightedTitle || 'Digital Presence'}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light">
            <span className="block sm:hidden">
              {heroData?.fields.subtitleMobile ||
                'We create exceptional web experiences that drive results.'}
            </span>
            <span className="hidden sm:block">
              {heroData?.fields.subtitleDesktop ||
                'We create exceptional web experiences that drive results. From concept to launch, we build modern, responsive websites that engage your audience and grow your business.'}
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center items-center pt-4 sm:pt-6 lg:pt-8">
            {primaryCTA && renderCTAButton(primaryCTA)}
            {secondaryCTA && renderCTAButton(secondaryCTA)}
          </div>

          {/* Trust Section */}
          {heroData?.fields.showTrustSection && companyLogos.length > 0 && (
            <div className="pt-6 sm:pt-8 lg:pt-12 hidden sm:block">
              <p className="text-sm text-gray-300 mb-4 lg:mb-6">
                {heroData.fields.trustSectionTitle || 'Trusted by innovative companies worldwide'}
              </p>
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 opacity-60">
                {companyLogos.map((logo) => (
                  <div
                    key={logo.id}
                    className="bg-white/10 rounded-lg px-4 py-2 lg:px-6 lg:py-3 backdrop-blur-sm"
                  >
                    {logo.website ? (
                      <Link href={logo.website} target="_blank" rel="noopener noreferrer">
                        <Image
                          src={logo.url}
                          alt={logo.alt}
                          width={120}
                          height={40}
                          className="h-8 lg:h-10 w-auto object-contain filter brightness-0 invert"
                        />
                      </Link>
                    ) : (
                      <Image
                        src={logo.url}
                        alt={logo.alt}
                        width={120}
                        height={40}
                        className="h-8 lg:h-10 w-auto object-contain filter brightness-0 invert"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden sm:block">
        <div className="animate-bounce">
          <svg
            className="w-5 h-5 lg:w-6 lg:h-6 text-white/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
