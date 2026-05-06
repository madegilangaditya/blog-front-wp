"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactTyped } from "react-typed";
import { useRef } from "react";

type HeroData = {
  title?: string | null;
  bannerImage?: {
    node?: {
      sourceUrl?: string | null;
    } | null;
  } | null;
  animationText?: {
    label?: string | null;
  }[] | null;
};

type HeroProps = {
  data: HeroData;
};

export default function Hero({ data }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const backgroundImage = data.bannerImage?.node?.sourceUrl || "/6.jpg";

  const typedStrings =
    data.animationText
      ?.map((item) => item.label)
      .filter((label): label is string => Boolean(label)) || [];

  return (
    <section
      ref={ref}
      className="
        relative
        h-screen
        bg-cover
        bg-center
        bg-fixed
        flex
        items-center
        justify-center
      "
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="container relative z-10 text-center text-white"
      >
        <h1 className="text-5xl md:text-7xl 2xl:text-[120px] font-normal mb-2.5 leading-[1.1]">
          {data.title || "I'm John Arnold"}
        </h1>

        {typedStrings.length > 0 && (
          <div className="text-2xl md:text-[24px]">
            <ReactTyped
              strings={typedStrings}
              typeSpeed={60}
              backSpeed={40}
              backDelay={1500}
              loop
            />
          </div>
        )}
      </motion.div>
    </section>
  );
}