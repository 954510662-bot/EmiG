import React from 'react';
import Konva from 'konva';
import type { Template, Platform, SelectedObject } from '../types';
import { KonvaCanvas } from './KonvaCanvas';

interface CanvasAreaProps {
  template: Template;
  platform: Platform;
  productImage: string | null;
  selectedObject: SelectedObject | null;
  onSelectObject: (obj: SelectedObject | null) => void;
  onTitleChange: (updates: Partial<{ text: string; fontSize: number; fill: string; align: 'left' | 'center' | 'right' }>) => void;
  stageRef: React.MutableRefObject<Konva.Stage | null>;
}

export const CanvasArea: React.FC<CanvasAreaProps> = (props) => {
  return (
    <div className="flex-1 h-full overflow-hidden">
      <KonvaCanvas {...props} />
    </div>
  );
};
