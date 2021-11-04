import React, { useContext, useEffect, useState } from "react";

import clsx from "clsx";

import styles from "./styles/dashboard.module.css";
import { getCoinData } from "../../api/coingecko";
import Tabs from "./tabs";

import DashboardContext from "../../context/dashboard";

function Dashboard() {
  const { coinId } = useContext(DashboardContext);

  const [coin, setCoin] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const coinData = await getCoinData(coinId);
        setCoin(coinData);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [coinId]);

  const changePositive = Number(coin?.price_change_24h) >= 0;
  return (
    <div>
      <div className={styles.dashboardPriceContainer}>
        <span className={styles.price}>
          {Number(coin?.current_price.toFixed(2)).toLocaleString()}
        </span>
        <span className={styles.priceCurrency}>USD</span>
      </div>
      <div>
        <span
          className={clsx(
            styles.priceChange,
            changePositive ? styles.colorGreen : styles.colorRed
          )}
        >
          {coin?.price_change_24h.toFixed(2)} (
          {coin?.price_change_percentage_24h.toFixed(2)}%)
        </span>
      </div>
      <div className="vertical-spacer" />
      <Tabs />
    </div>
  );
}

export default Dashboard;
