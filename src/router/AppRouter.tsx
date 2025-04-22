import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageLogin from "../pages/PageLogin";
// import PageDashboard from "../pages/PageDashboard";
import PageNotFound from "../pages/PageNotFound";
import PageSignup from "../pages/PageSignup";

function AppRouter() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 페이지 */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <PageLogin />
          }
        />

        {/* 회원가입 페이지 → /signup 으로 변경 ✅ */}
        <Route path="/signup" element={<PageSignup />} />

        {/* 대시보드 - 로그인 사용자만 접근 가능 */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <div className="wrapper">
                <Header />
                <PageDashboard />
                <Footer />
              </div>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* 404 페이지 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;