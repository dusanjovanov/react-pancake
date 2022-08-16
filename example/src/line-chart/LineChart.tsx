import React from "react";
import {
  Chart,
  Grid,
  Point,
  Quadtree,
  Svg,
  SvgLine,
  SvgScatterplot,
} from "../../../dist/react-pancake.module";
import { data as tsv } from "./data";

export const LineChart = () => {
  const data = tsv.split("\n").map((str) => {
    let [date, avg, trend] = str.split("\t").map(parseFloat);
    if (avg === -99.99) avg = 0;

    return { date, avg, trend };
  });

  const points = data.filter((d) => d.avg);

  let minx = points[0].date;
  let maxx = points[points.length - 1].date;
  let miny = +Infinity;
  let maxy = -Infinity;
  let highest;

  for (let i = 0; i < points.length; i += 1) {
    const point = points[i];

    if (point.avg < miny) {
      miny = point.avg;
    }

    if (point.avg > maxy) {
      maxy = point.avg;
      highest = point;
    }
  }

  const months = "Jan Feb Mar Apr May June July Aug Sept Oct Nov Dec".split(
    " "
  );

  const format = (date) => {
    const year = ~~date;
    const month = Math.floor((date % 1) * 12);

    return `${months[month]} ${year}`;
  };

  const pc = (date) => {
    return (100 * (date - minx)) / (maxx - minx);
  };

  return (
    <div style={{ height: 600, marginBottom: "2rem" }}>
      <Chart x1={minx} x2={maxx} y1={miny} y2={maxy}>
        <Grid count={5}>
          {({ value, isLast }) => (
            <div style={{ width: "100%", borderTop: "1px dashed #ccc" }}>
              <span
                style={{
                  bottom: 2,
                  position: "absolute",
                  fontSize: 14,
                  color: "#999",
                }}
              >
                {value} {isLast ? "ppm" : ""}
              </span>
            </div>
          )}
        </Grid>
        <Grid count={5} orientation="vertical">
          {({ value }) => (
            <>
              <div style={{ height: "100%", borderLeft: "1px dashed #ccc" }} />
              <span
                style={{
                  fontSize: 14,
                  color: "#999",
                  width: "4em",
                  left: "-2em",
                  position: "absolute",
                  textAlign: "center",
                }}
              >
                {value}
              </span>
            </>
          )}
        </Grid>
        <Svg>
          <SvgScatterplot data={points} x={(d) => d.date} y={(d) => d.avg}>
            {(d) => (
              <path
                d={d}
                style={{
                  stroke: "#999",
                  strokeWidth: 3,
                  strokeLinejoin: "round",
                  strokeLinecap: "round",
                }}
              />
            )}
          </SvgScatterplot>
          <SvgLine data={points} x={(d) => d.date} y={(d) => d.avg}>
            {(d) => (
              <path
                d={d}
                style={{ fill: "none", stroke: "#999", strokeWidth: 1 }}
              />
            )}
          </SvgLine>
          <SvgLine data={points} x={(d) => d.date} y={(d) => d.trend}>
            {(d) => (
              <path
                d={d}
                style={{ fill: "none", stroke: "#ff3e00", strokeWidth: 2 }}
              />
            )}
          </SvgLine>
        </Svg>
        <Point x={1962} y={390}>
          <div
            style={{
              position: "absolute",
              width: "15em",
              color: "#666",
              transform: "translate(0, -50%)",
            }}
          >
            <h2 style={{ margin: 0 }}>Atmospheric CO₂</h2>
            <p>
              <span style={{ color: "#676778" }}>•</span>
              <span>monthly average&nbsp;&nbsp;&nbsp;</span>
              <span style={{ color: "#ff3e00" }}>—</span>
              <span>trend</span>
            </p>
          </div>
        </Point>
        <Point x={2010} y={330}>
          <div
            style={{
              position: "absolute",
              textAlign: "right",
              width: "15em",
              color: "#666",
              transform: "translate(-50%, -50%)",
            }}
          >
            <p style={{ margin: 0 }}>
              <em>
                This chart will render correctly even if JavaScript is disabled.
              </em>
            </p>
          </div>
        </Point>
        <Point x={highest.date} y={highest.avg}>
          <div
            style={{
              position: "absolute",
              right: "0.5em",
              top: "-0.5em",
              whiteSpace: "nowrap",
              lineHeight: 1,
              color: "#666",
            }}
          >
            {highest.avg} parts per million (ppm) &rarr;
          </div>
        </Point>
        <Quadtree data={points} x={(d) => d.date} y={(d) => d.avg}>
          {(closest) =>
            closest !== null && (
              <Point x={closest.date} y={closest.avg} let:d>
                <div
                  style={{
                    position: "absolute",
                    width: 10,
                    height: 10,
                    left: -5,
                    top: -5,
                    border: "1px solid black",
                    borderRadius: "50%",
                    boxSizing: "border-box",
                  }}
                />
                <div
                  style={{
                    transform: `translate(-${pc(closest.date)}%,0)`,
                    position: "absolute",
                    whiteSpace: "nowrap",
                    width: "8em",
                    bottom: "1em",
                  }}
                >
                  <strong style={{ fontSize: "1.4em", display: "block" }}>
                    {closest.avg} ppm
                  </strong>
                  <span>{format(closest.date)}</span>
                </div>
              </Point>
            )
          }
        </Quadtree>
      </Chart>
    </div>
  );
};
