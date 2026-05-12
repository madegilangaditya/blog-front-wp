import { getProjects } from "@/helper/wpgraphql";

type ProjectNode = {
    id: string;
    slug: string;
    title: string;
    uri: string;
    description?: string | null;
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
   
        <section className="featured-portfolio-section py-[100px] relative">
            <div className="container relative text-center">
                {data.subtitle && <p className="text-sm text-brand-yellow font-bold mb-2">{data.subtitle}</p>}
                {data.title && <h2 className="font-medium mb-6 text-white">{data.title}</h2>}
                {projects.length > 0 && (
                    <div className="grid lg:grid-cols-3 gap-[30px] mt-10">
                        {projects.map((item, index) => (
                            <div key={index} className="portfolio-item-card bg-[rgba(255,255,255,0.1)] p-10 rounded-lg flex flex-col items-center text-center gap-5 text-white">
                                {item.featuredImage?.node?.sourceUrl && (
                                    <img
                                        src={item.featuredImage.node.sourceUrl}
                                        alt={item.featuredImage.node.altText || "Portfolio Item Image"}
                                        className="w-12 h-12 mb-5"
                                    />
                                )}
                                {item.title && <h3 className="font-bold text-lg mb-0">{item.title}</h3>}
                            </div>
                        ))} 
                    </div>
                )}
            </div>
        
        </section>
  );
}