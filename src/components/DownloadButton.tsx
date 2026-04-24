import React from 'react';
import Konva from 'konva';

interface DownloadButtonProps {
  stage: Konva.Stage | null;
  width: number;
  height: number;
  onExport: (stage: Konva.Stage, width: number, height: number) => void;
  disabled: boolean;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  stage,
  width,
  height,
  onExport,
  disabled,
}) => {
  const handleExport = () => {
    if (stage) {
      onExport(stage, width, height);
    }
  };

  return (
    <div>
      <button
        onClick={handleExport}
        disabled={disabled}
        className={`
          w-full py-3 px-4 rounded-lg font-semibold text-white transition-all
          ${disabled
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
          }
        `}
      >
        📥 下载 PNG (2x)
      </button>
      <p className="text-xs text-gray-500 mt-2 text-center">
        导出分辨率: {width * 2} × {height * 2}
      </p>
    </div>
  );
};
