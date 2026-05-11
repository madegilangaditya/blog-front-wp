"use client";

import { motion, useMotionTemplate, useScroll, useSpring, useMotionValue } from "framer-motion";
import { useLayoutEffect, useRef } from "react";

type ParallaxSectionProps = {
  children: React.ReactNode;
  image: string;
  ratio?: number;
  className?: string;
  startY?: number;
};

export default function ParallaxSection({
  children,
  image,
  ratio = 0.4,
  className = "",
  startY = 0,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const rawBgY = useMotionValue(startY);

  const smoothBgY = useSpring(rawBgY, {
    stiffness: 600,
    damping: 60,
    mass: 0.2,
  });

  const { scrollY } = useScroll();
  const initialized = useRef(false);

  useLayoutEffect(() => {
    const update = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;

      /**
       * Stellar-like formula:
       * y = (scrollTop - sectionTop - startingBackgroundY) * (1 - ratio)
       */
      const y =
        (window.scrollY - sectionTop - startY) * (1 - ratio) + startY;

      if (!initialized.current) {
        rawBgY.jump(y);
        smoothBgY.jump(y);
        initialized.current = true;
      } else {
        rawBgY.set(y);
      }
    };

    update();

    const unsubscribe = scrollY.on("change", update);

    window.addEventListener("resize", update);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", update);
    };
  }, [scrollY, rawBgY, smoothBgY, ratio, startY]);

  const backgroundPosition = useMotionTemplate`center ${smoothBgY}px`;

  return (
    <motion.section
      ref={ref}
      className={`bg-no-repeat ${className}`}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition,
        willChange: "background-position",
      }}
    >
      {children}
    </motion.section>
  );
}