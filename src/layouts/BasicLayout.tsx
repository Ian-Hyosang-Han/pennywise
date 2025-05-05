import { Outlet } from "react-router-dom";

/** Login / Signup Layout **/

const BasicLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default BasicLayout;