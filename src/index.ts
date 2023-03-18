import { points as allPoints, Point } from "./points";

const sortPoints = (points: Point[]) => {
  return points.sort((a, b) => {
    return a.mile > b.mile ? -1 : 1;
  });
};

const findRoutes = (points: Point[], maxDistancePerDay: number) => {
  return null;
};

const sortedPoints = sortPoints(allPoints);
console.log("points", sortedPoints.length);

const found = findRoutes(sortedPoints, 3);
console.log("found", found);
