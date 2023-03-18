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

const getPartialTripsFromSegmentTree = (segment: SegmentTree): string[][] => {
  let inner: string[][] = [];

  if (
    !segment.possibleNextSegments ||
    segment.possibleNextSegments.length === 0
  ) {
    return [[segment.id]];
  }

  segment.possibleNextSegments?.forEach((nextSeg) => {
    const childs = getPartialTripsFromSegmentTree(nextSeg);
    childs.forEach((c) => {
      inner.push([segment.id, ...c]);
    });
  });

  return inner;
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

  let finalSegmentIds: string[][] = [];

  possibles.forEach((p) => {
    p.forEach((pp) => {
      finalSegmentIds.push(pp);
    });
  });

  const final = finalSegmentIds.map((trip) => {
    let segs: Segment[] = [];

    trip.forEach((segmentId) => {
      const found = segments.find((s) => s.id === segmentId);
      if (found) {
        segs.push(found);
      }
    });

    return { segments: segs };
  });

  return final.filter((trip) => {
    return trip.segments[trip.segments.length - 1].endsAtTrailhead;
  });
};
