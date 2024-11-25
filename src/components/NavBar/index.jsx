import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { doSignOut } from "../../firebase/auth";

export default function NavBar() {
  const { userLoggedIn } = useAuth();
  console.log(userLoggedIn);
  const navigate = useNavigate();

  return (
    <nav className="navBar">
      {userLoggedIn ? (
        <div className="navBar">
          <Link to="/" className="link">
            Dashboard
          </Link>
          <Link to="/blogs" className="link">
            Blogs
          </Link>
          <button
            onClick={() => {
              doSignOut().then(() => {
                navigate("/auth");
              });
            }}
            className="linkbtn"
          >
            Log Out
          </button>
        </div>
      ) : (
        <Link to="/auth" className="link">
          Login
        </Link>
      )}
    </nav>
  );
}
