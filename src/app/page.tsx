import { HeroSection, CarouselSection, ServicesSection } from '@/components/sections';
import { fetchHeroSection, fetchCarouselSection } from '@/lib/contentful-api';

export default async function Home() {
  // Server-side data fetching
  const [heroResult, carouselResult] = await Promise.all([
    fetchHeroSection(),
    fetchCarouselSection()
  ]);
  
  const heroData = heroResult.success ? heroResult.data : null;
  const carouselData = carouselResult.success ? carouselResult.data : null;
  
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
      <ServicesSection />
    </>
  );
}

// Add this for better SEO and performance
export const metadata = {
  title: 'Your Landing Page',
  description: 'Transform your digital presence...',
};
