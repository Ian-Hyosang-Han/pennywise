import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { login } from "../app/auth/authSlice";
import { setUserInfo } from "../app/user/userSlice";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import { isAxiosError } from "axios";
import { appTitle } from "../globals/globalVariables";

const PageSignup = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // 이미 존재하는 사용자 확인
      const check = await api.get(`/users?username=${username}`);
      if (check.data.length > 0) {
        setError("Username already exists.");
        return;
      }

      // 회원가입 요청 (json-server용)
      const res = await api.post("/users", {
        username: username.trim(),
        password: password.trim(),
      });

      const user = res.data;
      const mockToken = "mock-token";

      // 저장
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
        <h2 className="font-Mon text-3xl font-bold mb-2">
          Sign-up for {appTitle}
        </h2>

        <div>
          <label
            className="font-Raj text-[#434343] text-2xl font-medium"
            htmlFor="username"
          >
            Username:
          </label>
          <input
            className="w-[380px] h-[50px] px-2 py-2 bg-white block mb-2 border-2 rounded-md border-[#757575]"
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>

        <div className="mb-4">
          <label
            className="font-Raj text-[#434343] text-2xl font-medium"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            className="w-[380px] h-[50px] px-2 py-2 bg-white block mb-2 border-2 rounded-md border-[#757575]"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        {/* ✅ Confirmpassword */}
        <div className="mb-4">
          <label
            className="font-Raj text-[#434343] text-2xl font-medium"
            htmlFor="confirmPassword"
          >
            Confirm Password:
          </label>
          <input
            className="w-[380px] h-[50px] px-2 py-2 bg-white block mb-2 border-2 rounded-md border-[#757575]"
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter password"
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          className="font-btn font-bold mb-5 w-[380px] text-3xl text-white px-2 py-2 bg-[#6BC1B4] hover:bg-[#5CAEA2] transition-colors duration-200 block rounded-md cursor-pointer"
          onClick={handleRegister}
        >
          Sign Up
        </button>
      </section>
    </main>
  );
};

export default PageSignup;
