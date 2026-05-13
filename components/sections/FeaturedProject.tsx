import { getProjects } from "@/helper/wpgraphql";
import Link from "next/link";

type ProjectNode = {
    id: string;
    slug: string;
    title: string;
    uri: string;
    featuredImage?: {
        node?: {
            sourceUrl?: string | null;
            altText?: string | null;
        } | null;
    } | null;
};

type FeaturedProjectData = {
    title?: string | null;
    subtitle?: string | null;
    getDataType?: string | null;
    manualSelect?: {
        nodes?: ProjectNode[];
    } | null;
    maximumProjects?: number | null;
    addMoreProject?: boolean | null;
    moreProjectButton?: {
        target?: string | null;
        title?: string | null;
        url?: string | null;
    } | null; 
};

type FeaturedProjectProps = {
  data: FeaturedProjectData;
};

export default async function FeaturedProject({ data }: FeaturedProjectProps) {
    const isRecent = data.getDataType?.includes("recent");

  const projects = isRecent
    ? await getProjects(data.maximumProjects ?? 6)
    : data.manualSelect?.nodes ?? [];
    console.log("Fetched projects for FeaturedProject:", projects);

  return (
   
        <section className="featured-portfolio-section py-25 relative">
            <div className="container relative text-center">
                {data.subtitle && <p className="text-sm text-brand-yellow font-bold mb-2">{data.subtitle}</p>}
                {data.title && <h2 className="font-medium mb-6">{data.title}</h2>}
                {projects.length > 0 && (
                    <div className="grid lg:grid-cols-3 gap-7.5 mt-10">
                        {projects.map((item, index) => (
                            <Link key={index} href={item.uri} className="group portfolio-item-card bg-[rgba(255,255,255,0.1)] p-10 rounded-lg flex flex-col items-center text-center gap-5 text-white aspect-3/2 relative overflow-hidden">
                                {item.featuredImage?.node?.sourceUrl && (
                                    <img
                                        src={item.featuredImage.node.sourceUrl}
                                        alt={item.featuredImage.node.altText || "Portfolio Item Image"}
                                        className="w-full h-full absolute mb-5 top-0"
                                    />
                                )}

                                {item.title &&
                                    <span className="absolute inset-0 bg-[#202020] bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-5">
                                        <h3 className="font-bold text-base mb-0">{item.title}</h3>
                                    </span> 
                                    
                                }
                            </Link>
                        ))} 
                    </div>
                    
                )}
                {data.addMoreProject && data.moreProjectButton?.url &&(
                    <Link href={data.moreProjectButton?.url} className="inline-block bg-[#202020] text-white px-6 py-3 rounded-md text-xs font-bold uppercase hover:opacity-80 hover:shadow-[8px_8px_40px_0px_rgba(0,0,0,0.3)] transition mt-10" 
                        target={data.moreProjectButton?.target || "_self"}
                        rel={
                            data.moreProjectButton?.target === "_blank"
                            ? "noopener noreferrer"
                            : undefined
                        }
                    >
                            {data.moreProjectButton?.title || "View More Projects"}
                    </Link>
                )}
            </div>
        
        </section>
  );
}