import * as React from "react";
import useResizeObserver from "use-resize-observer";
import * as yootils from "yootils";
import clsx from "clsx";
import styles from "./styles/Chart.module.css";

type Pointer = {
  x: number;
  y: number;
  left: number;
  top: number;
};

type Scale = {
  (num: number, num2?: number): number;
  inverse(): any;
};

type ChartContextValue = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  xScale: Scale;
  yScale: Scale;
  xScaleInverse: number;
  yScaleInverse: number;
  pointer: Pointer | null;
  width: number | undefined;
  height: number | undefined;
};

const ChartContext = React.createContext({} as ChartContextValue);

export const useChartContext = () => {
  return React.useContext(ChartContext);
};

type ChartProps = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  children: React.ReactNode;
};

export const Chart = (props: ChartProps) => {
  const refChart = React.useRef<HTMLDivElement | null>(null);
  const { ref: refResize, width, height } = useResizeObserver();
  const [state, setState] = React.useState<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    pointer: Pointer | null;
  }>({
    x1: props.x1 ?? 0,
    y1: props.y1 ?? 0,
    x2: props.x2 ?? 1,
    y2: props.y2 ?? 1,
    pointer: null,
  });

  const { x1, x2, y1, y2, pointer } = state;

  const xScale = React.useMemo(() => {
    return yootils.linearScale([x1, x2], [0, 100]);
  }, [x1, x2]);

  const yScale = React.useMemo(() => {
    return yootils.linearScale([y1, y2], [100, 0]);
  }, [y1, y2]);

  const xScaleInverse = React.useMemo(() => {
    return xScale.inverse();
  }, [xScale]);

  const yScaleInverse = React.useMemo(() => {
    return yScale.inverse();
  }, [yScale]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (refChart.current === null) return;
    const bcr = refChart.current.getBoundingClientRect();
    const left = e.clientX - bcr.left;
    const top = e.clientY - bcr.top;

    const x = xScaleInverse((100 * left) / (bcr.right - bcr.left));
    const y = yScaleInverse((100 * top) / (bcr.bottom - bcr.top));

    setState({
      ...state,
      pointer: { x, y, left, top },
    });
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setState({
      ...state,
      pointer: null,
    });
  };

  return (
    <ChartContext.Provider
      value={{
        x1,
        x2,
        y1,
        y2,
        xScale,
        yScale,
        xScaleInverse,
        yScaleInverse,
        pointer,
        width,
        height,
      }}
    >
      <div
        className={clsx("react-pancake-chart", styles.chart)}
        ref={(el) => {
          refChart.current = el;
          refResize(el);
        }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {props.children}
      </div>
    </ChartContext.Provider>
  );
};
