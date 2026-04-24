import React from 'react';
import type { Platform, SelectedObject, TitleConfig } from '../types';
import { PLATFORM_CONFIGS } from '../templates';
import { PlatformSelector } from './PlatformSelector';
import { TextProperties } from './TextProperties';
import { DownloadButton } from './DownloadButton';
import Konva from 'konva';

interface RightPanelProps {
  platform: Platform;
  onPlatformChange: (platform: Platform) => void;
  selectedObject: SelectedObject | null;
  currentTitle: TitleConfig;
  onTitleChange: (updates: Partial<TitleConfig>) => void;
  stageRef: React.MutableRefObject<Konva.Stage | null>;
  onExport: (stage: Konva.Stage, width: number, height: number) => void;
  productImage: string | null;
  isProcessing: boolean;
}

export const RightPanel: React.FC<RightPanelProps> = ({
  platform,
  onPlatformChange,
  selectedObject,
  currentTitle,
  onTitleChange,
  stageRef,
  onExport,
  productImage,
  isProcessing,
}) => {
  const config = PLATFORM_CONFIGS[platform];
  const isDisabled = !productImage || isProcessing;

  return (
    <div className="w-64 bg-gray-50 border-l border-gray-200 p-4 overflow-y-auto h-full">
      <PlatformSelector selected={platform} onChange={onPlatformChange} />

      {selectedObject?.type === 'title' && (
        <TextProperties title={currentTitle} onChange={onTitleChange} />
      )}

      {selectedObject === null && productImage && (
        <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-700">
          提示：双击画布中的文字可以直接编辑</p>
        </div>
      )}

      {!productImage && (
        <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-yellow-700">
            ⚠ 请先上传商品图片
          </p>
        </div>
      )}

      {isProcessing && (
        <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-700">
            正在移除背景中...请稍候...</p>
        </div>
      )}

      <DownloadButton
        stage={stageRef.current}
        width={config.width}
        height={config.height}
        onExport={onExport}
        disabled={isDisabled}
      />

      <div className="mt-6 p-3 bg-gray-100 rounded-lg">
        <h4 className="text-xs font-semibold text-gray-600 mb-2">操作说明</h4>
        <ul className="text-xs text-gray-500 space-y-1">
          <li>• 拖拽商品可移动位置</li>
          <li>• 滚轮缩放商品大小</li>
          <li>• 双击文字可编辑内容</li>
          <li>• 点击文字可编辑属性</li>
        </ul>
      </div>
    </div>
  );
};
