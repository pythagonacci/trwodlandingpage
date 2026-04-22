"use client";

import { ComponentProps, useCallback, useEffect, useRef, useState } from "react";

type AutoplayVideoProps = Omit<ComponentProps<"video">, "children" | "src"> & {
  src: string;
  sourceType?: string;
  playLabel?: string;
};

export function AutoplayVideo({
  src,
  sourceType = "video/mp4",
  className,
  muted = true,
  autoPlay = true,
  loop = true,
  playsInline = true,
  preload = "metadata",
  playLabel = "Play video",
  onCanPlay,
  onLoadedData,
  ...props
}: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showManualPlay, setShowManualPlay] = useState(false);
  const shouldMute = muted !== false;

  const syncMobilePlaybackAttributes = useCallback(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.muted = shouldMute;
    video.defaultMuted = shouldMute;
    video.playsInline = playsInline;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
  }, [playsInline, shouldMute]);

  const tryPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video || !autoPlay || !shouldMute) {
      return;
    }

    syncMobilePlaybackAttributes();

    void video
      .play()
      .then(() => setShowManualPlay(false))
      .catch(() => setShowManualPlay(true));
  }, [autoPlay, shouldMute, syncMobilePlaybackAttributes]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    syncMobilePlaybackAttributes();

    if (!("IntersectionObserver" in window)) {
      tryPlay();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tryPlay();
        } else {
          video.pause();
        }
      },
      { rootMargin: "160px 0px", threshold: 0.12 }
    );

    observer.observe(video);

    const onVisibilityChange = () => {
      if (!document.hidden) {
        tryPlay();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [syncMobilePlaybackAttributes, tryPlay]);

  const handleManualPlay = () => {
    tryPlay();
  };

  return (
    <>
      <video
        ref={videoRef}
        className={className}
        autoPlay={autoPlay && shouldMute}
        loop={loop}
        muted={shouldMute}
        playsInline={playsInline}
        preload={preload}
        onCanPlay={(event) => {
          onCanPlay?.(event);
          tryPlay();
        }}
        onLoadedData={(event) => {
          onLoadedData?.(event);
          tryPlay();
        }}
        {...props}
      >
        <source src={src} type={sourceType} />
      </video>
      {showManualPlay ? (
        <button
          type="button"
          onClick={handleManualPlay}
          className="absolute bottom-3 left-3 rounded-lg bg-[rgba(28,25,23,0.78)] px-3 py-2 text-[12px] font-medium text-white backdrop-blur-sm transition-colors duration-200 hover:bg-[rgba(28,25,23,0.92)]"
        >
          {playLabel}
        </button>
      ) : null}
    </>
  );
}
