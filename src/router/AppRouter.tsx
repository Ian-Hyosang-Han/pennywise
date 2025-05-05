import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { RootState, AppDispatch } from "../app/store";

import BasicLayout from "../layouts/BasicLayout";
import ContentLayout from "../layouts/ContentLayout";

import PageLogin from "../pages/PageLogin";
import PageSignup from "../pages/PageSignup";
import PageNotFound from "../pages/PageNotFound";

import { checkAuth } from "../app/auth/authSlice";
import { setUserInfo } from "../app/user/userSlice";
import PageDashboard from "../pages/PageDashboard";
import PageManageExpenses from "../pages/PageManageExpenses";
import PageCreateExpenses from "../pages/PageCreateExpenses";
import PageDetailExpense from "../pages/PageDetatilExpense";

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
        {/* Login / Signup Layout */}
        <Route element={<BasicLayout />}>
          <Route
            path="login"
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <PageLogin />
            }
          />
          <Route
            path="signup"
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <PageSignup />
            }
          />
        </Route>

        {/* Dashboard Layout */}
        <Route element={isAuthenticated ? (<ContentLayout />) : (<Navigate to="/login" replace />)}>
          <Route path="/" element={<PageDashboard />} />
          <Route path="detailexpense/:id" element={<PageDetailExpense />} />
          <Route path="manageexpenses" element={<PageManageExpenses />} />
          <Route path="createexpenses" element={<PageCreateExpenses />} />
        </Route>

        {/* fallback 404 page */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
