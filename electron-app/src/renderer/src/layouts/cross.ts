import { LayoutFunction } from ".";

export const cross: LayoutFunction = (screenWidth, screenHeight, guideSize) => {
  const centerX = screenWidth / 2;
  const centerY = screenHeight / 2;

  const LINE_THICKNESS = {
    small: 3,
    medium: 5,
    large: 7 // 홀수!
  };

  return [
    // 세로선
    {
      id: "cross-vertical",
      x: centerX - LINE_THICKNESS[guideSize] / 2,
      y: 0,
      w: LINE_THICKNESS,
      h: { small: screenHeight, medium: screenHeight, large: screenHeight },
      text: ""
    },
    // 가로선
    {
      id: "cross-horizontal",
      x: 0,
      y: centerY - LINE_THICKNESS[guideSize] / 2,
      w: { small: screenWidth, medium: screenWidth, large: screenWidth },
      h: LINE_THICKNESS,
      text: ""
    }
  ];
};
