import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav>
       <Link to="/"> {/* if click logo then come to dashboard */}
        <div>
          <img
            src="https://www.github.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub Logo"
          />
          <h3>GitHub</h3>
        </div>
      </Link>
      <div>
       <Link to="/create">  {/* // Routes.jsx mai ek aur path and element (component) bana dege */}
          <p>Create a Repository</p>
        </Link>
        <Link to="/profile">
           <p>Profile</p> {/* do style on your own */}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;