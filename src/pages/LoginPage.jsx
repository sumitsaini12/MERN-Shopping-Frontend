import { memo } from "react";
import Login from "../features/auth/components/Login";
function LoginPage() {
  return (
    <>
      <Login></Login>
    </>
  );
}

export default memo(LoginPage);
