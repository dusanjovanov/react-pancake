import React from "react";
import { useChartContext } from "./Chart";
import { getTicks } from "./utils/ticks";
import clsx from "clsx";
import styles from "./styles/Grid.module.css";

type GridPropsChild = (args: {
  value: any;
  isFirst: boolean;
  isLast: boolean;
}) => React.ReactNode;

type GridProps = {
  ticks?: any[];
  count: number;
  orientation?: "vertical" | "horizontal";
  children: GridPropsChild;
};

export const Grid = ({
  ticks,
  count,
  orientation = "horizontal",
  children,
}: GridProps) => {
  const { x1, y1, x2, y2, xScale, yScale } = useChartContext();

  const _ticks = React.useMemo(() => {
    return (
      ticks ??
      (orientation === "horizontal"
        ? getTicks(y1, y2, count)
        : getTicks(x1, x2, count))
    );
  }, [x1, x2, y1, y2, ticks, count, orientation]);

  const style =
    orientation === "horizontal"
      ? (n: any, i: number) => ({
          width: "100%",
          height: 0,
          top: `${yScale(n, i)}%`,
        })
      : (n: any, i: number) => ({
          width: 0,
          height: "100%",
          left: `${xScale(n, i)}%`,
        });

  return (
    <div className="react-pancake-grid">
      {_ticks.map((tick, index) => {
        return (
          <div
            key={index}
            className={clsx("react-pancake-grid-item", styles.gridItem)}
            style={style(tick, index)}
          >
            {typeof children === "function"
              ? children({
                  value: tick,
                  isFirst: index === 0,
                  isLast: index === _ticks.length - 1,
                })
              : null}
          </div>
        );
      })}
    </div>
  );
};
