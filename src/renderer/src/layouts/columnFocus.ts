import { LayoutFunction } from '.';

// Strong vertical columns plus short horizon bars to stabilize peripheral vision.
export const columnFocus: LayoutFunction = (
  screenWidth,
  screenHeight,
  guideSize
) => {
  const centerX = screenWidth / 2;
  const centerY = screenHeight / 2;

  const COLUMN_W = {
    small: Math.max(8, Math.round(screenWidth * 0.01)),
    medium: Math.max(22, Math.round(screenWidth * 0.02)),
    large: Math.max(36, Math.round(screenWidth * 0.032))
  };

  const COLUMN_H = {
    small: Math.round(screenHeight * 0.58),
    medium: Math.round(screenHeight * 0.72),
    large: Math.round(screenHeight * 0.84)
  };

  const BAR_L = {
    small: Math.round(screenWidth * 0.15),
    medium: Math.round(screenWidth * 0.24),
    large: Math.round(screenWidth * 0.34)
  };

  const GAP = screenWidth * 0.18;

  const focusSize = {
    small: 70,
    medium: 170,
    large: 300
  };

  return [
    {
      id: 'column-left',
      x: centerX - GAP - COLUMN_W[guideSize] / 2,
      y: centerY - COLUMN_H[guideSize] / 2,
      w: COLUMN_W,
      h: COLUMN_H,
      text: ''
    },
    {
      id: 'column-center',
      x: centerX - COLUMN_W[guideSize] / 2,
      y: centerY - COLUMN_H[guideSize] / 2,
      w: COLUMN_W,
      h: COLUMN_H,
      text: ''
    },
    {
      id: 'column-right',
      x: centerX + GAP - COLUMN_W[guideSize] / 2,
      y: centerY - COLUMN_H[guideSize] / 2,
      w: COLUMN_W,
      h: COLUMN_H,
      text: ''
    },
    {
      id: 'bar-upper',
      x: centerX - BAR_L[guideSize] / 2,
      y: centerY - COLUMN_H[guideSize] * 0.35,
      w: BAR_L,
      h: COLUMN_W,
      text: ''
    },
    {
      id: 'bar-lower',
      x: centerX - BAR_L[guideSize] / 2,
      y: centerY + COLUMN_H[guideSize] * 0.35 - COLUMN_W[guideSize],
      w: BAR_L,
      h: COLUMN_W,
      text: ''
    },
    {
      id: 'focus-core',
      x: centerX - focusSize[guideSize] / 2,
      y: centerY - focusSize[guideSize] / 2,
      w: focusSize,
      h: focusSize,
      text: ''
    }
  ];
};
