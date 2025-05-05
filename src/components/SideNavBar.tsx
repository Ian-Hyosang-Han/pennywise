import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { logout } from "../app/auth/authSlice";
import { clearUserInfo } from "../app/user/userSlice";
import {
  LuLayoutDashboard,
  LuClipboardCheck,
  LuSquarePlus,
  LuLogOut,
} from "react-icons/lu";

export interface SideNavBarProps {
  isOpen: boolean;
}

const SideNavBar: React.FC<SideNavBarProps> = ({ isOpen }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    dispatch(logout());
    dispatch(clearUserInfo());
    navigate("/login");
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-4 py-2 rounded rounded-tr-none rounded-br-none hover:bg-[#6BC1B4] hover:text-white ${
      isActive ? "bg-[#6BC1B4] text-white font-bold" : ""
    }`;

  return (
    <nav
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:sticky md:top-[61px] md:h-[calc(100vh-61px)] md:translate-x-0 md:transform-none md:flex md:flex-col md:justify-between`}
    >
      <ul className="flex flex-col font-Mon font-medium ml-3">
        <li className="mt-10 mb-2">
          <NavLink to="/" className={linkClass}>
            <LuLayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li className="mb-2">
          <NavLink to="/manageexpenses" className={linkClass}>
            <LuClipboardCheck size={20} />
            <span>Manage Expenses</span>
          </NavLink>
        </li>
        <li className="mb-2">
          <NavLink to="/createexpenses" className={linkClass}>
            <LuSquarePlus size={20} />
            <span>Create Expense</span>
          </NavLink>
        </li>
      </ul>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 font-Mon font-medium px-4 py-2 rounded rounded-tr-none rounded-br-none hover:bg-[#6BC1B4] hover:!text-white transition-colors duration-200 ml-3 mb-10 cursor-pointer"
      >
        <LuLogOut size={20} />
        <span>Logout</span>
      </button>
    </nav>
  );
};

export default SideNavBar;
