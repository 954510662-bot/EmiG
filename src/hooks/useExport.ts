import { useCallback } from 'react';
import Konva from 'konva';

export interface UseExportReturn {
  exportToPng: (stage: Konva.Stage, width: number, height: number) => void;
}

export function useExport(): UseExportReturn {
  const exportToPng = useCallback((stage: Konva.Stage, width: number, height: number) => {
    // 创建一个临时 stage 以 2x 分辨率导出
    const tempStage = new Konva.Stage({
      width: width * 2,
      height: height * 2,
      container: document.createElement('div'),
    });

    // 克隆所有图层到临时 stage 并缩放
    const originalLayers = stage.getLayers();
    originalLayers.forEach(layer => {
      const clonedLayer = layer.clone({
        scale: { x: 2, y: 2 },
      });
      tempStage.add(clonedLayer);
    });

    // 导出
    const dataURL = tempStage.toDataURL({
      mimeType: 'image/png',
      quality: 1.0,
    });

    // 创建下载
    const link = document.createElement('a');
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
    link.download = `ecommerce-main-${timestamp}.png`;
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 清理
    tempStage.destroy();
  }, []);

  return { exportToPng };
}
