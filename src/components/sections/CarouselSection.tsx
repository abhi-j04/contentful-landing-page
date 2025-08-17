'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CarouselSectionEntry } from '@/types/contentful';

interface SlideData {
  id: string;
  src: string;
  alt: string;
  title: string;
  description?: string | undefined;
  link?: string | undefined;
  order: number;
}

interface CarouselSectionProps {
  initialData?: CarouselSectionEntry | null;
}

const CarouselSection = ({ initialData }: CarouselSectionProps) => {
  const carouselData = initialData;
  const [currentSlide, setCurrentSlide] = useState(0);

  // Transform Contentful data to component format
  const getSlides = (): SlideData[] => {
    if (!carouselData?.fields.slides?.length) return [];

    return carouselData.fields.slides
      .filter(slide => slide?.fields?.image?.fields?.file)
      .sort((a, b) => (a.fields.order || 0) - (b.fields.order || 0))
      .map(slide => ({
        id: slide.sys.id,
        src: `https:${slide.fields?.image?.fields?.file?.url}`,
        alt: slide.fields.altText,
        title: slide.fields.title,
        description: slide.fields.description,
        link: slide.fields.link,
        order: slide.fields.order
      }));
  };

  const slides = getSlides();
  const autoAdvance = carouselData?.fields.autoAdvance ?? true;
  const autoAdvanceInterval = (carouselData?.fields.autoAdvanceInterval ?? 5) * 1000;
  const showThumbnails = carouselData?.fields.showThumbnails ?? true;
  const showIndicators = carouselData?.fields.showIndicators ?? true;

  // Auto-advance carousel
  useEffect(() => {
    if (!autoAdvance || slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoAdvanceInterval);

    return () => clearInterval(timer);
  }, [slides.length, autoAdvance, autoAdvanceInterval]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Fallback content when no Contentful data
  if (!carouselData || slides.length === 0) {
    return (
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Work
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our portfolio of successful projects and digital solutions.
            </p>
          </div>
          <div className="text-center text-gray-500">
            <p>Carousel content coming soon...</p>
          </div>
        </div>
      </section>
    );
  }

  const renderSlideContent = (slide: SlideData, index: number) => {
    const slideContent = (
      <>
        <Image
          src={slide.src}
          alt={slide.alt}
          fill
          className="object-cover"
          loading={index <= 1 ? 'eager' : 'lazy'} // Load first 2 images eagerly
          quality={80}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
        />
        {/* Slide Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {/* Slide Content */}
        <div className="absolute bottom-6 left-6 text-white">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
            {slide.title}
          </h3>
          {slide.description && (
            <p className="text-sm sm:text-base text-gray-200 max-w-md">
              {slide.description}
            </p>
          )}
        </div>
      </>
    );

    if (slide.link) {
      return (
        <Link 
          href={slide.link}
          className="absolute inset-0 block"
          target={slide.link.startsWith('http') ? '_blank' : undefined}
          rel={slide.link.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {slideContent}
        </Link>
      );
    }

    return slideContent;
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {carouselData.fields.title || 'Our Work'}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {carouselData.fields.subtitle || 'Explore our portfolio of successful projects and digital solutions.'}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Main Carousel */}
          <div className="relative aspect-video sm:aspect-[16/9] lg:aspect-[21/9] overflow-hidden rounded-lg shadow-2xl">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {renderSlideContent(slide, index)}
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {slides.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200 z-10"
                aria-label="Previous slide"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200 z-10"
                aria-label="Next slide"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Slide Indicators */}
          {showIndicators && slides.length > 1 && (
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 hidden lg:flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentSlide
                      ? 'bg-white scale-110'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail Navigation */}
        {showThumbnails && slides.length > 1 && (
          <div className="hidden lg:flex justify-center mt-8 space-x-4">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`relative w-20 h-12 rounded-md overflow-hidden transition-all duration-200 ${
                  index === currentSlide
                    ? 'ring-2 ring-blue-500 scale-105'
                    : 'opacity-60 hover:opacity-80'
                }`}
                aria-label={`View ${slide.title}`}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  loading="lazy"
                  quality={60}
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CarouselSection;
