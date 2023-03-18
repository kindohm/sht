import { Segment } from "./getAllSegments";
import { Point } from "./points";

type Trip = {
  segments: Segment[];
};

export const findTrips = ({
  points,
  numberOfDays,
  maxDailyDistance,
}: {
  points: Point[];
  numberOfDays: number;
  maxDailyDistance: number;
}): Trip[] => {
  if (
    !points ||
    points.length === 0 ||
    maxDailyDistance <= 0 ||
    numberOfDays <= 0
  ) {
    return [];
  }
  return [];
};
