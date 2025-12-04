import { basic } from './basic';
import { grid } from './grid';
import {cross} from './cross';
import { centerCross } from './centerCross';
import { crossHair } from './crossHair';
import { GuideSize } from '@renderer/App';

export const layouts = {
  basic,
  grid,
  cross,
  centerCross,
  crossHair,
} as const;

export type LayoutFunction = (screenWidth: number, screenHeight: number, guideSize: GuideSize) => Postit[];