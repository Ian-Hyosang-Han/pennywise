import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { logout } from "../app/auth/authSlice";
import { clearUserInfo } from "../app/user/userSlice";
import { LuLayoutDashboard } from "react-icons/lu";
import { LuClipboardCheck } from "react-icons/lu";
import { LuSquarePlus } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";

const SideNavBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    // localStorage 클리어
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    // Redux 상태 초기화
    dispatch(logout());
    dispatch(clearUserInfo());
    // 로그인 페이지로 리다이렉트
    navigate("/login");
  };

  // NavLink에 active 스타일 넣으면, 현재 선택된 메뉴가 강조됩니다.
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-4 py-2 rounded rounded-tr-none rounded-br-none hover:bg-[#6BC1B4] hover:!text-white ${
      isActive ? "bg-[#6BC1B4] text-white font-bold" : ""
    }`;

  return (
    <nav className="sticky top-[61px] h-full w-64 bg-white border-r border-gray-200/50 z-20 flex flex-col justify-between">
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
        <li>
          <NavLink to="/createexpenses" className={linkClass}>
            <LuSquarePlus size={20} />
            <span>Create Expense</span>
          </NavLink>
        </li>
      </ul>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 font-Mon font-medium px-4 py-2 rounded-md hover:bg-[#6BC1B4] hover:!text-white transition-colors duration-200 ml-3 mb-4">
        <LuLogOut size={20} />
        <span>Logout</span>
      </button>
    </nav>
  );
};

export default SideNavBar;
