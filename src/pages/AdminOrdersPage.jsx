import { memo } from "react";
import AdminOrder from "../features/admin/components/AdminOrder";
import NavBar from "../features/navbar/NavBar";

function AdminOrdersPage() {
  return (
    <>
      <NavBar>
        <AdminOrder></AdminOrder>
      </NavBar>
    </>
  );
}

export default memo(AdminOrdersPage);
