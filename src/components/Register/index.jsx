import React, { useState } from "react";
import { registerElement } from "../../config";
import CommonForm from "../CommonForm";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

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
    <div className="w-[50%] m-auto p-10">
      {userLoggedIn && <Navigate to={"/"} replace={true} />}
      <CommonForm
        formData={registerFormData}
        setFormData={setRegisterFormData}
        formControls={registerElement}
        handleSubmit={handleSubmit}
        buttonText={"Sign Up"}
        ButtonType={"submit"}
        className="w-full flex flex-col gap-5 border-none"
        formTitle={"Register"}
        inputClassName="w-full text-xl border-b-2 outline-none"
        legendClassName="text-4xl font-bold"
        buttonClassName="bg-blue-500 mb-10 bg-blue-400"
      />
      <small>
        Already have an account?{" "}
        <button
          onClick={() => setShowLogin(true)}
          className="bg-white border-none pb-5  text-xl hover:underline"
        >
          Login
        </button>
      </small>
    </div>
  );
}
