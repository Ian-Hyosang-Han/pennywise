import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { login } from "../app/auth/authSlice";
import { setUserInfo } from "../app/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import { isAxiosError } from "axios";
import { appTitle } from "../globals/globalVariables";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PageSignup = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleRegister = async () => {
    console.log({ username, password, confirmPassword });
    if (!username.trim()) {
      setError("Please fill your Username.");
      return;
    }
    if (!password.trim()) {
      setError("Please fill your Password.");
      return;
    }
    if (!confirmPassword.trim()) {
      setError("Please confirm your Password.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Verify if the user already exists
      const check = await api.get(`/users?username=${username}`);
      if (check.data.length > 0) {
        setError("Username already exists.");
        return;
      }

      // Send signup request to json-server
      const res = await api.post("/users", {
        username: username.trim(),
        password: password.trim(),
      });

      const user = res.data;
      const mockToken = "mock-token";

      // Save
      localStorage.setItem("accessToken", mockToken);
      localStorage.setItem("user", JSON.stringify(user));

      dispatch(setUserInfo(user));
      dispatch(login());
      navigate("/");
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || "Registration failed.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center">
      <section>
        <h1 className="flex items-center justify-center mb-2">
          <img src="/pennywise-logo.png" className="w-24" alt="logo" />
          <span className="font-Mon text-[50px] font-bold">{appTitle}</span>
        </h1>
        <p className="font-Mon text-2xl text-[#434343] font-bold mb-4">
          Create an Account
        </p>

        {/* Username */}
        <div className="mb-4">
          <label
            className="font-Raj text-[#434343] text-2xl font-medium"
            htmlFor="username"
          >
            Username:
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="w-[380px] h-[50px] px-2 py-2 bg-white block mb-2 border-2 rounded-md border-[#757575]"
          />
        </div>

        {/* Password */}
        <div className="relative mb-4">
          <label
            className="font-Raj text-[#434343] text-2xl font-medium block mb-2"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min 8 Characters"
            className="w-[380px] h-[50px] px-2 py-2 bg-white block border-2 rounded-md border-[#757575]"
          />
          <div
            className="absolute inset-y-0 right-7 top-9 flex items-center cursor-pointer text-gray-500"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
          </div>
        </div>

        {/* Confirm Password */}
        <div className="relative mb-6">
          <label
            className="font-Raj text-[#434343] text-2xl font-medium block mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password:
          </label>
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter password"
            className="w-[380px] h-[50px] px-2 py-2 bg-white block border-2 rounded-md border-[#757575]"
          />
          <div
            className="absolute inset-y-0 right-7 top-9 flex items-center cursor-pointer text-gray-500"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? (
              <FaRegEye size={20} />
            ) : (
              <FaRegEyeSlash size={20} />
            )}
          </div>
        </div>

        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <button
          className="font-btn font-bold w-[380px] text-3xl text-white px-2 py-2 cursor-pointer bg-[#6BC1B4] hover:bg-[#5CAEA2] transition-colors duration-200 rounded-md"
          onClick={handleRegister}
        >
          Sign Up
        </button>

        <p className="font-Raj text-[#434343] text-2xl mt-4">
          Already have an account?{" "}
          <Link to="/login">
            <strong className="underline">Login</strong>
          </Link>
        </p>
      </section>
    </main>
  );
};

export default PageSignup;