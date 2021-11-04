import "./App.css";
import Dashboard from "./components/dashboard/dashboard";

import Context from "./context/dashboard";

function App() {
  return (
    <Context.Provider value={{ coinId: "bitcoin" }}>
      <div className="container">
        <Dashboard />
      </div>
    </Context.Provider>
  );
}

export default App;
