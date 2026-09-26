"use client";

import { useEffect, useRef } from "react";
import type Hls from "hls.js";

export function Video({ src, poster, title }: { src: string; poster?: string; title: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      return;
    }

    // hls.js is ~185 KB gzipped; load it only for browsers without native HLS (not Safari/iOS).
    let hls: Hls | undefined;
    let cancelled = false;
    import("hls.js").then(({ default: HlsPlayer }) => {
      if (cancelled || !HlsPlayer.isSupported()) return;
      hls = new HlsPlayer({ enableWorker: true });
      hls.loadSource(src);
      hls.attachMedia(video);
    });
    return () => {
      cancelled = true;
      hls?.destroy();
    };
  }, [src]);

  return (
    <figure className="video-figure">
      <video ref={ref} controls playsInline preload="metadata" poster={poster} aria-label={title} />
      <figcaption>{title}</figcaption>
    </figure>
  );
}
