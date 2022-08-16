import React from "react";
import { Chart, Grid, Columns } from "../../../dist/react-pancake.module";
import { data } from "./data";
import styles from "./BarChart.module.css";
import clsx from "clsx";

function range(a, b, step) {
  const array = [] as number[];
  for (let i = a; i <= b; i += step) array.push(i);
  return array;
}

function format(num) {
  return num ? `${num / 1e6}M` : "";
}

export const BarChart = () => {
  const maxAge = Math.max(...data.map((d) => d.age));
  const firstYear = Math.min(...data.map((d) => d.year));
  const finalYear = Math.max(...data.map((d) => d.year));
  const maxPeople = Math.max(...data.map((d) => d.people));

  const birth_years = range(finalYear - maxAge, finalYear, 5);
  const ages = range(0, maxAge, 5);

  let year = finalYear;
  let el;
  let w = 320;

  function get_populations(year, sex) {
    return birth_years.map((birth_year) => {
      const d = selection.find(
        (d) => d.sex === sex && d.age === year - birth_year
      );
      return {
        x: birth_year,
        y: d ? d.people : 0,
      };
    });
  }

  const x2 = year;
  const x1 = year - maxAge;
  const selection = data.filter((d) => d.year === year);
  const m = get_populations(year, 1);
  const f = get_populations(year, 2);
  const size = w < 480 ? "small" : w < 640 ? "medium" : "large";

  return (
    <div>
      <h2>Population pyramid</h2>
      <div className={styles.chartContainer}>
        <Chart x1={x1 - 2.5} x2={x2 + 2.5} y1={0} y2={maxPeople}>
          <Columns data={m} width={5}>
            {() => <div className={clsx(styles.column, styles.m)} />}
          </Columns>
          <Columns data={f} width={5}>
            {() => <div className={clsx(styles.column, styles.f)} />}
          </Columns>
          <Grid orientation="vertical" ticks={birth_years}>
            {({ value }) => (
              <span className={clsx(styles.background, styles.label, styles.x)}>
                {size === "large" ? value : `'${String(value).slice(2)}`}
              </span>
            )}
          </Grid>
          <Grid orientation="horizontal" count={5}>
            {({ value }) => (
              <>
                <div className={clsx(styles.gridLine, styles.horizontal)}></div>
                <span className={clsx(styles.label, styles.y)}>
                  {format(value)}
                </span>
              </>
            )}
          </Grid>
          <Grid orientation="vertical" count={size === "large" ? 20 : 10}>
            {({ value }) => (
              <span className={clsx(styles.label, styles.x, styles.foreground)}>
                {value}
                {value === 0 && (
                  <span style={{ position: "absolute", left: "2.5em" }}>
                    yrs old
                  </span>
                )}
              </span>
            )}
          </Grid>
        </Chart>
        <div className={styles.sliderContainer}>
          <button disabled={year === firstYear} onClick={() => (year -= 10)}>
            &larr;
          </button>
          <span onPointerDown={() => {}}>{year}</span>
          <button disabled={year === finalYear} onClick={() => (year += 10)}>
            &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
