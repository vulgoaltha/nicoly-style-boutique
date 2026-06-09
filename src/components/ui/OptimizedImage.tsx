import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageOff } from "lucide-react";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  containerClassName?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt = "",
  className,
  fallbackSrc = "/placeholder.svg",
  containerClassName,
  width,
  height,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);

  useEffect(() => {
    setCurrentSrc(src);
    setLoaded(false);
    setError(false);
  }, [src]);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setLoaded(true);
    if (props.onLoad) {
      props.onLoad(e);
    }
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setError(true);
    setLoaded(true); // Stop loading if error
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    }
    if (props.onError) {
      props.onError(e);
    }
  };

  return (
    <div
      className={cn("relative overflow-hidden bg-muted/20", containerClassName)}
      style={{
        width: width ? (typeof width === "number" ? `${width}px` : width) : undefined,
        height: height ? (typeof height === "number" ? `${height}px` : height) : undefined,
        aspectRatio: width && height ? `${width}/${height}` : undefined,
      }}
    >
      {!loaded && <Skeleton className="absolute inset-0 w-full h-full z-10" />}

      {error && !currentSrc ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/40 text-muted-foreground p-2">
          <ImageOff className="h-8 w-8 mb-1 opacity-50" />
          <span className="text-xs truncate max-w-full">{alt || "Erro ao carregar imagem"}</span>
        </div>
      ) : (
        <img
          src={currentSrc}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          className={cn(
            "transition-transform duration-300 ease-out",
            loaded ? "scale-100" : "scale-[0.99]",
            className,
          )}
          {...props}
        />
      )}
    </div>
  );
};
