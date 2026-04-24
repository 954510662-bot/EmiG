import React from 'react';
import type { Template } from '../types';

interface TemplateGalleryProps {
  templates: Template[];
  selectedTemplateId: string;
  onSelect: (templateId: string) => void;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({
  templates,
  selectedTemplateId,
  onSelect,
}) => {
  const getPreviewBackground = (template: Template): React.CSSProperties => {
    if (template.background.type === 'gradient') {
      return { background: template.background.value };
    }
    return { backgroundColor: template.background.value };
  };

  return (
    <div>
      <h3 className="text-sm font-semibold mb-3 text-gray-700">选择模板</h3>
      <div className="grid grid-cols-1 gap-3">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => onSelect(template.id)}
            className={`
              cursor-pointer rounded-lg overflow-hidden border-2 transition-all
              ${selectedTemplateId === template.id
                ? 'border-blue-500 shadow-md'
                : 'border-gray-200 hover:border-blue-300'
              }
            `}
          >
            <div
              className="aspect-[3/4] relative"
              style={getPreviewBackground(template)}
            >
              {/* 模拟商品占位 */}
              <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[70%] aspect-square bg-white/20 rounded"></div>
              {/* 模拟文字占位 */}
              <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-[80%] h-4 rounded-full opacity-40"
                style={{ backgroundColor: template.title.fill }}
              ></div>
              <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-colors"></div>
            </div>
            <div className="p-2 bg-white text-center">
              <span className="text-xs font-medium text-gray-700">{template.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
