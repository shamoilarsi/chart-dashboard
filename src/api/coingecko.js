const baseUrl = `https://api.coingecko.com/api/v3/coins/`;

/**
 * function to get data for plotting charts
 * @param {string} coin id of coin you want chart data for
 * @param {string} days number of days you want the data of
 * @param {string} currency The target currency of market data
 */
export const getCoinChartData = (coin, days, currency = "usd") => {
  return fetch(
    `${baseUrl}/${coin}/market_chart?vs_currency=${currency}&days=${days}`,
    {
      headers: { accept: "application/json" },
      method: "GET",
    }
  ).then((res) => res.json());
};

export const getCoinData = (coin, currency = "usd") => {
  return fetch(
    `${baseUrl}markets?vs_currency=${currency}&ids=${coin}&price_change_percentage=24h`,
    {
      headers: { accept: "application/json" },
      method: "GET",
    }
  ).then(async (res) => (await res.json())[0]);
};
