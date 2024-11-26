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
    <div className="w-[50%] m-auto p-10">
      {userLoggedIn && <Navigate to={"/"} replace={true} />}
      <CommonForm
        formData={loginFormData}
        setFormData={setLoginFormData}
        formControls={loginElement}
        handleSubmit={handleSubmit}
        buttonText={"Sign In"}
        ButtonType={"submit"}
        className={"w-full flex flex-col gap-5 border-none"}
        inputClassName={"w-full text-xl"}
        legendClassName={"text-4xl font-bold"}
        buttonClassName={
          "px-5 py-2 rounded-md text-xl cursor-pointer mt-5 max-w-max bg-blue-500 mb-10"
        }
        formTitle={"Login"}
      />
      <small>
        Don't have an account?{" "}
        <button
          onClick={() => setShowLogin(false)}
          className="bg-white border-none pb-5  text-xl hover:underline"
        >
          Register
        </button>
      </small>
    </div>
  );
}
