import React from 'react';
import { useImageUpload } from '../hooks/useImageUpload';

interface UploadAreaProps {
  onImageLoaded: (dataUrl: string) => void;
  currentImage: string | null;
}

export const UploadArea: React.FC<UploadAreaProps> = ({ onImageLoaded, currentImage }) => {
  const {
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
  } = useImageUpload(onImageLoaded);

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold mb-2 text-gray-700">上传商品图片</h3>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all
          ${isDragging
            ? 'border-blue-500 bg-blue-50'
            : currentImage
              ? 'border-green-400 bg-green-50'
              : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-gray-100'
          }
        `}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer block">
          {currentImage ? (
            <div className="space-y-2">
              <div className="text-green-600 text-sm">✓ 图片已上传</div>
              <div className="text-xs text-gray-500">点击重新上传</div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-gray-600 text-sm">
                拖拽图片到此处或点击上传
              </div>
              <div className="text-xs text-gray-400">
                支持 JPG, PNG, WebP • 也可以直接粘贴 (Ctrl+V)
              </div>
            </div>
          )}
        </label>
      </div>
      {currentImage && (
        <div className="mt-3">
          <img
            src={currentImage}
            alt="预览"
            className="max-h-32 mx-auto rounded border border-gray-200"
          />
        </div>
      )}
    </div>
  );
};
