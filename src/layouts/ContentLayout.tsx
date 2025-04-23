import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

/**
 * 로그인 후 내부 페이지 레이아웃 (Header/Footer 포함)
 */
const ContentLayout = () => {
  return (
    <div className="content-layout">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default ContentLayout;