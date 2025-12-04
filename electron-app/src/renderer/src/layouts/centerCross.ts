import { LayoutFunction } from ".";

export const centerCross: LayoutFunction = (
  screenWidth,
  screenHeight,
  guideSize
) => {
  const centerX = screenWidth / 2;
  const centerY = screenHeight / 2;

  // guideSize 스케일
  const SIZE_SCALE = {
    small: 1,
    medium: 1.6,
    large: 2.2
  }[guideSize];

  // 홀수 두께 → 정중앙 정렬
  const LINE_THICKNESS = {
    small: 3,
    medium: 5,
    large: 7
  }[guideSize];

  // Crosshair 크기
  const CROSS_SIZE = screenHeight * 0.10 * SIZE_SCALE;

  // Tick 길이
  const TICK_SIZE = screenHeight * 0.06 * SIZE_SCALE;

  // 🔥 여기! 중앙 십자와 tick 사이의 갭
  const CENTER_GAP = screenHeight * 0.03 * SIZE_SCALE;

  return [
    // ======================
    // 🔹 CROSSHAIR (분리형)
    // ======================

    // 위쪽 vertical
    {
      id: "cross-vertical-top",
      x: centerX - LINE_THICKNESS / 2,
      y: centerY - CROSS_SIZE - CENTER_GAP,
      w: { small: LINE_THICKNESS, medium: LINE_THICKNESS, large: LINE_THICKNESS },
      h: { small: CROSS_SIZE, medium: CROSS_SIZE, large: CROSS_SIZE },
      text: ""
    },

    // 아래쪽 vertical
    {
      id: "cross-vertical-bottom",
      x: centerX - LINE_THICKNESS / 2,
      y: centerY + CENTER_GAP,
      w: { small: LINE_THICKNESS, medium: LINE_THICKNESS, large: LINE_THICKNESS },
      h: { small: CROSS_SIZE, medium: CROSS_SIZE, large: CROSS_SIZE },
      text: ""
    },

    // 왼쪽 horizontal
    {
      id: "cross-horizontal-left",
      x: centerX - CROSS_SIZE - CENTER_GAP,
      y: centerY - LINE_THICKNESS / 2,
      w: { small: CROSS_SIZE, medium: CROSS_SIZE, large: CROSS_SIZE },
      h: { small: LINE_THICKNESS, medium: LINE_THICKNESS, large: LINE_THICKNESS },
      text: ""
    },

    // 오른쪽 horizontal
    {
      id: "cross-horizontal-right",
      x: centerX + CENTER_GAP,
      y: centerY - LINE_THICKNESS / 2,
      w: { small: CROSS_SIZE, medium: CROSS_SIZE, large: CROSS_SIZE },
      h: { small: LINE_THICKNESS, medium: LINE_THICKNESS, large: LINE_THICKNESS },
      text: ""
    },

    // ======================
    // 🔹 방향 TICKS (방향 표식)
    // ======================

    // NORTH Tick
    {
      id: "north-tick",
      x: centerX - LINE_THICKNESS / 2,
      y: centerY - CROSS_SIZE - CENTER_GAP - TICK_SIZE - CENTER_GAP,
      w: { small: LINE_THICKNESS, medium: LINE_THICKNESS, large: LINE_THICKNESS },
      h: { small: TICK_SIZE, medium: TICK_SIZE, large: TICK_SIZE },
      text: ""
    },

    // SOUTH Tick
    {
      id: "south-tick",
      x: centerX - LINE_THICKNESS / 2,
      y: centerY + CROSS_SIZE + CENTER_GAP + CENTER_GAP,
      w: { small: LINE_THICKNESS, medium: LINE_THICKNESS, large: LINE_THICKNESS },
      h: { small: TICK_SIZE, medium: TICK_SIZE, large: TICK_SIZE },
      text: ""
    },

    // WEST Tick
    {
      id: "west-tick",
      x: centerX - CROSS_SIZE - CENTER_GAP - TICK_SIZE - CENTER_GAP,
      y: centerY - LINE_THICKNESS / 2,
      w: { small: TICK_SIZE, medium: TICK_SIZE, large: TICK_SIZE },
      h: { small: LINE_THICKNESS, medium: LINE_THICKNESS, large: LINE_THICKNESS },
      text: ""
    },

    // EAST Tick
    {
      id: "east-tick",
      x: centerX + CROSS_SIZE + CENTER_GAP + CENTER_GAP,
      y: centerY - LINE_THICKNESS / 2,
      w: { small: TICK_SIZE, medium: TICK_SIZE, large: TICK_SIZE },
      h: { small: LINE_THICKNESS, medium: LINE_THICKNESS, large: LINE_THICKNESS },
      text: ""
    }
  ];
};
