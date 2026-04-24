import React, { useEffect, useRef, useState, useCallback } from 'react';
import Konva from 'konva';
import { Stage, Layer, Rect, Image as KonvaImage, Text, Transformer } from 'react-konva';
import type { Template, Platform, SelectedObject } from '../types';
import { PLATFORM_CONFIGS } from '../templates';

interface KonvaCanvasProps {
  template: Template;
  platform: Platform;
  productImage: string | null;
  selectedObject: SelectedObject | null;
  onSelectObject: (obj: SelectedObject | null) => void;
  onTitleChange: (updates: Partial<{ text: string; fontSize: number; fill: string; align: 'left' | 'center' | 'right' }>) => void;
  stageRef: React.MutableRefObject<Konva.Stage | null>;
}

export const KonvaCanvas: React.FC<KonvaCanvasProps> = ({
  template,
  platform,
  productImage,
  selectedObject,
  onSelectObject,
  onTitleChange,
  stageRef,
}) => {
  const [productLoadedImage, setProductLoadedImage] = useState<HTMLImageElement | null>(null);
  const [_isEditingText, setIsEditingText] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const transformerRef = useRef<any>(null);
  const productNodeRef = useRef<Konva.Image | null>(null);
  const textNodeRef = useRef<Konva.Text | null>(null);

  const config = PLATFORM_CONFIGS[platform];
  const [scale, setScale] = useState(1);

  // 计算容器缩放以适应显示区域
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // 计算缩放比例，保持一定边距
    const padding = 20;
    const availableWidth = containerWidth - padding * 2;
    const availableHeight = containerHeight - padding * 2;

    const scaleX = availableWidth / config.width;
    const scaleY = availableHeight / config.height;
    const newScale = Math.min(scaleX, scaleY, 1);
    setScale(newScale);
  }, [config.width, config.height]);

  // 加载商品图片
  useEffect(() => {
    if (!productImage) {
      setProductLoadedImage(null);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = productImage;
    img.onload = () => {
      setProductLoadedImage(img);
    };
  }, [productImage]);

  // 计算绝对坐标（百分比转像素）
  const getAbsoluteX = (percent: number) => percent * config.width;
  const getAbsoluteY = (percent: number) => percent * config.height;

  // 处理商品图片加载后设置初始位置和缩放
  useEffect(() => {
    if (!productLoadedImage || !productNodeRef.current) return;

    const node = productNodeRef.current;
    const img = productLoadedImage;

    // 设置初始位置
    node.x(getAbsoluteX(template.product.x));
    node.y(getAbsoluteY(template.product.y));

    // 计算缩放 - 根据图片宽高适配模板缩放
    const maxSize = Math.min(config.width * 0.8, config.height * 0.5);
    const imgMax = Math.max(img.width, img.height);
    const initialScale = (maxSize / imgMax) * template.product.scale;
    node.scale({ x: initialScale, y: initialScale });

    // 居中锚点
    node.offset({
      x: img.width / 2,
      y: img.height / 2,
    });
  }, [productLoadedImage, template.product, config.width, config.height]);

  // 更新 transformer
  useEffect(() => {
    if (!transformerRef.current) return;

    transformerRef.current.nodes([]);
    if (selectedObject?.type === 'product' && productNodeRef.current) {
      transformerRef.current.nodes([productNodeRef.current]);
    } else if (selectedObject?.type === 'title' && textNodeRef.current) {
      transformerRef.current.nodes([textNodeRef.current]);
    }
    transformerRef.current.getLayer()?.batchDraw();
  }, [selectedObject]);

  // 处理双击文字编辑
  const handleTextDblClick = useCallback(() => {
    if (!textNodeRef.current) return;

    setIsEditingText(true);

    // 创建一个原生输入框覆盖在文字上
    const textNode = textNodeRef.current;
    const stage = textNode.getStage();
    if (!stage || !containerRef.current) return;

    // 获取文字在页面上的位置
    const transform = textNode.getAbsoluteTransform();
    const position = transform.point({ x: 0, y: 0 });
    const containerRect = containerRef.current.getBoundingClientRect();
    const stageScale = stage.scaleX();

    // 创建输入框
    const input = document.createElement('input');
    input.type = 'text';
    input.value = template.title.text;
    input.style.position = 'absolute';
    input.style.left = `${containerRect.left + position.x * scale}px`;
    input.style.top = `${containerRect.top + position.y * scale}px`;
    input.style.width = `${textNode.width() * stageScale * scale}px`;
    input.style.fontSize = `${template.title.fontSize * stageScale * scale}px`;
    input.style.fontFamily = template.title.fontFamily;
    input.style.color = template.title.fill;
    input.style.background = 'transparent';
    input.style.border = '1px dashed #666';
    input.style.outline = 'none';
    input.style.textAlign = template.title.align;
    input.style.zIndex = '10';

    containerRef.current.appendChild(input);
    input.focus();

    const finishEditing = () => {
      if (input.value.trim()) {
        onTitleChange({ text: input.value });
      }
      input.remove();
      setIsEditingText(false);
    };

    input.addEventListener('blur', finishEditing);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        finishEditing();
      }
      if (e.key === 'Escape') {
        input.remove();
        setIsEditingText(false);
      }
    });
  }, [template.title, scale, onTitleChange]);

  // 处理滚轮缩放
  const handleWheel = useCallback((e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    if (!productNodeRef.current) return;

    const node = productNodeRef.current;
    const scaleBy = 1.1;
    const oldScale = node.scaleX();
    const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;

    // 限制缩放范围
    const minScale = 0.1;
    const maxScale = 3;
    if (newScale < minScale || newScale > maxScale) return;

    node.scale({ x: newScale, y: newScale });
    node.getLayer()?.batchDraw();
  }, []);

  // 点击背景取消选择
  const handleStageClick = useCallback((e: Konva.KonvaEventObject<MouseEvent>) => {
    if (e.target === e.target.getStage()) {
      onSelectObject(null);
    }
  }, [onSelectObject]);

  const handleProductClick = useCallback(() => {
    onSelectObject({ type: 'product', id: 'product' });
  }, [onSelectObject]);

  const handleTextClick = useCallback(() => {
    onSelectObject({ type: 'title', id: 'title' });
  }, [onSelectObject]);

  // 绘制背景渐变需要 Konva 的方式
  const getBackgroundFill = () => {
    if (template.background.type === 'gradient') {
      // Konva.js 使用 LinearGradient 对象，我们简化处理为纯色
      // 对于渐变我们可以通过 canvas context 处理，这里简化使用近似色
      return template.background.value.includes('#')
        ? template.background.value.match(/#[0-9a-fA-F]{6}/)?.[0] || '#ffffff'
        : '#ffffff';
    }
    return template.background.value;
  };

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center w-full h-full bg-gray-100 relative"
    >
      <div
        style={{
          width: config.width * scale,
          height: config.height * scale,
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          backgroundColor: 'white',
        }}
      >
        <Stage
          width={config.width}
          height={config.height}
          scale={{ x: scale, y: scale }}
          ref={(node) => {
            stageRef.current = node;
          }}
          onClick={handleStageClick}
        >
          {/* 背景层 */}
          <Layer>
            <Rect
              x={0}
              y={0}
              width={config.width}
              height={config.height}
              fill={getBackgroundFill()}
            />
            {template.background.type === 'texture' && template.background.grain && (
              // 添加简单的噪点纹理效果
              <Rect
                x={0}
                y={0}
                width={config.width}
                height={config.height}
                fillPatternImage={undefined}
                opacity={template.background.grain}
              />
            )}
          </Layer>

          {/* 商品层 */}
          <Layer>
            {productLoadedImage && (
              <KonvaImage
                ref={productNodeRef}
                image={productLoadedImage}
                draggable
                onClick={handleProductClick}
                onWheel={handleWheel}
                shadowEnabled={template.product.shadow.enabled}
                shadowBlur={template.product.shadow.blur}
                shadowOffsetX={template.product.shadow.offsetX}
                shadowOffsetY={template.product.shadow.offsetY}
                shadowColor={template.product.shadow.color}
              />
            )}
          </Layer>

          {/* 文字层 */}
          <Layer>
            <Text
              ref={textNodeRef}
              text={template.title.text}
              x={getAbsoluteX(template.title.x)}
              y={getAbsoluteY(template.title.y)}
              fontSize={template.title.fontSize}
              fill={template.title.fill}
              fontFamily={template.title.fontFamily}
              align={template.title.align}
              width={template.title.maxWidth * config.width}
              draggable
              onClick={handleTextClick}
              onDblClick={handleTextDblClick}
            />
          </Layer>

          {/* 交互层 - transformer */}
          <Layer>
            <Transformer
              ref={transformerRef}
              anchorSize={8}
              borderColor="#2563eb"
              anchorColor="#2563eb"
              enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
              keepRatio
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
};
