import React from "react";
import { useChartContext } from "./Chart";
import { defaultX, defaultY } from "./utils/accessors";

type SvgScaterplotProps<D> = {
  data: D[];
  x: (d: D, index: number) => number;
  y: (d: D, index: number) => number;
  children: (d: string) => React.ReactNode;
};

export const SvgScatterplot = <D,>({
  data,
  x = defaultX,
  y = defaultY,
  children,
}: SvgScaterplotProps<D>) => {
  const { xScale, yScale } = useChartContext();

  const d = data
    .map((d, i) => {
      const _x = xScale(x(d, i));
      const _y = yScale(y(d, i));

      return `M${_x} ${_y} A0 0 0 0 1 ${_x + 0.0001} ${_y + 0.0001}`;
    })
    .join(" ");

  return <>{typeof children === "function" ? children(d) : null}</>;
};
