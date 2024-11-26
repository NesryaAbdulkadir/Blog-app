import React, { useState } from "react";
import Login from "../../components/Login";
import Register from "../../components/Register";
import { useAuth } from "../../context/AuthContext";

export default function Auth() {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <div>
      {showLogin ? (
        <Login setShowLogin={setShowLogin} />
      ) : (
        <Register setShowLogin={setShowLogin} />
      )}
    </div>
  );
}
