import { useState, useRef, useCallback, useEffect } from 'react';
import Konva from 'konva';
import { LeftPanel } from './components/LeftPanel';
import { RightPanel } from './components/RightPanel';
import { CanvasArea } from './components/CanvasArea';
import { DEFAULT_TEMPLATES } from './templates';
import { useBackgroundRemoval } from './hooks/useBackgroundRemoval';
import { useExport } from './hooks/useExport';
import type { Platform, Template, SelectedObject, TitleConfig } from './types';
import './App.css';

function App() {
  // 状态管理
  const [platform, setPlatform] = useState<Platform>('xiaohongshu');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(DEFAULT_TEMPLATES[0].id);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [selectedObject, setSelectedObject] = useState<SelectedObject | null>(null);
  const [customTitle, setCustomTitle] = useState<TitleConfig>(DEFAULT_TEMPLATES[0].title);

  const stageRef = useRef<Konva.Stage | null>(null);
  const { processedImage, isProcessing, removeBackground } = useBackgroundRemoval();
  const { exportToPng } = useExport();

  // 当模板改变时更新自定义标题
  useEffect(() => {
    const template = DEFAULT_TEMPLATES.find(t => t.id === selectedTemplateId);
    if (template) {
      setCustomTitle(template.title);
    }
    setSelectedObject(null);
  }, [selectedTemplateId]);

  // 当上传新图片时自动移除背景
  const handleImageLoaded = useCallback(async (dataUrl: string) => {
    setOriginalImage(dataUrl);
    try {
      await removeBackground(dataUrl);
    } catch (e) {
      console.error('Failed to remove background:', e);
    }
  }, [removeBackground]);

  // 更新标题属性
  const handleTitleChange = useCallback((updates: Partial<TitleConfig>) => {
    setCustomTitle(prev => ({ ...prev, ...updates }));
  }, []);

  // 获取当前模板并合并自定义标题
  const currentTemplate: Template = {
    ...(DEFAULT_TEMPLATES.find(t => t.id === selectedTemplateId) || DEFAULT_TEMPLATES[0]),
    title: customTitle,
  };

  const productImage = processedImage || originalImage;

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* 头部 */}
      <header className="h-14 border-b border-gray-200 bg-white px-6 flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-lg font-bold text-gray-800">
            🛍️ 电商主图快速生成器
          </h1>
          <p className="text-xs text-gray-500">
            自动抠图 • 模板编辑 • 一键导出
          </p>
        </div>
        <div className="text-xs text-gray-400">
          适配抖音 / 小红书
        </div>
      </header>

      {/* 主内容区 */}
      <div className="flex flex-1 overflow-hidden">
        <LeftPanel
          templates={DEFAULT_TEMPLATES}
          selectedTemplateId={selectedTemplateId}
          onTemplateSelect={setSelectedTemplateId}
          onImageLoaded={handleImageLoaded}
          currentImage={originalImage}
        />

        <CanvasArea
          template={currentTemplate}
          platform={platform}
          productImage={productImage}
          selectedObject={selectedObject}
          onSelectObject={setSelectedObject}
          onTitleChange={handleTitleChange}
          stageRef={stageRef}
        />

        <RightPanel
          platform={platform}
          onPlatformChange={setPlatform}
          selectedObject={selectedObject}
          currentTitle={customTitle}
          onTitleChange={handleTitleChange}
          stageRef={stageRef}
          onExport={exportToPng}
          productImage={productImage}
          isProcessing={isProcessing}
        />
      </div>
    </div>
  );
}

export default App;
