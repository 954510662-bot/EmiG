import React from 'react';
import type { Platform } from '../types';
import { PLATFORM_CONFIGS } from '../templates';

interface PlatformSelectorProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  selected,
  onChange,
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold mb-3 text-gray-700">选择平台</h3>
      <div className="space-y-2">
        {(Object.entries(PLATFORM_CONFIGS) as [Platform, typeof PLATFORM_CONFIGS.douyin][]).map(
          ([key, config]) => (
            <label
              key={key}
              className={`
                flex items-center p-3 rounded-lg border cursor-pointer transition-all
                ${selected === key
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-blue-300'
                }
              `}
            >
              <input
                type="radio"
                name="platform"
                value={key}
                checked={selected === key}
                onChange={() => onChange(key)}
                className="mr-3 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <div className="font-medium text-gray-800 text-sm">{config.name}</div>
                <div className="text-xs text-gray-500">
                  {config.width} × {config.height} ({config.width}:{config.height})
                </div>
              </div>
            </label>
          )
        )}
      </div>
    </div>
  );
};
