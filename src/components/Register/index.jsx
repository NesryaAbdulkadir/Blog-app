import React, { useState } from "react";
import { registerElement } from "../../config";
import CommonForm from "../CommonForm";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import Login from "../Login";

const initalRegisterFormData = {
  name: "",
  email: "",
  password: "",
};

export default function Register({ setShowLogin }) {
  const { userLoggedIn } = useAuth();
  const [registerFormData, setRegisterFormData] = useState(
    initalRegisterFormData
  );
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [error, setError] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isSigningUp) {
      setIsSigningUp(true);
      await doCreateUserWithEmailAndPassword(
        registerFormData.email,
        registerFormData.password
      );
    }
    console.log(registerFormData);
  };
  return (
    <div className="form-container">
      {userLoggedIn && <Navigate to={"/"} replace={true} />}
      <CommonForm
        formData={registerFormData}
        setFormData={setRegisterFormData}
        formControls={registerElement}
        handleSubmit={handleSubmit}
        buttonText={"Sign Up"}
        ButtonType={"submit"}
        className={"register-form"}
        formTitle={"Register"}
      />
      <small>
        Already have an account?{" "}
        <button onClick={() => setShowLogin(true)} className="linkbtn">
          Login
        </button>
      </small>
    </div>
  );
}
