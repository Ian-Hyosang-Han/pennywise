import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { login } from "../app/auth/authSlice";
import { setUserInfo } from "../app/user/userSlice";
import { appTitle } from "../globals/globalVariables";
import { api } from "../api/axios";
import { isAxiosError } from "axios";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [inputUsername, setInputUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogIn = async (): Promise<void> => {
    const trimmedUsername = inputUsername.trim();

    if (!trimmedUsername || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      // json-server 방식: username + password 검색
      const response = await api.get(
        `/users?username=${trimmedUsername}&password=${password}`
      );
      const user = response.data[0];

      if (!user) {
        setError("Invalid username or password.");
        return;
      }

      const mockToken = "mock-token";

      localStorage.setItem("accessToken", mockToken);
      localStorage.setItem("user", JSON.stringify(user));

      dispatch(setUserInfo(user));
      dispatch(login());

      setInputUsername("");
      setPassword("");
      setError("");
      navigate("/dashboard");
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || "Login failed.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <h1 className="flex flex-low justify-center items-center mb-2">
        <img src="/logo.png" className="w-24" alt="logo" />
        <span className="font-Mon text-[50px] font-bold">{appTitle}</span>
      </h1>

      <div className="ml-5 ">
        <input
          className="w-[380px] h-[50px] px-2 py-2 bg-white block mb-5 border-2 rounded-md border-[#757575]"
          id="username"
          type="text"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
          placeholder="ID first... Budget later..."
        />
        {/* </div>

      <div> */}
        <input
          className="w-[380px] h-[50px] px-2 py-2 bg-white block mb-5 border-2 rounded-md border-[#757575]"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Spend wisely... Type wisely..."
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button
        className="font-Han ml-5 mb-5 w-[380px] text-3xl text-white px-2 py-2 bg-[#6BC1B4] hover:bg-[#5CAEA2] transition-colors duration-200 block rounded-md cursor-pointer"
        onClick={handleLogIn}
      >
        Log In
      </button>

      <p className="font-Raj text-[#434343] text-2xl">
        Don't have an account?{" "}
        <Link to="/signup">
          <strong>Sign up here</strong>
        </Link>
      </p>
    </div>
  );
};

export default Login;
