import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { login } from "../app/auth/authSlice";
import { setUserInfo } from "../app/user/userSlice";
import { appTitle } from "../globals/globalVariables";
import { api } from "../api/axios";
import { isAxiosError } from "axios";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [inputUsername, setInputUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogIn = async (): Promise<void> => {
    const trimmedUsername = inputUsername.trim();

    if (!trimmedUsername) {
      setError("Please enter your username.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      // json-server: search username + password
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

    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || "Login failed.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <h1 className="flex flex-low justify-center items-center">
        <img src="/pennywise-logo.png" className="w-24" alt="logo" />
        <span className="font-Mon text-[50px] font-bold">{appTitle}</span>
      </h1>
      <p className="font-Raj text-xl text-[#434343] mb-2">Please enter your details to log in</p>
      <div className="ml-5">
        <input
          className="w-[380px] h-[50px] px-2 py-2 bg-white block mb-5 border-2 rounded-md border-[#757575]"
          id="username"
          type="text"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
          placeholder="Username"
        />

        <div className="relative w-[380px] mb-5">
          <input
            className="w-full h-[50px] px-2 py-2 bg-white border-2 rounded-md border-[#757575]"
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min 8 Characters"
          />
          <div
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <FaRegEye size={20} />
            ) : (
              <FaRegEyeSlash size={20} />
            )}
          </div>
        </div>
      </div>

      {error && <p className="text-red-600 mb-2.5">{error}</p>}

      <button
        className="font-btn font-bold ml-5 mb-5 w-[380px] text-3xl text-white px-2 py-2 bg-[#6BC1B4] hover:bg-[#5CAEA2] transition-colors duration-200 block rounded-md cursor-pointer"
        onClick={handleLogIn}
      >
        Log In
      </button>

      <p className="font-Raj text-[#434343] text-2xl">
        Don't have an account?{" "}
        <Link to="/signup">
          <strong className="underline">Signup</strong>
        </Link>
      </p>
    </div>
  );
};

export default Login;
