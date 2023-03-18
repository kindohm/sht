import { Point } from "./points";

export type Segment = {
  points: Point[];
};

export const getAllSegments = ({
  points,
  minDailyDistance,
  maxDailyDistance,
}: {
  points: Point[];
  minDailyDistance?: number;
  maxDailyDistance: number;
}): Segment[] => {
  const segments: Segment[] = [];
  const minDaily = minDailyDistance ?? 1;

  return points.reduce((segments: Segment[], point: Point) => {
    const { mile, id } = point;

    const maxMile = mile + maxDailyDistance;
    const minMile = mile + minDaily;
    const pointsWithinDistance = points.filter(
      (p) => p.id !== id && p.mile <= maxMile && p.mile >= minMile
    );

    const currentPointSegments = pointsWithinDistance.map(
      (p: Point): Segment => {
        const pointsBetween = pointsWithinDistance.filter(
          (b) => b.mile > point.mile && b.mile < p.mile
        );
        return { points: [point, ...pointsBetween, p] };
      }
    );

    return segments.concat(currentPointSegments);
  }, segments);
};
