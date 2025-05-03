import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import SideNavBar from "../components/SideNavBar";

const ContentLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header
        isOpen={sidebarOpen}
        onOpen={() => setSidebarOpen(true)}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex flex-1 overflow-hidden">
        <SideNavBar isOpen={sidebarOpen} />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ContentLayout;