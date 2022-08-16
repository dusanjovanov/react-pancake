import React from "react";
import { useChartContext } from "./Chart";
import { defaultX, defaultY } from "./utils/accessors";
import { Quadtree as QuadtreeClass } from "./utils/Quadtree";

type QuadtreeProps<D> = {
  data: D[];
  x: (d: D, index: number) => number;
  y: (d: D, index: number) => number;
  radius: number;
  children: (closest: any) => React.ReactNode;
};

export const Quadtree = <D,>({
  data,
  x = defaultX,
  y = defaultY,
  radius = Infinity,
  children,
}: QuadtreeProps<D>) => {
  const { pointer, xScale, yScale, width, height } = useChartContext();

  const quadtree = new QuadtreeClass(data);
  quadtree.update(x, y, xScale, yScale);

  // track reference changes, to trigger updates sparingly
  let prev_closest;
  let next_closest;

  next_closest =
    pointer !== null
      ? quadtree.find(
          pointer.left,
          pointer.top,
          width ?? 0,
          height ?? 0,
          radius
        )
      : null;

  let closest;

  if (next_closest !== prev_closest) {
    closest = prev_closest = next_closest;
  }

  return <>{typeof children === "function" ? children(closest) : null}</>;
};
