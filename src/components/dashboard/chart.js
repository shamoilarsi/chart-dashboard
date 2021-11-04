import React, { useContext, useEffect, useState } from "react";
import { MdOpenInFull, MdOutlineAddCircleOutline } from "react-icons/md";
import clsx from "clsx";

import styles from "./styles/chart.module.css";
import IconButton from "../shared/IconButton";
import { getCoinChartData } from "../../api/coingecko";
import Graph from "../shared/Graph";
import DashboardContext from "../../context/dashboard";

const useChartRanges = () => {
  return [
    { label: "1d", days: "1" },
    { label: "3d", days: "3" },
    { label: "1w", days: "7" },
    { label: "1m", days: "30" },
    { label: "6m", days: "180" },
    { label: "1y", days: "365" },
    { label: "max", days: "max" },
  ];
};

const RangeItem = ({ label, active, onClick }) => {
  return (
    <span
      onClick={onClick}
      className={clsx({ [styles.range]: true, [styles.rangeActive]: active })}
    >
      {label}
    </span>
  );
};

function Chart() {
  const WIDTH = 1000;

  const { coinId } = useContext(DashboardContext);

  const chartRanges = useChartRanges();
  const [activeDays, setActiveDays] = useState(chartRanges[0].days);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = (await getCoinChartData(coinId, activeDays)).prices;
        setData(data.map((i) => ({ time: i[0], price: i[1] })));
      } catch (e) {
        console.error(e);
      }
    })();
  }, [activeDays, coinId]);

  return (
    <>
      <div className={styles.chartContainer} style={{ width: WIDTH }}>
        <div className={styles.chartOptions}>
          <IconButton Icon={MdOpenInFull} label="Fullscreen" />
          <div className="horizontal-spacer" />
          <IconButton Icon={MdOutlineAddCircleOutline} label="Compare" />
        </div>

        <div>
          {chartRanges.map((range) => {
            const { days, label } = range;
            return (
              <RangeItem
                key={days}
                label={label}
                onClick={() => setActiveDays(days)}
                active={activeDays === days}
              />
            );
          })}
        </div>
      </div>
      <Graph data={data} days={activeDays} width={WIDTH} />
    </>
  );
}

export default Chart;
