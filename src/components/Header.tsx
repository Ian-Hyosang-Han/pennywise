import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import { logout } from "../app/auth/authSlice";
import { clearUserInfo } from "../app/user/userSlice";
import MypageModal from "./MypageModal";

const Header = () => {
  const username = useSelector(
    (state: RootState) => state.user.userInfo?.username
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    dispatch(logout());
    dispatch(clearUserInfo());
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  return (
    <main className="header flex justify-between items-center text-[#434343] px-6 py-4 bg-white border-b border-gray-200">
      <div className="flex flex-low justify-center items-center" >
        <img src="/logo.png" className="w-10" alt="logo" />
        <h1 className="header-title font-Mon text-2xl font-bold">PennyWise</h1>
      </div>
      <div className="header-actions flex items-center gap-4">
        <span className="greeting text-[#434343] font-Mon text-xl" >
          Hello, <strong>{username || "Guest"}</strong> 👋
        </span>
        <button 
          className="font-Mon text-xl font-bold underline" 
          onClick={toggleModal}>
          MyPage
        </button>
        {isModalOpen && <MypageModal onClose={toggleModal} />}
        <button
          onClick={handleLogout}
          className="font-Han px-4 py-2 bg-[#6BC1B4] text-white rounded-md hover:bg-[#5CAEA2] transition-colors duration-200 block cursor-pointer"
        >
          Log out
        </button>
      </div>
    </main>
  );
};

export default Header;
