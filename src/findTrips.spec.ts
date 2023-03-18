import { findTrips } from "./findTrips";
import { Point } from "./points";
import { Segment } from "./getAllSegments";

const points: Point[] = [
  { name: "asdf", mile: 1, type: "campsite", id: "point0" },
];

const mockSegment: Segment = {
  points: [],
  startsAtTrailhead: false,
  endsAtTrailhead: false,
  name: "",
  reverseName: "",
  distance: 1,
  startPointId: "",
  endPointId: "",
};

describe("findTrips", () => {
  it("should return empty array when there are no segments", () => {
    const numberOfDays = 10;
    const segments: Segment[] = [];

    const trips = findTrips({
      segments,
      numberOfDays,
    });

    expect(trips.length).toEqual(0);
  });

  it("should return empty when there is one segment that does not start or end at trailhead", () => {
    const segments: Segment[] = [
      { ...mockSegment, startsAtTrailhead: false, endsAtTrailhead: false },
    ];

    const numberOfDays = 10;

    const trips = findTrips({
      segments,
      numberOfDays,
    });

    expect(trips.length).toEqual(0);
  });

  it("should return empty when there is one segment and it does not start at trailhead", () => {
    const segments: Segment[] = [
      { ...mockSegment, startsAtTrailhead: false, endsAtTrailhead: true },
    ];

    const numberOfDays = 10;

    const trips = findTrips({
      segments,
      numberOfDays,
    });

    expect(trips.length).toEqual(0);
  });

  it("should return empty when there is one segment and it does not end at trailhead", () => {
    const segments: Segment[] = [
      { ...mockSegment, startsAtTrailhead: true, endsAtTrailhead: false },
    ];

    const numberOfDays = 10;

    const trips = findTrips({
      segments,
      numberOfDays,
    });

    expect(trips.length).toEqual(0);
  });

  it("should return one trip when there is one segment that starts and ends at trailheads", () => {
    const segments: Segment[] = [
      { ...mockSegment, startsAtTrailhead: true, endsAtTrailhead: true },
    ];

    const numberOfDays = 10;

    const trips = findTrips({
      segments,
      numberOfDays,
    });

    expect(trips.length).toEqual(1);
  });
});
