import "bootstrap/dist/css/bootstrap.min.css";
import NavBarMarket from "./components/NavBarMarket";
import Home from "./components/Home";
import ItemListContainer from "./components/ItemListContainer";
// import ItemDetailContainer from "./components/ItemDetailContainer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";
import CartContext from "./components/CartContext";
import User from "./components/User";
import Gracias from "./components/Gracias";
import AboutUs from "./components/AboutUs";
import AdminItemListContainer from "./components/AdminItemListContainer";
import AdminLogIn from "./components/AdminLogIn";
import { useState, useEffect } from "react";
import { fullFireBase } from "../src/components/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AdminProductsListContainer from "./components/AdminProductsListContainer";
import NewProductForm from "./components/NewProductForm";
import EditProductForm from "./components/EditProductForm";
import CookieBanner from "./components/CookieBanner";
import Impressum from "./components/Impressum";
import Datenschutz from "./components/Datenschutz";
import Footer from "./components/Footer";

export const auth = getAuth(fullFireBase);

const App = () => {
  const [user, setUser] = useState(null);

  // CORRECCIÓN: Esto debe ir dentro de un useEffect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
      if (userFirebase) {
        const userData = {
          uid: userFirebase.uid,
          email: userFirebase.email,
        };
        setUser(userData);
      } else {
        setUser(null);
      }
    });

    // Limpieza al desmontar
    return () => unsubscribe();
  }, []);

  // onAuthStateChanged(auth, (userFirebase) => {
  //   if (userFirebase) {
  //     const userData = {
  //       uid: userFirebase.uid,
  //       email: userFirebase.email,
  //     };
  //     setUser(userData);
  //   } else {
  //     setUser(null);
  //   }
  // });

  return (
    <>
      <BrowserRouter basename="/die_backpfeife_bakery">
        <CartContext>
          <NavBarMarket user={user} />
          <CookieBanner />
          <Routes>
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<ItemListContainer />} />
            <Route path="/category/:category" element={<ItemListContainer />} />
            {/* <Route
              path="/products/detalles/:id"
              element={<ItemDetailContainer />} 
            /> */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/user" element={<User />}></Route>
            <Route path="/gracias" element={<Gracias />}></Route>
            <Route path="/about_us" element={<AboutUs />}></Route>
            <Route
              path="/admin_item_list"
              element={user ? <AdminItemListContainer /> : <AdminLogIn />}
            ></Route>
            <Route
              path="/admin_products_list"
              element={user ? <AdminProductsListContainer /> : <AdminLogIn />}
            ></Route>
            <Route
              path="/admin_new_product"
              element={user ? <NewProductForm /> : <AdminLogIn />}
            ></Route>
            <Route
              path="/edit_product/:id"
              element={user ? <EditProductForm /> : <AdminLogIn />}
            ></Route>
          </Routes>
          <Footer />
        </CartContext>
      </BrowserRouter>
    </>
  );
};

export default App;
