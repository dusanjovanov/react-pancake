import React from "react";
import { useChartContext } from "./Chart";
import styles from "./styles/Box.module.css";

type BoxProps = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  children: React.ReactNode;
};

export const Box = ({ x1, y1, x2, y2, children }: BoxProps) => {
  const { xScale, yScale } = useChartContext();

  const _x1 = xScale(x1);
  const _x2 = xScale(x2);
  const _y1 = yScale(y1);
  const _y2 = yScale(y2);

  const left = Math.min(_x1, _x2);
  const right = Math.max(_x1, _x2);
  const top = Math.min(_y1, _y2);
  const bottom = Math.max(_y1, _y2);

  const width = right - left;
  const height = bottom - top;

  const style = {
    left: `${left}%`,
    bottom: `${100 - bottom}%`,
    width: `${width}%`,
    height: `${height}%`,
  };

  return (
    <div className={styles.root} style={style}>
      {children}
    </div>
  );
};
