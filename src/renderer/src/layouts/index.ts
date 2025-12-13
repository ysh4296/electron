import { basic } from './basic';
import { grid } from './grid';
import { cross } from './cross';
import { crossHair } from './crossHair';
import { hexRing } from './hexRing';
import { perimeterFrame } from './perimeterFrame';
import { tripleHorizon } from './tripleHorizon';
import { columnFocus } from './columnFocus';
import { GuideSize } from '@renderer/App';

export const layouts = {
  basic,
  grid,
  cross,
  crossHair,
  hexRing,
  perimeterFrame,
  tripleHorizon,
  columnFocus
} as const;

export type LayoutFunction = (
  screenWidth: number,
  screenHeight: number,
  guideSize: GuideSize
) => Postit[];
