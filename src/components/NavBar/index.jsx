import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { doSignOut } from "../../firebase/auth";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const { userLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  console.log(userLoggedIn);
  const navigate = useNavigate();

  return (
    <nav>
      {userLoggedIn ? (
        <div className="float-right my-5 mx-10 p-5 cursor-pointer">
          {!isOpen ? (
            <Menu onClick={() => setIsOpen(true)} className="block sm:hidden" />
          ) : (
            <X onClick={() => setIsOpen(false)} className="block sm:hidden" />
          )}
          {isOpen ? (
            <div className="bg-white flex flex-col items-center justify-center z-50 p-5 sm:hidden absolute top-20 right-0 w-full max-h-max">
              <Link
                to="/"
                className="bg-white border-none text-xl pb-5 hover:underline"
              >
                Dashboard
              </Link>
              <Link
                to="/blogs"
                className="bg-white border-none text-xl pb-5 hover:underline"
              >
                Blogs
              </Link>
              <button
                onClick={() => {
                  doSignOut().then(() => {
                    navigate("/auth");
                  });
                }}
                className="bg-white border-none text-xl pb-8 hover:underline"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="bg-white hidden sm:flex items-center justify-center gap-10 p-5">
              <Link
                to="/"
                className="bg-white border-none text-xl pb-5 hover:underline"
              >
                Dashboard
              </Link>
              <Link
                to="/blogs"
                className="bg-white border-none text-xl pb-5 hover:underline"
              >
                Blogs
              </Link>
              <button
                onClick={() => {
                  doSignOut().then(() => {
                    navigate("/auth");
                  });
                }}
                className="bg-white border-none text-xl pb-8 hover:underline"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      ) : null}
    </nav>
  );
}
