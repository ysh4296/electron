export const grid = (screenWidth: number, screenHeight: number): Postit[] => {
  return [
    {
      id: 'center',
      x: screenWidth / 2 - 120,
      y: screenHeight / 2 - 120,
      w: { small: 80, medium: 160, large: 240 },
      h: { small: 80, medium: 160, large: 240 },
      text: 'CENTER'
    },
    {
      id: 'north',
      x: screenWidth / 2 - 140,
      y: 0,
      w: { small: 140, medium: 280, large: 420 },
      h: { small: 80, medium: 160, large: 240 },
      text: 'NORTH'
    },
    {
      id: 'south',
      x: screenWidth / 2 - 140,
      y: screenHeight - 80,
      w: { small: 140, medium: 280, large: 420 },
      h: { small: 80, medium: 160, large: 240 },
      text: 'SOUTH'
    },
    {
      id: 'west',
      x: 0,
      y: screenHeight / 2 - 140,
      w: { small: 140, medium: 280, large: 420 },
      h: { small: 80, medium: 160, large: 240 },
      text: 'WEST'
    },
    {
      id: 'east',
      x: screenWidth - 140,
      y: screenHeight / 2 - 140,
      w: { small: 140, medium: 280, large: 420 },
      h: { small: 80, medium: 160, large: 240 },
      text: 'EAST'
    }
  ];
};
