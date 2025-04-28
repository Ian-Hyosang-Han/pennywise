import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { RootState, AppDispatch } from "../app/store";

import BasicLayout from "../layouts/BasicLayout";
import ContentLayout from "../layouts/ContentLayout";

import PageLogin from "../pages/PageLogin";
import PageSignup from "../pages/PageSignup";
import PageHome from "../pages/PageHome";
import PageNotFound from "../pages/PageNotFound";

import { checkAuth } from "../app/auth/authSlice";
import { setUserInfo } from "../app/user/userSlice";

function AppRouter() {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    dispatch(checkAuth())
      .unwrap()
      .catch((err) => console.error("auth check failed", err));
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      dispatch(setUserInfo(JSON.parse(savedUser)));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ 로그인 이후 접근 가능한 레이아웃 */}
        <Route element={<ContentLayout />}>
          <Route
            path="/"
            element={
              isAuthenticated ? <PageHome /> : <Navigate to="/login" replace />
            }
          />
        </Route>

        {/* ✅ 로그인/회원가입 레이아웃 */}
        <Route element={<BasicLayout />}>
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <PageLogin />
            }
          />
          <Route
            path="/signup"
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <PageSignup />
            }
          />
        </Route>

        {/* ✅ 모든 경로 fallback */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
