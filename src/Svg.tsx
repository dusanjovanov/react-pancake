import * as React from "react";
import styles from "./styles/Svg.module.css";

export const Svg = ({ children }: { children: React.ReactNode }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={styles.svg}
    >
      {children}
    </svg>
  );
};
