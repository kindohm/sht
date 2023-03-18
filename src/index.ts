import { findTrips } from "./findTrips";
import { getAllSegments } from "./getAllSegments";
import { points as allPoints, Point } from "./points";

const args = { minDailyDistance: 3, maxDailyDistance: 10, numberOfDays: 4 };

const segments = getAllSegments({
  points: allPoints,
  minDailyDistance: args.minDailyDistance,
  maxDailyDistance: args.maxDailyDistance,
});

console.log("finding trips:", args);

const trips = findTrips({ segments, numberOfDays: args.numberOfDays });

console.log(trips.length, "trips");

trips.forEach((trip) => {
  console.log(trip.description, trip.totalDistance.toFixed(1));

  trip.segments.forEach((seg, i) => {
    console.log("\tday", i + 1, seg.name, seg.distance.toFixed(1));
  });
});
