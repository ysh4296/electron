import { LayoutFunction } from ".";

export const crossHair: LayoutFunction = (
  screenWidth,
  screenHeight,
  guideSize
) => {
  const centerX = screenWidth / 2;
  const centerY = screenHeight / 2;

  // guideSize 비율
  const SIZE_SCALE = {
    small: 1,
    medium: 1.4,
    large: 1.9
  }[guideSize];

  // 선 두께 (홀수)
  const LINE = {
    small: 3,
    medium: 5,
    large: 7
  }[guideSize];

  // 십자선 길이
  const CROSS_LEN = screenHeight * 0.03 * SIZE_SCALE;

  // 중앙 공백
  const GAP = screenHeight * 0.015 * SIZE_SCALE;

  // 격자점 길이(짧은 선)
  const GRID_LEN = screenHeight * 0.02 * SIZE_SCALE;

  return [
    // ======================
    // 중앙 십자선 (분리형)
    // ======================

    // 🔹 위쪽 vertical bar
    {
      id: "cross-up",
      x: centerX - LINE / 2,
      y: centerY - GAP - CROSS_LEN,
      w: { small: LINE, medium: LINE, large: LINE },
      h: { small: CROSS_LEN, medium: CROSS_LEN, large: CROSS_LEN },
      text: ""
    },

    // 🔹 아래쪽 vertical bar
    {
      id: "cross-down",
      x: centerX - LINE / 2,
      y: centerY + GAP,
      w: { small: LINE, medium: LINE, large: LINE },
      h: { small: CROSS_LEN, medium: CROSS_LEN, large: CROSS_LEN },
      text: ""
    },

    // 🔹 왼쪽 horizontal bar
    {
      id: "cross-left",
      x: centerX - GAP - CROSS_LEN,
      y: centerY - LINE / 2,
      w: { small: CROSS_LEN, medium: CROSS_LEN, large: CROSS_LEN },
      h: { small: LINE, medium: LINE, large: LINE },
      text: ""
    },

    // 🔹 오른쪽 horizontal bar
    {
      id: "cross-right",
      x: centerX + GAP,
      y: centerY - LINE / 2,
      w: { small: CROSS_LEN, medium: CROSS_LEN, large: CROSS_LEN },
      h: { small: LINE, medium: LINE, large: LINE },
      text: ""
    },

    // ======================
    // 네 방향 격자점 (짧은 bar)
    // ======================

    // 🔹 NORTH Grid bar
    {
      id: "north-grid",
      x: centerX - LINE / 2,
      y: centerY - GAP - CROSS_LEN - GRID_LEN - (GRID_LEN * 0.3),
      w: { small: LINE, medium: LINE, large: LINE },
      h: { small: GRID_LEN, medium: GRID_LEN, large: GRID_LEN },
      text: ""
    },

    // 🔹 SOUTH Grid bar
    {
      id: "south-grid",
      x: centerX - LINE / 2,
      y: centerY + GAP + CROSS_LEN + (GRID_LEN * 0.3),
      w: { small: LINE, medium: LINE, large: LINE },
      h: { small: GRID_LEN, medium: GRID_LEN, large: GRID_LEN },
      text: ""
    },

    // 🔹 WEST Grid bar
    {
      id: "west-grid",
      x: centerX - GAP - CROSS_LEN - GRID_LEN - (GRID_LEN * 0.3),
      y: centerY - LINE / 2,
      w: { small: GRID_LEN, medium: GRID_LEN, large: GRID_LEN },
      h: { small: LINE, medium: LINE, large: LINE },
      text: ""
    },

    // 🔹 EAST Grid bar
    {
      id: "east-grid",
      x: centerX + GAP + CROSS_LEN + (GRID_LEN * 0.3),
      y: centerY - LINE / 2,
      w: { small: GRID_LEN, medium: GRID_LEN, large: GRID_LEN },
      h: { small: LINE, medium: LINE, large: LINE },
      text: ""
    }
  ];
};
