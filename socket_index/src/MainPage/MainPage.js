import React from "react";
import { Link } from "react-router-dom";
import "./MainPage.css";

export default () => (
  <div>
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <h3 className="text-center Titlenav">
          <b>50 / 50 rng Game</b>
        </h3>
      </div>
    </nav>
    <div className="col-sm-2 sidenav side">
      <h4>
        <b>Currently playing as: </b>Guest
      </h4>
      <h4 className="Login-Info">
        <b>
          <a href="#">Login</a> or <a href="#">SignIn</a>
        </b>
      </h4>
    </div>

    <div className="col-sm-8 center-info">
      <h2 className="Title-Mid">
        <b>Choose your side</b>
      </h2>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 test " style={{ text_align: "center" }}>
            <Link to="/Heads">
              <button className="coin-css" style={{ color: "black" }}>
                <b>Heads</b>
              </button>
            </Link>
          </div>
          <div className="col-md-6 test" style={{ text_align: "center" }}>
            <Link to="/Tails">
              <button className="coin-css" style={{ color: "black" }}>
                {" "}
                <b>Tails</b>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>

    <div className="col-sm-2 sidenav side">
      <h4>
        <b>Online players: 0</b>
      </h4>
    </div>
  </div>
);
