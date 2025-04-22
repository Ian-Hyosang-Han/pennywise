import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { login } from '../app/auth/authSlice';
import { setUserInfo } from '../app/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/axios';
import { isAxiosError } from "axios";
import { appTitle } from '../globals/globalVariables';

const PageSignup = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
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
      const res = await api.post('/users', {
        username: username.trim(),
        password: password.trim(),
      });

      const user = res.data;
      const mockToken = 'mock-token';

      // 저장
      localStorage.setItem('accessToken', mockToken);
      localStorage.setItem('user', JSON.stringify(user));

      dispatch(setUserInfo(user));
      dispatch(login());
      navigate('/dashboard');
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || "Registration failed.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <main>
      <section>
        <h2>Sign-up for {appTitle}</h2>

        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button onClick={handleRegister}>Sign Up</button>
      </section>
    </main>
  );
};

export default PageSignup;