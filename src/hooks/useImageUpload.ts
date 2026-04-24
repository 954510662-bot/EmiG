import { useState, useCallback, useRef } from 'react';

export interface UseImageUploadReturn {
  image: string | null;
  isDragging: boolean;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePaste: (e: ClipboardEvent) => void;
  clearImage: () => void;
}

export function useImageUpload(onImageLoaded: (dataUrl: string) => void): UseImageUploadReturn {
  const [image, setImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const pasteListenerRef = useRef<((e: ClipboardEvent) => void) | null>(null);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('请上传图片文件');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setImage(dataUrl);
      onImageLoaded(dataUrl);
    };
    reader.readAsDataURL(file);
  }, [onImageLoaded]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, [processFile]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  }, [processFile]);

  const handlePaste = useCallback((e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (const item of items) {
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) {
          processFile(file);
          break;
        }
      }
    }
  }, [processFile]);

  const clearImage = useCallback(() => {
    setImage(null);
  }, []);

  // 监听粘贴事件
  useState(() => {
    const handler = (e: ClipboardEvent) => handlePaste(e);
    pasteListenerRef.current = handler;
    document.addEventListener('paste', handler);
    return () => {
      if (pasteListenerRef.current) {
        document.removeEventListener('paste', pasteListenerRef.current);
      }
    };
  });

  return {
    image,
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
    handlePaste,
    clearImage,
  };
}
