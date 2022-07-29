import * as React from "react";
import { useChartContext } from "./Chart";

type SvgLineProps = { data: any[]; x: any; y: any };

export const SvgLine = ({ data, x, y }: SvgLineProps) => {
  const { xScale, yScale } = useChartContext();

  const d =
    "M" + data.map((d, i) => `${xScale(x(d, i))},${yScale(y(d, i))}`).join("L");

  return <path d={d} />;
};
