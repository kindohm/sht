import { findTrips } from "./findTrips";
import { Point } from "./points";

describe("findTrips", () => {
  it("should return empty array when max distance is zero", () => {
    const points: Point[] = [
      { name: "asdf", mile: 1, type: "campsite", id: "point0" },
    ];
    const maxDailyDistance = 0;
    const trips = findTrips({ points, maxDailyDistance, numberOfDays: 1 });
    expect(trips.length).toEqual(0);
  });

  it("should start and end at trailhead", () => {
    const points: Point[] = [
      { name: "1", mile: 1, type: "campsite", id: "point0", nextId: 1 },
      {
        name: "2",
        mile: 2,
        type: "trailhead",
        id: "point1",
        nextId: 2,
        previousId: 0,
        distanceToParking: 1,
      },
      {
        name: "3",
        mile: 3,
        type: "campsite",
        id: "point2",
        nextId: 3,
        previousId: 1,
      },
      {
        name: "4",
        mile: 4,
        type: "trailhead",
        id: "point3",
        nextId: 4,
        previousId: 2,
        distanceToParking: 1,
      },
      { name: "5", mile: 5, type: "campsite", id: "point4", previousId: 3 },
    ];

    const trips = findTrips({ points, maxDailyDistance: 100, numberOfDays: 1 });
    expect(trips.length).toEqual(1);
  });
});
