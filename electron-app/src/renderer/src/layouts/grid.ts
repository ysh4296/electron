import { LayoutFunction } from ".";

export const grid: LayoutFunction = (screenWidth, screenHeight, guideSize) => {
  const thirdW = screenWidth / 3;
  const thirdH = screenHeight / 3;

  const LINE_THICKNESS = {
    small: 8,
    medium: 16,
    large: 24
  };

   return [
    // 🔹 Vertical Line 1 (1/3 지점)
    {
      id: "v-line-1",
      x: thirdW - LINE_THICKNESS[guideSize] / 2, // 중앙 보정
      y: 0,
      w: LINE_THICKNESS,
      h: { small: screenHeight, medium: screenHeight, large: screenHeight },
      text: ""
    },

    // 🔹 Vertical Line 2 (2/3 지점)
    {
      id: "v-line-2",
      x: thirdW * 2 - LINE_THICKNESS[guideSize] / 2, // 중앙 보정
      y: 0,
      w: LINE_THICKNESS,
      h: { small: screenHeight, medium: screenHeight, large: screenHeight },
      text: ""
    },

    // 🔹 Horizontal Line 1 (1/3 지점)
    {
      id: "h-line-1",
      x: 0,
      y: thirdH - LINE_THICKNESS[guideSize] / 2, // 중앙 보정
      w: { small: screenWidth, medium: screenWidth, large: screenWidth },
      h: LINE_THICKNESS,
      text: ""
    },

    // 🔹 Horizontal Line 2 (2/3 지점)
    {
      id: "h-line-2",
      x: 0,
      y: thirdH * 2 - LINE_THICKNESS[guideSize] / 2, // 중앙 보정
      w: { small: screenWidth, medium: screenWidth, large: screenWidth },
      h: LINE_THICKNESS,
      text: ""
    }
  ];
};
