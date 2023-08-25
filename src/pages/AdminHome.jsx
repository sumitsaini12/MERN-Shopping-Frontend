import { memo } from "react";
import AdminProductList from "../features/admin/components/AdminProductList";
import NavBar from "../features/navbar/NavBar";

function AdminHome() {
  return (
    <>
      <NavBar>
        <AdminProductList></AdminProductList>
      </NavBar>
    </>
  );
}

export default memo(AdminHome);
