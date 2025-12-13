import { LayoutFunction } from '.';

// Bold perimeter frame to lock horizon and edges while leaving a calm center focus box.
export const perimeterFrame: LayoutFunction = (
  screenWidth,
  screenHeight,
  guideSize
) => {
  const FRAME = {
    small: Math.max(10, Math.round(screenHeight * 0.02)),
    medium: Math.max(22, Math.round(screenHeight * 0.045)),
    large: Math.max(38, Math.round(screenHeight * 0.07))
  };

  const centerX = screenWidth / 2;
  const centerY = screenHeight / 2;

  const focusSize = {
    small: 90,
    medium: 190,
    large: 340
  };

  const verticalHeight = {
    small: screenHeight - FRAME.small * 2,
    medium: screenHeight - FRAME.medium * 2,
    large: screenHeight - FRAME.large * 2
  };

  return [
    {
      id: 'frame-top',
      x: 0,
      y: 0,
      w: { small: screenWidth, medium: screenWidth, large: screenWidth },
      h: FRAME,
      text: ''
    },
    {
      id: 'frame-bottom',
      x: 0,
      y: screenHeight - FRAME[guideSize],
      w: { small: screenWidth, medium: screenWidth, large: screenWidth },
      h: FRAME,
      text: ''
    },
    {
      id: 'frame-left',
      x: 0,
      y: FRAME[guideSize],
      w: FRAME,
      h: verticalHeight,
      text: ''
    },
    {
      id: 'frame-right',
      x: screenWidth - FRAME[guideSize],
      y: FRAME[guideSize],
      w: FRAME,
      h: verticalHeight,
      text: ''
    },
    {
      id: 'frame-focus',
      x: centerX - focusSize[guideSize] / 2,
      y: centerY - focusSize[guideSize] / 2,
      w: focusSize,
      h: focusSize,
      text: ''
    }
  ];
};
