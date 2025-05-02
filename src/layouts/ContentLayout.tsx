import { Outlet } from "react-router-dom";
import Header from "../components/Header";
// import Footer from "../components/Footer";
import SideNavBar from "../components/SideNavBar";

/** After Login Content Layout (include Header/Footer) */

const ContentLayout = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <SideNavBar />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default ContentLayout;