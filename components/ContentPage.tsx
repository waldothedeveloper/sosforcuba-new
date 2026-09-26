import { notFound } from "next/navigation";
import { MdxContent } from "@/components/MdxContent";
import { getPage } from "@/lib/content";

export async function ContentPage({ slug }: { slug: string }) {
  const page = await getPage(slug);
  if (!page) notFound();

  return (
    <main>
      <header className="page-hero shell narrow">
        {page.eyebrow ? <p className="eyebrow">{page.eyebrow}</p> : null}
        <h1>{page.title}</h1>
        <p>{page.description}</p>
      </header>
      <article className="prose shell narrow">
        <MdxContent source={page.body} />
      </article>
    </main>
  );
}
