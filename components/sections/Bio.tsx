import { sanitize } from "@/helper/sanitize";

type SkillData ={
    skillName?: string | null;
    rate?: number | null;
}

type BioData = {
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  image?: {
    node?: {
      sourceUrl?: string | null;
      altText?: string | null;
    } | null;
  } | null;
  addButton?: boolean | null;
  buttonLink?:{
    target?: string | null;
    title?: string | null;
    url?: string | null;
  } | null;
  addSkill?: boolean | null;
  skill?: SkillData[] | null;
};

type BioProps = {
  data: BioData;
};

export default function Bio({ data }: BioProps) {
    return (
        <section id="section-about" className="py-20 bg-gray-100">
            <div className="container">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {data.image?.node?.sourceUrl && (
                    <div>
                        <img
                        src={data.image.node.sourceUrl} 
                        alt={data.image.node.altText || "Profile"}
                        className="rounded-lg w-full object-cover"
                        />
                    </div>
                    )}
                    <div>
                        {data.subtitle && <p className="text-sm text-brand-yellow font-semibold mb-2">{data.subtitle}</p>}
                        {data.title && <h2 className="font-semibold mb-6">{data.title}</h2>}
                        {data.description && <div className="text-gray-600 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: sanitize(data.description) }} />}
                        {data.addButton && data.buttonLink?.url && (
                            <a href={data.buttonLink.url} className="inline-block bg-black text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition">
                                {data.buttonLink.title || "DOWNLOAD PDF"}
                            </a>
                        )}
                    </div>
                </div>

                {data.addSkill && (
                    <div className="grid md:grid-cols-3 gap-10 mt-16">
                      {data.skill?.map((skill, index) => (
                        <div key={index} >
                            <div className="flex justify-between text-sm mb-2">
                                <span>{skill.skillName}</span>
                                <span>{skill.rate}%</span>
                            </div>
                          <div className="w-full h-1 bg-gray-300 rounded">
                            <div
                              className="h-1 bg-yellow-500 rounded"
                              style={{ width: `${skill.rate}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                )}
                        {/* <div className="space-y-6">
                            
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Design</span>
                                    <span>80%</span>
                                </div>
                                <div className="w-full h-1 bg-gray-300 rounded">
                                    <div className="h-1 bg-yellow-500 rounded" style={{ width: "80%" }}></div>
                                </div>
                            </div>

                            
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Branding</span>
                                    <span>70%</span>
                                </div>
                                <div className="w-full h-1 bg-gray-300 rounded">
                                    <div className="h-1 bg-yellow-500 rounded" style={{ width: "70%" }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Marketing</span>
                                    <span>70%</span>
                                </div>
                                <div className="w-full h-1 bg-gray-300 rounded">
                                    <div className="h-1 bg-yellow-500 rounded" style={{ width: "70%" }}></div>
                                </div>
                            </div>

                            
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Development</span>
                                    <span>90%</span>
                                </div>
                                <div className="w-full h-1 bg-gray-300 rounded">
                                    <div className="h-1 bg-yellow-500 rounded" style={{ width: "90%" }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Photography</span>
                                    <span>90%</span>
                                </div>
                                <div className="w-full h-1 bg-gray-300 rounded">
                                    <div className="h-1 bg-yellow-500 rounded" style={{ width: "90%" }}></div>
                                </div>
                            </div>

                            
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>SEO</span>
                                    <span>75%</span>
                                </div>
                                <div className="w-full h-1 bg-gray-300 rounded">
                                    <div className="h-1 bg-yellow-500 rounded" style={{ width: "75%" }}></div>
                                </div>
                            </div>
                        </div> */}
                

            </div>
        </section>
    )
}