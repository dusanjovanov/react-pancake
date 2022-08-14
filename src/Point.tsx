import React from "react";
import { useChartContext } from "./Chart";
import styles from "./styles/Point.module.css";

type PointProps = {
  x: number;
  y: number;
  children: React.ReactNode;
};

export const Point = ({ x, y, children }: PointProps) => {
  const { xScale, yScale } = useChartContext();

  return (
    <div
      className={styles.root}
      style={{ left: `${xScale(x)}%`, top: `${yScale(y)}%` }}
    >
      {children}
    </div>
  );
};
