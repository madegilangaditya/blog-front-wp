"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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
//   const ref = useRef<HTMLDivElement>(null);

//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start start", "end start"],
//   });

//   const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
//   const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const backgroundImage = data.backgroundImage?.node?.sourceUrl || "/6.jpg";

  return (
    <section className="services-section bg-cover" style={
        {
            backgroundImage:`url(${backgroundImage})`
        }
    }>
        <div className="container">
            {data.subtitle && <p className="text-sm text-brand-yellow font-bold mb-2">{data.subtitle}</p>}
            {data.title && <h2 className="font-medium mb-6">{data.title}</h2>}
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
                            {service.title && <h3 className="font-bold text-lg mb-2">{service.title}</h3>}
                            {service.description && <p className="text-[15px]/[1.9em]">{service.description}</p>}
                        </div>
                    ))} 
                </div>
            )}
        </div>
        
    </section>
  );
}