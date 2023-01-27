import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="inner-content">
          <div className="brand">
            <Link to="/">JML</Link>
          </div>
          <div className="nav-links">
            <li>
              <Link to="/">Upcoming</Link>
            </li>
            <li>
              <Link to="/alltime">All Time</Link>
            </li>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
