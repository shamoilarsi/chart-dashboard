import "./App.css";
import Dashboard from "./components/dashboard/dashboard";

import { CoinProvider } from "./context/coin-context";

function App() {
  return (
    <CoinProvider>
      <div className="container">
        <Dashboard />
      </div>
    </CoinProvider>
  );
}

export default App;
