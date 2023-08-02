import React, { memo } from "react";
import ProductForm from "../features/admin/components/ProductForm";
import NavBar from "../features/navbar/NavBar";

function AdminProductFormPage() {
  return (
    <>
      <NavBar>
        <ProductForm></ProductForm>
      </NavBar>
    </>
  );
}
export default memo(AdminProductFormPage);
