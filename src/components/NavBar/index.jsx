import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navBar">
      <Link to="/" className="link">
        Dashboard
      </Link>
      <Link to="/blogs" className="link">
        Blogs
      </Link>
    </nav>
  );
}
