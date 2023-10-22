import { defaultImages } from '@utils/constants';
import { useEffect, useState } from 'react';

export default function useCheckErrorImage(url: string, defaultImage = defaultImages.ERROR) {
  const [isError, setIsError] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!url) {
      setIsError(true);
      setImageUrl(defaultImage);
      setIsLoading(false);
      return;
    }

    const img = new Image();
    img.onerror = () => {
      setIsError(true);
      setImageUrl(defaultImage);
      setIsLoading(false);
    };
    img.onload = () => {
      setImageUrl(url);
      setIsLoading(false);
    };
    img.src = url;
  }, [url, defaultImage]);

  return { isError, imageUrl, isLoading };
}
