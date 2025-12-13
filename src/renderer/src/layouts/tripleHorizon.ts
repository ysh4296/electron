import { LayoutFunction } from '.';

// Three strong horizon bands with a centered focus box to ease motion tracking.
export const tripleHorizon: LayoutFunction = (
  screenWidth,
  screenHeight,
  guideSize
) => {
  const centerX = screenWidth / 2;
  const centerY = screenHeight / 2;

  const BAND = {
    small: Math.max(8, Math.round(screenHeight * 0.014)),
    medium: Math.max(22, Math.round(screenHeight * 0.032)),
    large: Math.max(40, Math.round(screenHeight * 0.06))
  };

  const focusSize = {
    small: 80,
    medium: 180,
    large: 320
  };

  const topY = screenHeight * 0.22;
  const bottomY = screenHeight * 0.78 - BAND[guideSize];

  return [
    {
      id: 'horizon-top',
      x: 0,
      y: topY,
      w: { small: screenWidth, medium: screenWidth, large: screenWidth },
      h: BAND,
      text: ''
    },
    {
      id: 'horizon-middle',
      x: 0,
      y: centerY - BAND[guideSize] / 2,
      w: { small: screenWidth, medium: screenWidth, large: screenWidth },
      h: BAND,
      text: ''
    },
    {
      id: 'horizon-bottom',
      x: 0,
      y: bottomY,
      w: { small: screenWidth, medium: screenWidth, large: screenWidth },
      h: BAND,
      text: ''
    },
    {
      id: 'focus-block',
      x: centerX - focusSize[guideSize] / 2,
      y: centerY - focusSize[guideSize] / 2,
      w: focusSize,
      h: focusSize,
      text: ''
    }
  ];
};
