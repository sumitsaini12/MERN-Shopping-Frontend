import React, { memo } from "react";
import UserOrders from "../features/user/components/UserOrders";
import NavBar from "../features/navbar/NavBar";

function UserOrdersPage() {
  return (
    <>
      <NavBar>
        <h1 className="text-center text-4xl font-bold text-slate-800 mt-4 -mb-4">My Orders</h1>
        <UserOrders />
      </NavBar>
    </>
  );
}
export default memo(UserOrdersPage);
