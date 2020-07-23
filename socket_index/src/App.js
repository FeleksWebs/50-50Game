import React from "react";

import "./App.css";
import MainPage from "./MainPage/MainPage";
import playRoom from "./JoinRoom/newRoom";

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  //Route exact : opens a new link. If no exact: opens component on page
  return (
    <div className="App">
      <Router>
        <div className="sans-serif">
          <Route path="/" exact component={MainPage} />
          <Route path="/chat" component={playRoom} />
        </div>
      </Router>
    </div>
  );
}

export default App;
