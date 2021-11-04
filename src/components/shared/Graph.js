import clsx from "clsx";
import React, { useMemo, useState } from "react";
import {
  Area,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ComposedChart,
  Bar,
} from "recharts";

import styles from "./Graph.module.css";

const getDivisions = (days) => {
  switch (days) {
    case "1":
      return 24;
    case "3":
      return 36;
    case "7":
      return 7;
    case "30":
      return 30;
    case "180":
      return 6;
    case "365":
      return 12;
    default:
      return 12;
  }
};

function Graph({ data, days, width }) {
  const [tooltipPayload, setTooltipPayload] = useState(null);

  // calculating points for CartesianGrid
  const memoizedGridPoints = useMemo(() => {
    const divisions = getDivisions(days);
    const multiplier = 100 / divisions;
    let gridPoints = [];
    for (let i = 0; i <= divisions; i++) {
      gridPoints.push(i * multiplier);
    }
    gridPoints = gridPoints.map((v) => `${v.toFixed(2)}%`);

    return gridPoints;
  }, [days]);

  // adding data for bar chart
  const memoizedData = useMemo(() => {
    const prices = data.map((item) => item.price);
    const minPrice = Math.min(...prices);

    const dataWithBar = data.map((item) => ({
      ...item,
      barPrice: (item.price - minPrice) * 1.2,
    }));

    return dataWithBar;
  }, [data]);

  return (
    <ComposedChart width={width} height={400} data={memoizedData}>
      <defs>
        <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.3}></stop>
          <stop
            offset="75%"
            stopColor="var(--primary)"
            stopOpacity={0.03}
          ></stop>
        </linearGradient>
      </defs>
      <Area
        dataKey="price"
        stroke="var(--primary)"
        strokeWidth={2}
        fill="url(#color)"
      />
      <YAxis
        hide
        dataKey="price"
        type="number"
        domain={["dataMin - 1000", "dataMax + 1000"]}
      />
      <CartesianGrid
        horizontal={false}
        verticalPoints={memoizedGridPoints}
        opacity={0.3}
      />
      {tooltipPayload && (
        <ReferenceLine
          position="end"
          strokeDasharray={5}
          y={tooltipPayload.value}
          label={(p) => {
            const { viewBox } = p;

            return (
              <foreignObject
                className={styles.tooltipContainer}
                y={viewBox.y - 10}
                width={width + 70}
                height={100}
              >
                <span className={styles.tooltip}>
                  {tooltipPayload?.value.toFixed(2)}
                </span>
              </foreignObject>
            );
          }}
        />
      )}
      <ReferenceLine
        strokeWidth={0}
        y={data?.slice(-1)[0]?.price}
        label={(props) => {
          const { viewBox } = props;

          return (
            <foreignObject
              className={styles.tooltipContainer}
              y={viewBox.y - 10}
              width={width + 70}
              height={100}
            >
              <span className={clsx(styles.tooltip, styles.primaryColor)}>
                {data.slice(-1)[0].price.toFixed(2)}
              </span>
            </foreignObject>
          );
        }}
      />
      <Tooltip
        cursor={{ strokeDasharray: 5, stroke: "var(--black2)" }}
        content={(props) => {
          const { active, payload } = props;
          if (active) {
            if (payload[0].value !== tooltipPayload?.value)
              setTooltipPayload(payload[0]);
          } else setTooltipPayload(null);
          return null;
        }}
      />
      <YAxis hide yAxisId="barYAxis" dataKey="price" type="number" />
      {days < 30 && (
        <Bar
          yAxisId="barYAxis"
          dataKey="barPrice"
          maxBarSize={2}
          fill="var(--grey)"
        />
      )}
    </ComposedChart>
  );
}

export default Graph;
