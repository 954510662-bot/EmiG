import React from 'react';
import type { TitleConfig } from '../types';

interface TextPropertiesProps {
  title: TitleConfig;
  onChange: (updates: Partial<TitleConfig>) => void;
}

const COLOR_PRESETS = [
  '#000000',
  '#333333',
  '#ffffff',
  '#667eea',
  '#f5576c',
  '#f093fb',
  '#764ba2',
];

const FONT_SIZE_PRESETS = [36, 48, 60, 64, 72, 80];

export const TextProperties: React.FC<TextPropertiesProps> = ({ title, onChange }) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold mb-3 text-gray-700">文字属性</h3>

      <div className="mb-4">
        <label className="block text-xs text-gray-600 mb-2">文字内容</label>
        <input
          type="text"
          value={title.text}
          onChange={(e) => onChange({ text: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-xs text-gray-600 mb-2">字体大小: {title.fontSize}px</label>
        <input
          type="range"
          min="24"
          max="120"
          step="2"
          value={title.fontSize}
          onChange={(e) => onChange({ fontSize: Number(e.target.value) })}
          className="w-full accent-blue-600"
        />
        <div className="flex justify-between mt-1">
          {FONT_SIZE_PRESETS.map(size => (
            <button
              key={size}
              onClick={() => onChange({ fontSize: size })}
              className={`
                text-xs px-2 py-1 rounded ${
                  title.fontSize === size
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs text-gray-600 mb-2">文字颜色</label>
        <div className="flex flex-wrap gap-2">
          {COLOR_PRESETS.map(color => (
            <button
              key={color}
              onClick={() => onChange({ fill: color })}
              className={`
                w-8 h-8 rounded-full border-2 hover:scale-110 transition-transform
                ${title.fill === color ? 'border-gray-800' : 'border-gray-300'}
              `}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
          <input
            type="color"
            value={title.fill}
            onChange={(e) => onChange({ fill: e.target.value })}
            className="w-8 h-8 p-0 border border-gray-300 rounded cursor-pointer"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs text-gray-600 mb-2">对齐方式</label>
        <div className="flex gap-2">
          {(['left', 'center', 'right'] as const).map(align => (
            <button
              key={align}
              onClick={() => onChange({ align })}
              className={`
                flex-1 px-2 py-1 text-xs rounded border ${
                  title.align === align
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              {align === 'left' ? '左' : align === 'center' ? '中' : '右'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
