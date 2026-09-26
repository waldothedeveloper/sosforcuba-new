"use client";

import { useEffect, useRef } from "react";
import type Hls from "hls.js";

export function Video({ src, poster, title }: { src: string; poster?: string; title: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    // hls.js is ~185 KB gzipped; load it only when native HLS is missing or fails.
    let hls: Hls | undefined;
    let cancelled = false;
    const loadHlsJs = () => {
      import("hls.js").then(({ default: HlsPlayer }) => {
        if (cancelled || !HlsPlayer.isSupported()) return;
        video.removeAttribute("src");
        hls = new HlsPlayer({ enableWorker: true });
        hls.loadSource(src);
        hls.attachMedia(video);
      });
    };

    // Recent desktop Chrome reports "maybe" for HLS but can fail to play these streams,
    // so try native playback (Safari/iOS) first and fall back to hls.js on error.
    const onNativeError = () => loadHlsJs();
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.addEventListener("error", onNativeError, { once: true });
      video.src = src;
    } else {
      loadHlsJs();
    }

    return () => {
      cancelled = true;
      video.removeEventListener("error", onNativeError);
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
