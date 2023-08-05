import Footer from "../features/commen/Footer";
import NavBar from "../features/navbar/NavBar";
import ProductList from "../features/product/components/ProductList";

function Home() {
  return (
    <>
      <NavBar>
        <ProductList></ProductList>
      </NavBar>
      <Footer />
    </>
  );
}

export default Home;
