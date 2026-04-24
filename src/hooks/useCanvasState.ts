import { useState, useCallback } from 'react';
import type { Platform, CanvasState, SelectedObject, TitleConfig } from '../types';

export interface UseCanvasStateReturn {
  state: CanvasState;
  setPlatform: (platform: Platform) => void;
  selectTemplate: (templateId: string) => void;
  setProductImage: (image: string | null) => void;
  setProcessing: (processing: boolean) => void;
  selectObject: (selected: SelectedObject | null) => void;
  updateTitle: (updates: Partial<TitleConfig>) => void;
}

export function useCanvasState(defaultTemplateId: string): UseCanvasStateReturn {
  const [state, setState] = useState<CanvasState>({
    platform: 'xiaohongshu',
    selectedTemplate: defaultTemplateId,
    productImage: null,
    isProcessing: false,
    selectedObject: null,
  });

  const setPlatform = useCallback((platform: Platform) => {
    setState(prev => ({ ...prev, platform }));
  }, []);

  const selectTemplate = useCallback((templateId: string) => {
    setState(prev => ({ ...prev, selectedTemplate: templateId }));
  }, []);

  const setProductImage = useCallback((image: string | null) => {
    setState(prev => ({ ...prev, productImage: image }));
  }, []);

  const setProcessing = useCallback((processing: boolean) => {
    setState(prev => ({ ...prev, isProcessing: processing }));
  }, []);

  const selectObject = useCallback((selected: SelectedObject | null) => {
    setState(prev => ({ ...prev, selectedObject: selected }));
  }, []);

  const updateTitle = useCallback((_updates: Partial<TitleConfig>) => {
    // This will be handled at the component level with the current template
    // This is just a placeholder for the state structure
    setState(prev => ({ ...prev }));
  }, []);

  return {
    state,
    setPlatform,
    selectTemplate,
    setProductImage,
    setProcessing,
    selectObject,
    updateTitle,
  };
}
