import Image from 'next/image';

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: "Web Development",
      content: "We create <strong>modern, responsive websites</strong> that deliver exceptional user experiences. Our team specializes in <em>cutting-edge technologies</em> like React, Next.js, and TypeScript. From <u>custom web applications</u> to e-commerce platforms, we build digital solutions that <strong>drive business growth</strong> and engage your audience effectively.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80",
      imageAlt: "Web Development - Modern coding workspace"
    },
    {
      id: 2,
      title: "Mobile App Development",
      content: "Transform your ideas into <strong>powerful mobile applications</strong> for iOS and Android. Our <em>cross-platform development</em> approach ensures your app reaches the widest audience possible. We focus on <u>intuitive user interfaces</u> and <strong>seamless performance</strong> to create apps that users love and businesses rely on.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Mobile App Development - Smartphone and tablet apps"
    },
    {
      id: 3,
      title: "UI/UX Design",
      content: "Create <strong>stunning visual experiences</strong> that captivate your users from the first interaction. Our design process combines <em>user research</em> with creative innovation to deliver interfaces that are both <u>beautiful and functional</u>. We ensure every pixel serves a purpose in <strong>enhancing user satisfaction</strong> and driving conversions.",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2064&q=80",
      imageAlt: "UI/UX Design - Creative design process"
    },
    {
      id: 4,
      title: "Digital Strategy & Consulting",
      content: "Navigate the digital landscape with <strong>expert guidance</strong> tailored to your business goals. Our consultants provide <em>strategic insights</em> on technology choices, digital transformation, and <u>growth optimization</u>. We help you make <strong>informed decisions</strong> that accelerate your success in the digital world.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Digital Strategy - Business consultation meeting"
    }
  ];

  const createMarkup = (content: string) => {
    return { __html: content };
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive digital solutions tailored to your business needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="space-y-12 lg:space-y-16">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-6 sm:p-8 lg:p-12 ${
                  !isEven ? 'lg:grid-flow-col-dense' : ''
                }`}>
                  {/* Content */}
                  <div className={`flex flex-col justify-center ${
                    !isEven ? 'lg:col-start-2' : ''
                  }`}>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                      {service.title}
                    </h3>
                    <div 
                      className="text-gray-600 text-lg leading-relaxed"
                      dangerouslySetInnerHTML={createMarkup(service.content)}
                    />
                  </div>

                  {/* Image */}
                  <div className={`relative ${
                    !isEven ? 'lg:col-start-1 lg:row-start-1' : ''
                  }`}>
                    <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-xl overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.imageAlt}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 50vw"
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
