type BioData = {
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  image?: {
    node?: {
      sourceUrl?: string | null;
    } | null;
  } | null;
  animationText?: {
    label?: string | null;
  }[] | null;
};

type BioProps = {
  data: BioData;
};

export default function Bio({ data }: BioProps) {
    return (
        <section id="section-about" className="py-20 bg-gray-100">
            <div className="containeer">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <img 
                        src="images/misc/pic-profile-2.jpg" 
                        alt="Profile"
                        className="rounded-lg w-full object-cover"
                        />
                    </div>
                    <div>
                        <p className="text-sm text-yellow-500 font-semibold mb-2">About Me</p>
                        <h2 className="text-3xl md:text-4xl font-semibold mb-6">A Quick Bio</h2>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            I am a website designer from London, with a strong focus in UI/UX design. 
                            I love to get new experiences and always learn from my surroundings. 
                            I've done more than 285 projects. You can check it through portfolio 
                            section on this website. I looking forward to any opportunities and challenges.
                        </p>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <a href="#" className="inline-block bg-black text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition">
                            DOWNLOAD PDF
                        </a>
                    </div>
                    </div>

                    
                    <div className="grid md:grid-cols-3 gap-10 mt-16">
                    
                    <div className="space-y-6">
                        
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
                    </div>

                </div>

            </div>
        </section>
    )
}