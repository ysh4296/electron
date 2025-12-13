import { LayoutFunction } from '.';

export const basic: LayoutFunction = (screenWidth, screenHeight, guideSize) => {
  const sizeMap = {
    small: { w: 80, h: 80 },
    medium: { w: 190, h: 190 },
    large: { w: 340, h: 340 }
  };

  const rect = sizeMap[guideSize];

  // 공통 중앙 좌표
  const centerX = screenWidth / 2;
  const centerY = screenHeight / 2;

  return [
    // CENTER
    {
      id: 'center',
      x: centerX - rect.w / 2,
      y: centerY - rect.h / 2,
      w: { small: 80, medium: 190, large: 340 },
      h: { small: 80, medium: 190, large: 340 },
      text: 'CENTER'
    },

    // NORTH
    {
      id: 'north',
      x: centerX - rect.w / 2,
      y: 0,
      w: { small: 80, medium: 190, large: 340 },
      h: { small: 80, medium: 190, large: 340 },
      text: 'NORTH'
    },

    // SOUTH
    {
      id: 'south',
      x: centerX - rect.w / 2,
      y: screenHeight - rect.h,
      w: { small: 80, medium: 190, large: 340 },
      h: { small: 80, medium: 190, large: 340 },
      text: 'SOUTH'
    },

    // WEST
    {
      id: 'west',
      x: 0,
      y: centerY - rect.h / 2,
      w: { small: 80, medium: 190, large: 340 },
      h: { small: 80, medium: 190, large: 340 },
      text: 'WEST'
    },

    // EAST
    {
      id: 'east',
      x: screenWidth - rect.w,
      y: centerY - rect.h / 2,
      w: { small: 80, medium: 190, large: 340 },
      h: { small: 80, medium: 190, large: 340 },
      text: 'EAST'
    }
  ];
};
