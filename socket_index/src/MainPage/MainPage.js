import React from "react";
import { Link } from "react-router-dom";
import Forum from "../HTMLforum";
export default () => (
  <div>
    <h1>
      <Forum />
      <Link to="/chat">
        <button>Test Link </button>
      </Link>
    </h1>
  </div>
);
