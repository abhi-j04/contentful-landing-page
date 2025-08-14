import { HeroSection, CarouselSection, ServicesSection } from '@/components/sections';
import { fetchHeroSection, fetchCarouselSection, fetchServicesSection } from '@/lib/contentful-api';

export default async function Home() {
  // Server-side data fetching
  const [heroResult, carouselResult, servicesResult] = await Promise.all([
    fetchHeroSection(),
    fetchCarouselSection(),
    fetchServicesSection()
  ]);
  
  const heroData = heroResult.success ? heroResult.data : null;
  const carouselData = carouselResult.success ? carouselResult.data : null;
  const servicesData = servicesResult.success ? servicesResult.data : null;
  
  // Extract image URLs for preloading
  const mobileImageUrl = heroData?.fields.backgroundImageMobile?.fields?.file?.url;
  const desktopImageUrl = heroData?.fields.backgroundImageDesktop?.fields?.file?.url;

  return (
    <>
      {/* Preload critical hero images */}
      {mobileImageUrl && (
        <link
          rel="preload"
          href={`https:${mobileImageUrl}`}
          as="image"
          media="(max-width: 768px)"
        />
      )}
      {desktopImageUrl && (
        <link
          rel="preload"
          href={`https:${desktopImageUrl}`}
          as="image"
          media="(min-width: 769px)"
        />
      )}
      
      <HeroSection initialData={heroData} />
      <CarouselSection initialData={carouselData} />
      <ServicesSection initialData={servicesData} />
    </>
  );
}

// Add this for better SEO and performance
export const metadata = {
  title: 'Your Landing Page',
  description: 'Transform your digital presence...',
};
