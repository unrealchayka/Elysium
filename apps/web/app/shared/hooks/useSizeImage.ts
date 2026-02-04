import { useState, useEffect } from 'react';

export function useSizeImage(url: string) {
  const [dimensions, setDimensions] = useState({ width: 800, height: 450 });

  useEffect(() => {
    if (!url) return;

    const img = new Image();
    img.onload = () => {
      setDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };
    img.src = url;
  }, [url]);

  return dimensions;
}
