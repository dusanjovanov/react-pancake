import * as React from "react";
import { render } from "react-dom";
import { Chart, Grid } from "../dist/react-pancake.module";
import "../dist/react-pancake.css";
import tsv from "./carbon";

const App = () => {
  const data = tsv.split("\n").map((str) => {
    let [date, avg, trend] = str.split("\t").map(parseFloat);
    if (avg === -99.99) avg = null;

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
    <div style={{ fontFamily: "system-ui", padding: "0 2rem" }}>
      <h1>React pancake 🥞</h1>
      <div style={{ height: 500 }}>
        <Chart x1={minx} x2={maxx} y1={miny} y2={maxy}>
          <Grid count={5}>
            {({ value, isLast }) => (
              <div style={{ width: "100%", borderTop: "1px dashed #ccc" }}>
                {value} {isLast ? "ppm" : ""}
              </div>
            )}
          </Grid>
          <Grid count={5} orientation="vertical">
            {({ value }) => (
              <>
                <div
                  style={{ height: "100%", borderLeft: "1px dashed #ccc" }}
                />
                <span>{value}</span>
              </>
            )}
          </Grid>
        </Chart>
      </div>
    </div>
  );
};

render(<App />, document.getElementById("root"));
