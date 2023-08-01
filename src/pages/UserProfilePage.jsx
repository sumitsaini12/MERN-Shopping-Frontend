import React, { memo } from "react";
import NavBar from "../features/navbar/Navbar";
import UserProfile from "../features/user/components/UserProfile";

function UserProfilePage() {
  return (
    <>
      <NavBar>
        <h1 className="text-center text-4xl font-bold text-slate-800 mt-4 -mb-4">
          My Profile
        </h1>
        <UserProfile />
      </NavBar>
    </>
  );
}
export default memo(UserProfilePage);
