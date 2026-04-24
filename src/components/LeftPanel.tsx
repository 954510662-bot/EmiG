import React from 'react';
import type { Template } from '../types';
import { UploadArea } from './UploadArea';
import { TemplateGallery } from './TemplateGallery';

interface LeftPanelProps {
  templates: Template[];
  selectedTemplateId: string;
  onTemplateSelect: (templateId: string) => void;
  onImageLoaded: (dataUrl: string) => void;
  currentImage: string | null;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({
  templates,
  selectedTemplateId,
  onTemplateSelect,
  onImageLoaded,
  currentImage,
}) => {
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto h-full">
      <UploadArea onImageLoaded={onImageLoaded} currentImage={currentImage} />
      <TemplateGallery
        templates={templates}
        selectedTemplateId={selectedTemplateId}
        onSelect={onTemplateSelect}
      />
    </div>
  );
};
