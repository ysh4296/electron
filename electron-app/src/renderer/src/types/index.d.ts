
type Postit = {
  id: string;
  x: number;
  y: number;
  w: Record<GuideSize, number>;
  h: Record<GuideSize, number>;
  text: string;
};
