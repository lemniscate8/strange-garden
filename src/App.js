import React from "react";

import PatternBar from "./PatternBar";
import { PatternContextProvider } from "./PatternContext";

function App() {
  return (
    <div className="App">
      <PatternContextProvider>
        <PatternBar></PatternBar>
      </PatternContextProvider>
    </div>
  );
}

export default App;
