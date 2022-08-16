import React from "react";
import { Box } from "./Box";
import { defaultX, defaultY } from "./utils/accessors";

type ColumnsProps<D> = {
  data: D[];
  width: number;
  x: (d: D, index: number) => any;
  y: (d: D, index: number) => any;
  children: (args: {
    value: D;
    isFirst: boolean;
    isLast: boolean;
  }) => React.ReactNode;
};

export const Columns = <D,>({
  data,
  width = 1,
  x = defaultX,
  y = defaultY,
  children,
}: ColumnsProps<D>) => {
  return (
    <>
      {data.map((d, i) => {
        return (
          <Box
            key={i}
            x1={x(d, i) - width / 2}
            x2={x(d, i) + width / 2}
            y1={0}
            y2={y(d, i)}
          >
            {typeof children === "function"
              ? children({
                  value: d,
                  isFirst: i === 0,
                  isLast: i === data.length - 1,
                })
              : null}
          </Box>
        );
      })}
    </>
  );
};
