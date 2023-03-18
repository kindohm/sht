import { Segment } from "./getAllSegments";

type Trip = {
  segments: Segment[];
};

type SegmentTree = Segment & {
  possibleNextSegments?: SegmentTree[];
};

const addChildSegments = (
  segment: Segment,
  allSegments: Segment[],
  numberOfDays: number,
  currentDepth: number
): SegmentTree => {
  if (currentDepth > numberOfDays) {
    return { ...segment, possibleNextSegments: [] };
  }

  const following = allSegments.filter(
    (s) => s.startPointId === segment.endPointId
  );
  const followingWithChildren = following.map((f) =>
    addChildSegments(f, allSegments, numberOfDays, currentDepth + 1)
  );
  return { ...segment, possibleNextSegments: followingWithChildren };
};

const getTripsFromTrees = (segments: SegmentTree[]): Trip[] => {};

export const findTrips = ({
  segments,
  numberOfDays,
}: {
  segments: Segment[];
  numberOfDays: number;
}): Trip[] => {
  if (!segments || segments.length === 0 || numberOfDays <= 0) {
    return [];
  }

  const additionalDays: number[] = new Array(numberOfDays - 1)
    .fill(null)
    .map((x, i) => i);

  const segmentsStartingAtTrailheads = segments.filter(
    (s) => s.startsAtTrailhead
  );

  const segmentsWithChildren = segmentsStartingAtTrailheads.map((s) =>
    addChildSegments(s, segments, numberOfDays, 1)
  );

  return getTripsFromTrees(segmentsWithChildren);

  // const tripsThatEndAtTrailhead = possibleTrips.filter((trip) => {
  //   return trip.segments[trip.segments.length - 1].endsAtTrailhead;
  // });

  // return tripsThatEndAtTrailhead;
};
