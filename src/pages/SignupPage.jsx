import { memo } from "react";
import Signup from "../features/auth/components/Signup";

function SignupPage() {
  return (
    <>
      <Signup></Signup>
    </>
  );
}

export default memo(SignupPage);
