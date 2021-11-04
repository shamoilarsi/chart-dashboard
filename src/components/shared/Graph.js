import React, { useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Label,
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
  const divisions = getDivisions(days);
  const multiplier = 100 / divisions;

  const [tooltipPayload, setTooltipPayload] = useState(null);

  // TODO: make it simpler?
  let gridPoints = [];
  for (let i = 0; i <= divisions; i++) gridPoints.push(i * multiplier);

  gridPoints = gridPoints.map((v) => `${v.toFixed(2)}%`);
  return (
    <ResponsiveContainer width={width} height={400}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="var(--primary)"
              stopOpacity={0.3}
            ></stop>
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
          verticalPoints={gridPoints}
          opacity={0.3}
        />
        {tooltipPayload && <ReferenceLine y={tooltipPayload.value} />}
        {/* <XAxis
          dataKey={"time"}
          tickFormatter={(v) => new Date(v).toDateString()}
        /> */}
        <Tooltip
          cursor={{ strokeDasharray: 5, stroke: "var(--black2)" }}
          position={{ x: 1000 }}
          content={(props) => {
            const { active, payload } = props;
            // console.log(props);
            if (active) {
              if (payload[0].value !== tooltipPayload?.value)
                setTooltipPayload(payload[0]);
              const { value } = payload[0];
              return <span className={styles.tooltip}>{value.toFixed(2)}</span>;
            }
            setTooltipPayload(null);
            return null;
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default Graph;
