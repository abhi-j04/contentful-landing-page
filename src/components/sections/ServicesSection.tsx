import Image from 'next/image';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { ServicesSectionEntry } from '@/types/contentful';

interface ServiceData {
  id: string;
  title: string;
  content: string;
  image: string;
  imageAlt: string;
  order: number;
  featured?: boolean | undefined;
}

interface ServicesSectionProps {
  initialData?: ServicesSectionEntry | null;
}

const ServicesSection = ({ initialData }: ServicesSectionProps) => {
  const servicesData = initialData;

  // Rich text renderer options
  const richTextOptions = {
    renderMark: {
      [MARKS.BOLD]: (text: string) => `<strong>${text}</strong>`,
      [MARKS.ITALIC]: (text: string) => `<em>${text}</em>`,
      [MARKS.UNDERLINE]: (text: string) => `<u>${text}</u>`,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, next: any) => `<p>${next(node.content)}</p>`,
    },
  };

  const getServices = (): ServiceData[] => {
    if (!servicesData?.fields.services?.length) return [];

    return servicesData.fields.services
      .filter(service => service?.fields?.image?.fields?.file)
      .sort((a, b) => (a.fields.order || 0) - (b.fields.order || 0))
      .map(service => ({
        id: service.sys.id,
        title: service.fields.title,
        content: documentToHtmlString(service.fields.content, richTextOptions),
        image: `https:${service.fields.image.fields.file?.url}`,
        imageAlt: service.fields.imageAlt,
        order: service.fields.order,
        featured: service.fields.featured
      }));
  };

  const services = getServices();
  const backgroundColor = servicesData?.fields.backgroundColor || 'gray';
  const layout = servicesData?.fields.layout || 'alternating';

  const createMarkup = (content: string) => {
    return { __html: content };
  };

  const getSectionBgClass = () => {
    const bgClasses = {
      gray: 'bg-gray-50',
      white: 'bg-white',
      blue: 'bg-blue-50',
      custom: 'bg-gradient-to-br from-gray-50 to-blue-50'
    };
    return bgClasses[backgroundColor];
  };

  // Fallback content when no Contentful data
  if (!servicesData || services.length === 0) {
    return (
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </div>
          <div className="text-center text-gray-500">
            <p>Services content coming soon...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 sm:py-20 lg:py-24 ${getSectionBgClass()}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {servicesData.fields.title || 'Our Services'}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {servicesData.fields.subtitle || 'Comprehensive digital solutions tailored to your business needs'}
          </p>
        </div>

        {/* Services Grid */}
        <div className="space-y-12 lg:space-y-16">
          {services.map((service, index) => {
            const shouldAlternate = layout === 'alternating';
            const isEven = index % 2 === 0;
            const imageOnLeft = shouldAlternate ? isEven : layout === 'uniform-left';
            
            return (
              <div
                key={service.id}
                className={`bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden ${
                  service.featured ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-6 sm:p-8 lg:p-12 ${
                  !imageOnLeft ? 'lg:grid-flow-col-dense' : ''
                }`}>
                  {/* Content */}
                  <div className={`flex flex-col justify-center ${
                    !imageOnLeft ? 'lg:col-start-2' : ''
                  }`}>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                      {service.title}
                      {service.featured && (
                        <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Featured
                        </span>
                      )}
                    </h3>
                    <div 
                      className="text-gray-600 text-lg leading-relaxed prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={createMarkup(service.content)}
                    />
                  </div>

                  {/* Image */}
                  <div className={`relative ${
                    !imageOnLeft ? 'lg:col-start-1 lg:row-start-1' : ''
                  }`}>
                    <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-xl overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.imageAlt}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        loading={index <= 1 ? 'eager' : 'lazy'} // Load first 2 images eagerly
                        quality={85}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
