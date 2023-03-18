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

const getPartialTripsFromSegmentTree = (
  segment: SegmentTree
): SegmentTree[] => {
  if (
    !segment.possibleNextSegments ||
    segment.possibleNextSegments.length === 0
  ) {
    return [segment];
  }

  const r = segment.possibleNextSegments?.reduce(
    (partials: SegmentTree[], nextSegment: SegmentTree) => {
      const morePartials = getPartialTripsFromSegmentTree(nextSegment);
      const ret = partials.concat([segment, ...morePartials]);

      return ret;
    },
    []
  );

  return r;
};

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

  const segmentsStartingAtTrailheads = segments.filter(
    (s) => s.startsAtTrailhead
  );

  const segmentsWithChildren = segmentsStartingAtTrailheads.map((s) =>
    addChildSegments(s, segments, numberOfDays, 1)
  );

  const possibles = segmentsWithChildren.map((s) =>
    getPartialTripsFromSegmentTree(s)
  );

  const result = possibles.map((p) => ({ segments: p }));

  const tripsThatEndAtTrailhead = result.filter((trip) => {
    return trip.segments[trip.segments.length - 1].endsAtTrailhead;
  });

  return tripsThatEndAtTrailhead;
};
