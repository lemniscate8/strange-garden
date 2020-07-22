import React from "react";
import "./App.css";
import Panel from "./Panel";

function App() {
  return (
    <div className="App">
      <Panel width={128} height={128}></Panel>
      <Panel width={128} height={128}></Panel>
    </div>
  );
}

export default App;
