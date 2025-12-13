import { LayoutFunction } from '.';

// Hexagonal ring anchors with a central focus block to give evenly distributed references.
export const hexRing: LayoutFunction = (screenWidth, screenHeight, guideSize) => {
  const centerX = screenWidth / 2;
  const centerY = screenHeight / 2;

  const blockSize = {
    small: 60,
    medium: 150,
    large: 280
  };

  const radius = {
    small: Math.min(screenWidth, screenHeight) * 0.18,
    medium: Math.min(screenWidth, screenHeight) * 0.28,
    large: Math.min(screenWidth, screenHeight) * 0.38
  };

  const angles = [0, 60, 120, 180, 240, 300];

  const nodes = angles.map((deg, idx) => {
    const rad = (deg * Math.PI) / 180;
    const x = centerX + radius[guideSize] * Math.cos(rad) - blockSize[guideSize] / 2;
    const y = centerY + radius[guideSize] * Math.sin(rad) - blockSize[guideSize] / 2;

    return {
      id: `hex-node-${idx}`,
      x,
      y,
      w: blockSize,
      h: blockSize,
      text: ''
    };
  });

  const centerBlock = {
    id: 'hex-center',
    x: centerX - blockSize[guideSize] * 0.45,
    y: centerY - blockSize[guideSize] * 0.45,
    w: {
      small: blockSize.small * 0.9,
      medium: blockSize.medium * 0.9,
      large: blockSize.large * 0.9
    },
    h: {
      small: blockSize.small * 0.9,
      medium: blockSize.medium * 0.9,
      large: blockSize.large * 0.9
    },
    text: ''
  };

  return [...nodes, centerBlock];
};
