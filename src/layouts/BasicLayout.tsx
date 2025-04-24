import { Outlet } from "react-router-dom";

/**
 * 로그인, 회원가입 등 Header/Footer 없는 레이아웃
 */
const BasicLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default BasicLayout;