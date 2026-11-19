
type ResultCounterData = {
    results?: {
        counter?: number | null;
        title?: string | null;
    }[] | null;
};

type ResultCounterProps = {
  data: ResultCounterData;
};

export default function ResultCounter({ data }: ResultCounterProps) {

  if (!data) return null;


  return (
   
        <section className="experiences-history-section py-25 relative overflow-hidden">
            <div className="container relative">
                {data.results && data.results.length > 0 && (
                    <div className="grid lg:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] lg:auto-rows-auto gap-17.5">
                        {data.results.filter(Boolean).map((result, index) => (
                            <div key={index}>
                                {result.counter && <h3 className="font-medium mb-5 text-white text-left">{result.counter}</h3>}
                                {result.title && <span className="font-bold text-lg mb-0">{result.title}</span>}
                            </div>
                        ))} 
                    </div>
                )}
            </div>
        </section>
  );
}