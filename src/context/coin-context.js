import { createContext, useContext } from "react";

const CoinContext = createContext(null);

const CoinProvider = ({ children }) => {
  return (
    <CoinContext.Provider value={{ coinId: "bitcoin" }}>
      {children}
    </CoinContext.Provider>
  );
};

const useCoin = () => {
  if (CoinContext === null) {
    throw new Error("useCoin should be used inside CoinProvider");
  }

  return useContext(CoinContext);
};

export { CoinProvider, useCoin };
