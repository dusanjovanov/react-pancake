import * as React from "react";
import { render } from "react-dom";
import "../../dist/react-pancake.css";
import { BarChart } from "./bar-chart/BarChart";
import { LineChart } from "./line-chart/LineChart";
import styles from "./index.module.css";
import "./index.css";

const App = () => {
  return (
    <div className={styles.root}>
      <h1 className={styles.heading}>react-pancake 🥞</h1>
      <h2 className={styles.subHeading}>React port of Svelte Pancake</h2>
      <LineChart />
      <BarChart />
    </div>
  );
};

render(<App />, document.getElementById("root"));
