import { LayoutFunction } from '.';

export const cross: LayoutFunction = (screenWidth, screenHeight, guideSize) => {
  const centerX = screenWidth / 2;
  const centerY = screenHeight / 2;

  const LINE_THICKNESS = {
    small: 3,
    medium: 9,
    large: 18
  };

  return [
    {
      id: 'cross-vertical',
      x: centerX - LINE_THICKNESS[guideSize] / 2,
      y: 0,
      w: LINE_THICKNESS,
      h: { small: screenHeight, medium: screenHeight, large: screenHeight },
      text: ''
    },
    {
      id: 'cross-horizontal',
      x: 0,
      y: centerY - LINE_THICKNESS[guideSize] / 2,
      w: { small: screenWidth, medium: screenWidth, large: screenWidth },
      h: LINE_THICKNESS,
      text: ''
    }
  ];
};
