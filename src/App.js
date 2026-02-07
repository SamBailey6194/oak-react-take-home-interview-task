import Unit from "./Unit.jsx";
import "./App.css";

function App() {
  const units = [1];
  return (
    <div>
      <Unit unitId={units[0]}></Unit>
    </div>
  );
}

export default App;
