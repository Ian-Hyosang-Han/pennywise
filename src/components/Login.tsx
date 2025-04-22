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
      const response = await api.get(`/users?username=${trimmedUsername}&password=${password}`);
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
    <div>
      <header>
        <h1>{appTitle}</h1>
      </header>

      <div>
        <input
          id="username"
          type="text"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
          placeholder="Enter your username"
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
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
};

export default Login;