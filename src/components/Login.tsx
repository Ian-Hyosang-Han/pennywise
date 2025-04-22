import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { login } from "../app/auth/authSlice";
import { setUserInfo } from "../app/user/userSclice";
import { appTitle } from "../globals/globalVariables";
import { api } from "../api/axios";
import { isAxiosError } from "axios";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [inputEmail, setInputEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogIn = async (): Promise<void> => {
    const trimmedEmail = inputEmail.trim();

    if (!trimmedEmail || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      // json-server 방식: email + password 조회
      const response = await api.get(`/users?email=${trimmedEmail}&password=${password}`);
      const user = response.data[0];

      if (!user) {
        setError("Invalid email or password.");
        return;
      }

      // mock 토큰 사용
      const mockToken = "mock-token";

      // localStorage 저장
      localStorage.setItem("accessToken", mockToken);
      localStorage.setItem("user", JSON.stringify(user));

      // Redux 상태 저장
      dispatch(setUserInfo(user));
      dispatch(login());

      // 초기화 및 이동
      setInputEmail("");
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
    <div>
      <header>
        <h1>{appTitle}</h1>
      </header>

      <div>
        <input
          id="email"
          type="email"
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>

      <div>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </div>

      {error && <p>{error}</p>}

      <button onClick={handleLogIn}>Log In</button>

      <p>
        Don't have an account? <Link to="/register">Sign up here</Link>
      </p>
    </div>
  );
};

export default Login;