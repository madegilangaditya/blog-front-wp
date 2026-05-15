'use client'

import { Parallax, ParallaxProvider} from "react-scroll-parallax";
import { sanitize } from "@/helper/sanitize";

type ExperienceHistoryData = {
    backgroundImage?: {
        node?: {
            sourceUrl?: string | null;
            altText?: string | null;
        } | null;
    } | null;
    experiencesHistory?: {
        title?: string | null;
        historyContent?: {
            date?: string | null;
            title?: string | null;
            description?: string | null;
        }[] | null;
    }[] | null;
};

type ExperienceHistoryProps = {
  data: ExperienceHistoryData;
};

export default function ExperiencesHistory({ data }: ExperienceHistoryProps) {

  const backgroundImage = data.backgroundImage?.node?.sourceUrl || "/6.jpg";

  return (
    <ParallaxProvider>
        <section className="experiences-history-section py-25 relative overflow-hidden" 
      >
            <Parallax speed={-40} style={{ backgroundImage: `url(${backgroundImage})` }} className="absolute top-0 left-0 w-full h-[calc(100%+200px)] bg-cover bg-center -z-10 before:bg-[rgba(20,20,20,0.7)] before:w-full before:h-full before:absolute before:top-0" />

            <div className="container relative text-center">
                {data.experiencesHistory && (
                    <div className="grid lg:grid-cols-3 gap-7.5 mt-10">
                        {data.experiencesHistory.map((experience, index) => (
                            <div key={index}>
                                {experience.title && <h2 className="font-medium mb-6 text-white">{experience.title}</h2>}
                                {experience.historyContent && experience.historyContent.map((history, idx) => (
                                    <div key={idx} className="service-card bg-[rgba(255,255,255,0.1)] p-10 rounded-lg flex flex-col items-center text-center gap-5 text-white">
                                        {history.date && <span className="text-sm text-[#888888] mb-2">{history.date}</span>}
                                        {history.title && <h3 className="font-bold text-lg mb-0">{history.title}</h3>}
                                        {history.description && <div className="text-[15px]/[1.9em]" dangerouslySetInnerHTML={{ __html: sanitize(history.description) }}></div>}
                                    </div>
                                ))}
                            </div>
                        ))} 
                    </div>
                )}
            </div>
        
        </section>
    </ParallaxProvider>
  );
}