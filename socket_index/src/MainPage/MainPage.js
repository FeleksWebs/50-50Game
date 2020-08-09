import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MainPage.css";

export default () => (
  <div className="PageBody">
    {/* <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle"
            data-toggle="collapse"
            data-target="#myNavbar"
          >
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">
            Logo
          </a>
        </div>
        <div className="collapse navbar-collapse" id="myNavbar">
          <ul className="nav navbar-nav">
            <li className="active">
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Projects</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="#">
                <span className="glyphicon glyphicon-log-in"></span> Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav> */}

    <div class="jumbotron LoginJumbo">
      {" "}
      <h4>
        <b>Currently playing as: </b>Guest
      </h4>
      <h4 className="Login-Info">
        <b>
          <a href="#">Login</a> or <a href="#">SignIn</a>
        </b>
      </h4>
    </div>

    <div class="row justify-content-end">
      <div class="col">
        {" "}
        <div className=" container " style={{ text_align: "center" }}>
          <Link to="/Heads?room=123">
            <button className="coin-css" style={{ color: "black" }}>
              <b>Heads</b>
            </button>
          </Link>
        </div>
        <div className="container" style={{ text_align: "center" }}>
          <Link to="/Tails">
            <button className="coin-css" style={{ color: "black" }}>
              {" "}
              <b>Tails</b>
            </button>
          </Link>
        </div>
      </div>
    </div>

    <div class="jumbotron">
      <b>Online players: 0</b>
    </div>
  </div>
);
