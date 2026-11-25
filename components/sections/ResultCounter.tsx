
"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

type ResultCounterData = {
    results?: {
        counter?: number | null;
        title?: string | null;
    }[] | null;
};

type ResultCounterProps = {
  data: ResultCounterData;
};

function Counter({ value, duration = 2.5 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [isInView, value, duration]);

  return (
    <h3 ref={ref} className="font-extrabold mb-0 text-brand-gray text-[40px]/[44px] tabular-nums">
      {display}
    </h3>
  );
}

export default function ResultCounter({ data }: ResultCounterProps) {

  if (!data) return null;


  return (
   
        <section className="experiences-history-section py-15 relative overflow-hidden">
            <div className="container relative">
                {data.results && data.results.length > 0 && (
                    <div className="grid lg:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] lg:auto-rows-auto gap-7.5">
                        {data.results.filter(Boolean).map((result, index) => (
                            <div key={index} className="text-center">
                                {result.counter != null && <Counter value={Number(result.counter)} />}
                                {result.title && <span className=" text-[15px] mb-0">{result.title}</span>}
                            </div>
                        ))} 
                    </div>
                )}
            </div>
        </section>
  );
}