import { getPage } from "../helper/wpgraphql";
import RenderSections from "../helper/render-dynamic-component-wp";

export default async function Page({ params }: any) {
  const resolvedParams = await params;

  const slug = resolvedParams.slug?.join("/") || "home";
  const uri = `/${slug}/`;

  const data = await getPage(uri);
  console.log("Fetched page data:", data);

  if (!data.page) {
    return <main>Not found</main>;
  }

  return (
    <main>
      <RenderSections sections={data.page.components?.sections} />
    </main>
  );
}