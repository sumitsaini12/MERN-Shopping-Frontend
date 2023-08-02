import React from "react";
import NavBar from "../features/navbar/NavBar";
import ProductDetail from "../features/product/components/ProductDetail";

function ProductDetailPage() {
    return ( 
        <>
            <NavBar>
                <ProductDetail></ProductDetail>
            </NavBar>
        </>
     );
}

export default ProductDetailPage;