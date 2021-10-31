import React, { useEffect } from "react";

import clsx from "clsx";

import styles from "./styles/dashboard.module.css";
import { getCoinData } from "../../api/coingecko";
import Tabs from "./tabs";

const data = {
  ath: 67277,
  ath_change_percentage: -7.92091,
  ath_date: "2021-10-20T14:54:17.702Z",
  atl: 67.81,
  atl_change_percentage: 91256.39413,
  atl_date: "2013-07-06T00:00:00.000Z",
  circulating_supply: 18859175,
  current_price: 61948,
  fully_diluted_valuation: 1298580805761,
  high_24h: 62563,
  id: "bitcoin",
  image:
    "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
  last_updated: "2021-10-30T20:39:08.759Z",
  low_24h: 61068,
  market_cap: 1166198222261,
  market_cap_change_24h: -5481033088.967041,
  market_cap_change_percentage_24h: -0.46779,
  market_cap_rank: 1,
  max_supply: 21000000,
  name: "Bitcoin",
  price_change_24h: -577.961534301343,
  price_change_percentage_24h: -0.92436,
  price_change_percentage_24h_in_currency: -0.924356601980618,
  roi: null,
  symbol: "btc",
  total_supply: 21000000,
  total_volume: 31060423038,
};
function Dashboard({ coinId }) {
  //   useEffect(() => {
  //     (async () => {
  //       try {
  //         const coinData = await getCoinData(coinId);
  //         console.log(coinData);
  //       } catch (e) {
  //         console.error(e);
  //       }
  //     })();
  //   }, [coinId]);
  const changePositive = Number(data.price_change_24h) >= 0;

  return (
    <div>
      <div className={styles.dashboardPriceContainer}>
        <span className={styles.price}>
          {Number(data.current_price.toFixed(2)).toLocaleString()}
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
          {data.price_change_24h.toFixed(2)} (
          {data.price_change_percentage_24h.toFixed(2)}%)
        </span>
      </div>
      <Tabs />
    </div>
  );
}

export default Dashboard;
