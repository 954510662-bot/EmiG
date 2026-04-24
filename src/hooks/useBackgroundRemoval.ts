import { useState, useCallback } from 'react';
import * as backgroundRemoval from '@imgly/background-removal';

export interface UseBackgroundRemovalReturn {
  processedImage: string | null;
  isProcessing: boolean;
  progress: number;
  error: string | null;
  removeBackground: (inputImage: string) => Promise<string>;
  reset: () => void;
}

export function useBackgroundRemoval(): UseBackgroundRemovalReturn {
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const removeBackground = useCallback(async (inputImage: string): Promise<string> => {
    setIsProcessing(true);
    setProgress(0);
    setError(null);

    try {
      // 转换 dataUrl 到 Blob
      const response = await fetch(inputImage);
      const blob = await response.blob();

      // 使用 progress 回调
      const resultBlob = await backgroundRemoval.removeBackground(blob, {
        progress: (p) => {
          setProgress((p as unknown as number) * 100);
        },
      });

      // 转换回 dataUrl
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onloadend = () => {
          const result = reader.result as string;
          setProcessedImage(result);
          setIsProcessing(false);
          setProgress(100);
          resolve(result);
        };
        reader.readAsDataURL(resultBlob);
      });
    } catch (err) {
      console.error('Background removal failed:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setIsProcessing(false);
      throw err;
    }
  }, []);

  const reset = useCallback(() => {
    setProcessedImage(null);
    setIsProcessing(false);
    setProgress(0);
    setError(null);
  }, []);

  return {
    processedImage,
    isProcessing,
    progress,
    error,
    removeBackground,
    reset,
  };
}
