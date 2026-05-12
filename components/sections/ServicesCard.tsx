'use client'

import { Parallax, ParallaxProvider} from "react-scroll-parallax";

type ServicesData = {
    title?: string | null;
    subtitle?: string | null;
    backgroundImage?: {
        node?: {
            sourceUrl?: string | null;
            altText?: string | null;
        } | null;
    } | null;
    services?: {
        iconImage?: {
            node?: {
                sourceUrl?: string | null;
                altText?: string | null;
            } | null;
        } | null;
        title?: string | null;
        description?: string | null;
    }[] | null;
};

type ServicesProps = {
  data: ServicesData;
};

export default function ServicesCard({ data }: ServicesProps) {

  const backgroundImage = data.backgroundImage?.node?.sourceUrl || "/6.jpg";

  return (
    <ParallaxProvider>
        <section className="services-section py-[100px] relative overflow-hidden" 
      >
            <Parallax speed={-40} style={{ backgroundImage: `url(${backgroundImage})` }} className="absolute top-0 left-0 w-full h-[calc(100%+200px)] bg-cover bg-center -z-10 before:bg-[rgba(20,20,20,0.7)] before:w-full before:h-full before:absolute before:top-0" />

            <div className="container relative text-center">
                {data.subtitle && <p className="text-sm text-brand-yellow font-bold mb-2">{data.subtitle}</p>}
                {data.title && <h2 className="font-medium mb-6 text-white">{data.title}</h2>}
                {data.services && (
                    <div className="grid lg:grid-cols-3 gap-[30px] mt-10">
                        {data.services.map((service, index) => (
                            <div key={index} className="service-card bg-[rgba(255,255,255,0.1)] p-10 rounded-lg flex flex-col items-center text-center gap-5 text-white">
                                {service.iconImage?.node?.sourceUrl && (
                                    <img
                                        src={service.iconImage.node.sourceUrl}
                                        alt={service.iconImage.node.altText || "Service Icon"}
                                        className="w-12 h-12 mb-5"
                                    />
                                )}
                                {service.title && <h3 className="font-bold text-lg mb-0">{service.title}</h3>}
                                {service.description && <p className="text-[15px]/[1.9em]">{service.description}</p>}
                            </div>
                        ))} 
                    </div>
                )}
            </div>
        
        </section>
    </ParallaxProvider>
  );
}