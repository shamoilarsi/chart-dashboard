import "./App.css";
import Dashboard from "./components/dashboard/dashboard";

function App() {
  return (
    <div className="container">
      <Dashboard coinId="bitcoin" />
    </div>
  );
}

export default App;
