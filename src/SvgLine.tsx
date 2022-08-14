import * as React from "react";
import { useChartContext } from "./Chart";

type SvgLineProps<D> = {
  data: D[];
  x: (d: D, index: number) => number;
  y: (d: D, index: number) => number;
  children: (d: string) => React.ReactNode;
};

export const SvgLine = <D,>({ data, x, y, children }: SvgLineProps<D>) => {
  const { xScale, yScale } = useChartContext();

  const d =
    "M" + data.map((d, i) => `${xScale(x(d, i))},${yScale(y(d, i))}`).join("L");

  return <>{typeof children === "function" ? children(d) : null}</>;
};
