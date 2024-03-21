import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { login } from "../api/apiIndex";
import useAuth from "../hooks/useAuth";
import useToast from "../hooks/useToast";
import { ToastSeverity } from "../context/context";
import ControlledInput from "../components/form_components/ControlledInput";
import ControlledPasswordInput from "../components/form_components/ControlledPasswordInput";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { setIsAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(email, password);

      if (!response.token) {
        setError(response.message);
      } else {
        setIsAuthenticated(true);
        navigate("/");
        localStorage.setItem("token", response.token);
        setError("");
      }
    } catch (error: any) {
      console.error(error);
      showToast(`${error}`, ToastSeverity.Error, "Login Error", 4);
      if (error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="container-center">
      <div className="card">
        <h2 className="card-title ">Login</h2>
        {error && <p className="error-message text-center ">{error}</p>}
        <form onSubmit={handleLogin} className="input-container">
          <ControlledInput
            label="Email"
            name="email"
            placeholder="Enter Email"
            value={email}
            onValueChange={setEmail}
          />
          <ControlledPasswordInput
            label="Password"
            name="password"
            placeholder="Enter Password"
            value={password}
            onValueChange={setPassword}
            error={null}
          />
          <button className="submit" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
