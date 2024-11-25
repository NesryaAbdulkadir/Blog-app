import React, { useState } from "react";
import { loginElement } from "../../config";
import CommonForm from "../CommonForm";
import { doSignInWithEmailAndPassword } from "../../firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import Register from "../Register";

const initalRegisterFormData = {
  name: "",
  email: "",
  password: "",
};

export default function Login({ setShowLogin }) {
  const { userLoggedIn } = useAuth();
  const [loginFormData, setLoginFormData] = useState(initalRegisterFormData);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      await doSignInWithEmailAndPassword(
        loginFormData.email,
        loginFormData.password
      );
    }
  };
  return (
    <div className="form-container">
      {userLoggedIn && <Navigate to={"/"} replace={true} />}
      <CommonForm
        formData={loginFormData}
        setFormData={setLoginFormData}
        formControls={loginElement}
        handleSubmit={handleSubmit}
        buttonText={"Sign In"}
        ButtonType={"submit"}
        className={"login-form"}
        formTitle={"Login"}
      />
      <small>
        Don't have an account?{" "}
        <button onClick={() => setShowLogin(false)} className="linkbtn">
          Register
        </button>
      </small>
    </div>
  );
}
