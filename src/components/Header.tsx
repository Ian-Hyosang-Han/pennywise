import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import { logout } from "../app/auth/authSlice";
import { clearUserInfo } from "../app/user/userSclice";
import { useState } from "react";
import Modal from "./Modal";

const Header = () => {
  const nickname = useSelector((state: RootState) => state.user.userInfo?.nickname);
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());         // 인증 상태 초기화
    dispatch(clearUserInfo());  // 사용자 정보 제거
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <header className="header">
      <div className="header-title">PennyWise</div>

      <div className="header-actions">
        <span className="greeting">
          Hello, <strong>{nickname || "Guest"}</strong> 👋
        </span>
        <button onClick={toggleModal}>My Page</button>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {isModalOpen && <Modal onClose={toggleModal} />}
    </header>
  );
};

export default Header;