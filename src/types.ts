export type Platform = 'douyin' | 'xiaohongshu';

export interface PlatformConfig {
  name: string;
  aspectRatio: number;
  width: number;
  height: number;
}

export interface Background {
  type: 'solid' | 'gradient' | 'texture';
  value: string;
  grain?: number;
}

export interface ProductShadow {
  enabled: boolean;
  blur: number;
  offsetX: number;
  offsetY: number;
  color: string;
}

export interface ProductConfig {
  x: number;
  y: number;
  scale: number;
  shadow: ProductShadow;
}

export interface TitleConfig {
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fill: string;
  fontFamily: string;
  align: 'left' | 'center' | 'right';
  maxWidth: number;
}

export interface Template {
  id: string;
  name: string;
  thumbnail?: string;
  background: Background;
  product: ProductConfig;
  title: TitleConfig;
}

export interface CanvasState {
  platform: Platform;
  selectedTemplate: string;
  productImage: string | null;
  isProcessing: boolean;
  selectedObject: SelectedObject | null;
}

export type SelectedObject =
  | { type: 'title'; id: string }
  | { type: 'product'; id: string };

export interface Point {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}
