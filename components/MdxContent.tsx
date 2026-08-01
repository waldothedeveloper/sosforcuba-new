import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Video } from "@/components/HlsVideo";

function MediaImage({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="media-figure">
      <Image src={src} alt={alt} width={1400} height={900} sizes="(max-width: 900px) 100vw, 860px" />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

function Callout({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <aside className="callout">
      {title ? <strong>{title}</strong> : null}
      <div>{children}</div>
    </aside>
  );
}

function SourceLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a className="source-link" href={href} target="_blank" rel="noreferrer noopener">{children} ↗</a>;
}

const components = {
  MediaImage,
  Video,
  Callout,
  SourceLink,
  a: ({ href = "", children }: React.AnchorHTMLAttributes<HTMLAnchorElement>) =>
    href.startsWith("/") ? <Link href={href}>{children}</Link> : <a href={href} target="_blank" rel="noreferrer noopener">{children}</a>
};

export function MdxContent({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}
