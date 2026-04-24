import type { Template } from './types';

export const PLATFORM_CONFIGS = {
  douyin: {
    name: '抖音',
    aspectRatio: 1 / 1,
    width: 1024,
    height: 1024,
  },
  xiaohongshu: {
    name: '小红书',
    aspectRatio: 3 / 4,
    width: 900,
    height: 1200,
  },
} as const;

export const DEFAULT_TEMPLATES: Template[] = [
  {
    id: 'simple-white',
    name: '简约白底',
    background: {
      type: 'solid',
      value: '#ffffff',
    },
    product: {
      x: 0.5,
      y: 0.4,
      scale: 0.75,
      shadow: {
        enabled: true,
        blur: 20,
        offsetX: 0,
        offsetY: 10,
        color: 'rgba(0, 0, 0, 0.15)',
      },
    },
    title: {
      text: '点击编辑标题',
      x: 0.5,
      y: 0.85,
      fontSize: 64,
      fill: '#333333',
      fontFamily: 'sans-serif',
      align: 'center',
      maxWidth: 0.9,
    },
  },
  {
    id: 'clean-gradient',
    name: '渐变轻奢',
    background: {
      type: 'gradient',
      value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    product: {
      x: 0.5,
      y: 0.4,
      scale: 0.7,
      shadow: {
        enabled: true,
        blur: 30,
        offsetX: 0,
        offsetY: 15,
        color: 'rgba(0, 0, 0, 0.25)',
      },
    },
    title: {
      text: '点击编辑标题',
      x: 0.5,
      y: 0.82,
      fontSize: 60,
      fill: '#ffffff',
      fontFamily: 'sans-serif',
      align: 'center',
      maxWidth: 0.9,
    },
  },
  {
    id: 'paper-texture',
    name: '纸张纹理',
    background: {
      type: 'texture',
      value: '#f8f5f0',
      grain: 0.3,
    },
    product: {
      x: 0.5,
      y: 0.4,
      scale: 0.72,
      shadow: {
        enabled: true,
        blur: 25,
        offsetX: 0,
        offsetY: 12,
        color: 'rgba(0, 0, 0, 0.12)',
      },
    },
    title: {
      text: '点击编辑标题',
      x: 0.5,
      y: 0.84,
      fontSize: 58,
      fill: '#2c2c2c',
      fontFamily: 'serif',
      align: 'center',
      maxWidth: 0.85,
    },
  },
  {
    id: 'dark-minimal',
    name: '深色极简',
    background: {
      type: 'solid',
      value: '#1a1a1a',
    },
    product: {
      x: 0.5,
      y: 0.4,
      scale: 0.7,
      shadow: {
        enabled: false,
        blur: 0,
        offsetX: 0,
        offsetY: 0,
        color: 'rgba(0, 0, 0, 0)',
      },
    },
    title: {
      text: '点击编辑标题',
      x: 0.5,
      y: 0.85,
      fontSize: 62,
      fill: '#ffffff',
      fontFamily: 'sans-serif',
      align: 'center',
      maxWidth: 0.9,
    },
  },
  {
    id: 'vibrant-pop',
    name: '活力撞色',
    background: {
      type: 'gradient',
      value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    product: {
      x: 0.5,
      y: 0.42,
      scale: 0.68,
      shadow: {
        enabled: true,
        blur: 35,
        offsetX: 0,
        offsetY: 20,
        color: 'rgba(0, 0, 0, 0.3)',
      },
    },
    title: {
      text: '点击编辑标题',
      x: 0.5,
      y: 0.78,
      fontSize: 68,
      fill: '#ffffff',
      fontFamily: 'sans-serif',
      align: 'center',
      maxWidth: 0.9,
    },
  },
];
