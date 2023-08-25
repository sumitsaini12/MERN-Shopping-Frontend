import { memo } from "react";
import AdminProductDetail from "../features/admin/components/AdminProductDetail";
import NavBar from "../features/navbar/NavBar";

function AdminProductDetailPage() {
  return (
    <>
      <NavBar>
        <AdminProductDetail></AdminProductDetail>
      </NavBar>
    </>
  );
}

export default memo(AdminProductDetailPage);
