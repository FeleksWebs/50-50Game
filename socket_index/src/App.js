import React from "react";

import "./App.css";
import MainPage from "./MainPage/MainPage";
import Heads from "./JoinRoom/Heads";
import Tails from "./JoinRoom/Tails";

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  //Route exact : opens a new link. If no exact: opens component on page
  return (
    <div className="App">
      <Router>
        <div className="sans-serif">
          <Route path="/" exact component={MainPage} />
          <Route path="/Heads" component={Heads} />
          <Route path="/Tails" component={Tails} />
        </div>
      </Router>
    </div>
  );
}

export default App;
