"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";

export function Video({ src, poster, title }: { src: string; poster?: string; title: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      return;
    }

    if (!Hls.isSupported()) return;
    const hls = new Hls({ enableWorker: true });
    hls.loadSource(src);
    hls.attachMedia(video);
    return () => hls.destroy();
  }, [src]);

  return (
    <figure className="video-figure">
      <video ref={ref} controls playsInline preload="metadata" poster={poster} aria-label={title} />
      <figcaption>{title}</figcaption>
    </figure>
  );
}
