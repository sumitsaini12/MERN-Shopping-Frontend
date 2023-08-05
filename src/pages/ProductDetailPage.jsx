import React from "react";
import NavBar from "../features/navbar/NavBar";
import ProductDetail from "../features/product/components/ProductDetail";
import Footer from "../features/commen/Footer";

function ProductDetailPage() {
    return ( 
        <>
            <NavBar>
                <ProductDetail></ProductDetail>
            </NavBar>
            <Footer />
        </>
     );
}

export default ProductDetailPage;