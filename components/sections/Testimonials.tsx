'use client'

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Parallax, ParallaxProvider} from "react-scroll-parallax";

type TestimonialsData = {
    backgroundImage?: {
        node?: {
            sourceUrl?: string | null;
            altText?: string | null;
        } | null;
    } | null;
    topTitle?: string | null;
    title?: string | null;
    testimonials?: {
        clientImage?: {
            node?: {
                sourceUrl?: string | null;
                altText?: string | null;
            } | null;
        } | null;
        name?: string | null;
        company?: string | null;
        content?: string | null;
    }[] | null;
};

type TestimonialsProps = {
  data: TestimonialsData;
};

export default function Testimonials({ data }: TestimonialsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: "start", 
    loop: false, 
    slidesToScroll: 1 
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;
    const onInit = () => setScrollSnaps(emblaApi.scrollSnapList());
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onInit();
    onSelect();
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
    return () => {
      emblaApi.off("reInit", onInit).off("reInit", onSelect).off("select", onSelect);
    };
  }, [emblaApi]);

  if (!data) return null;

  const testimonials = (data.testimonials ?? []).filter(
    (t): t is NonNullable<typeof t> => Boolean(t)
  );

  const backgroundImage = data.backgroundImage?.node?.sourceUrl || "/6.jpg";

  return (
    <ParallaxProvider>
        <section className="testimonial-section py-25 relative overflow-hidden" 
      >
            <Parallax speed={-40} style={{ backgroundImage: `url(${backgroundImage})` }} className="absolute top-0 left-0 w-full h-[calc(100%+200px)] bg-cover bg-center -z-10 before:bg-[rgba(20,20,20,0.7)] before:w-full before:h-full before:absolute before:top-0" />

            <div className="container relative text-center">
                {data.topTitle && <p className="text-sm text-brand-yellow font-bold mb-2">{data.topTitle}</p>}
                {data.title && <h2 className="font-medium mb-6 text-white">{data.title}</h2>}
                {testimonials.length > 0 && (
                    <div className="mt-10">
                        <div className="overflow-hidden" ref={emblaRef}>
                            <div className="flex -ml-7.5">
                                {testimonials.map((testimonial, index) => (
                                    <div key={index} className="min-w-0 shrink-0 grow-0 basis-full lg:basis-1/3 pl-7.5">
                                        <div className="service-card bg-[rgba(255,255,255,0.1)] p-10 rounded-lg flex flex-col items-center text-center gap-5 text-white h-full">
                                            {testimonial.clientImage?.node?.sourceUrl && (
                                                <img
                                                    src={testimonial.clientImage.node.sourceUrl}
                                                    alt={testimonial.clientImage.node.altText || "Client Image"}
                                                    className="w-12 h-12 mb-5"
                                                />
                                            )}
                                            {testimonial.name && <h3 className="font-bold text-lg mb-0">{testimonial.name}</h3>}
                                            {testimonial.company && <p className="text-[15px]/[1.9em]">{testimonial.company}</p>}
                                            {testimonial.content && <p className="text-[15px]/[1.9em]">{testimonial.content}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {scrollSnaps.length > 1 && (
                            <div className="flex justify-center gap-2 mt-8">
                                {scrollSnaps.map((_, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        aria-label={`Go to slide ${index + 1}`}
                                        onClick={() => emblaApi?.scrollTo(index)}
                                        className={`h-2.5 rounded-full transition-all cursor-pointer ${index === selectedIndex ? "w-6 bg-brand-yellow" : "w-2.5 bg-white/40"}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        
        </section>
    </ParallaxProvider>
  );
}