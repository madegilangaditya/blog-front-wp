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

  if (!data) return null;

  const backgroundImage = data.backgroundImage?.node?.sourceUrl || "/6.jpg";

  return (
    <ParallaxProvider>
        <section className="experiences-history-section py-25 relative overflow-hidden" 
      >
            <Parallax speed={-40} style={{ backgroundImage: `url(${backgroundImage})` }} className="absolute top-0 left-0 w-full h-[calc(100%+200px)] bg-cover bg-center -z-10 before:bg-[rgba(20,20,20,0.7)] before:w-full before:h-full before:absolute before:top-0" />

            <div className="container relative">
                {data.experiencesHistory && data.experiencesHistory.length > 0 && (
                    <div className="grid lg:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] lg:auto-rows-auto gap-17.5">
                        {data.experiencesHistory.filter(Boolean).map((experience, index) => (
                            <div key={index}>
                                {experience.title && <h2 className="font-medium mb-5 text-white text-left">{experience.title}</h2>}
                                {experience.historyContent && experience.historyContent.filter(Boolean).map((history, idx) => (
                                    <div key={idx} className="flex flex-col items-start gap-5 text-white mb-7.5 pb-2.5 border-b border-b-[rgba(255,255,255,.1)]">
                                        {history.date && <span className="text-sm text-white mt-2.5 font-bold py-1.5 px-2.5 border-2 border-[#F4C325]">{history.date}</span>}
                                        {history.title && <h3 className="font-bold text-lg mb-0">{history.title}</h3>}
                                        {history.description && <div className="prose prose-invert max-w-none text-[15px]/[1.9em] mb-5 text-left prose-p:my-0 prose-p:text-[15px]/[1.9em] prose-p:text-[#999] prose-p:mb-4 prose-p:last:mb-0 prose-ul:my-0 prose-ul:pl-5 prose-li:my-0 prose-li:marker:text-[#F4C325] prose-a:text-[#F4C325] prose-a:no-underline hover:prose-a:underline prose-strong:text-white" dangerouslySetInnerHTML={{ __html: sanitize(history.description) }}></div>}
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