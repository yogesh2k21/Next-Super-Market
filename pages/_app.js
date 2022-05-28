import "../styles/globals.css";
import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  let router = useRouter();
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState(0);
  const [Globalcart, setGlobalcart] = useState({});
  const [Total, setTotal] = useState(0);

  useEffect(() => {
    console.log("hey i am _app.js useEffect");

    try {
      if (localStorage.getItem("cart")) {
        setGlobalcart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
    }

    const token = localStorage.getItem("token");
    if (token) {
      console.log("changing user value");
      setUser({ value: token });
      setKey(Math.random());
    }
  }, [router.query]); //passing router.query is to Re-render the _app so that this useEffect runs, now it will re render on every URL change.

  const saveGlobalCart = (myCart) => {
    console.log("save cart running");
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt = 0;
    let keys=Object.keys(myCart)
    for (let i = 0; i < keys.length; i++) {
      // console.log(myCart[keys[i]]);
      subt += myCart[keys[i]].product_subtotal;
    }
    setTotal(subt)
  };

  const increaseQuantity = (product_id,product_name,product_price,product_qty,product_category,product_subtotal) => {
    console.log(product_id,product_name,product_price,product_qty,product_category,product_subtotal);
    console.log("incresing");
    let newCart = Globalcart;
    if (product_id in newCart) {
      newCart[product_id].product_qty = Globalcart[product_id].product_qty + 1;
      newCart[product_id].product_subtotal = Globalcart[product_id].product_subtotal + Globalcart[product_id].product_price;
      toast.success("Quantity +1");
      router.push('/Cart')
    } else {
      newCart[product_id] = { product_name, product_price, product_qty: 1 ,product_category,product_subtotal};
      toast.success(product_name.slice(0, 11) + "..." +" in Cart Now!");
    }
    
    setGlobalcart(newCart);
    saveGlobalCart(newCart);
  };

  const decreaseQuantity = (product_id,product_name,product_price,product_qty,product_category,product_subtotal) => {
    console.log(product_id,product_name,product_price,product_qty,product_category,product_subtotal);
    console.log("decreasing");
    let newCart = Globalcart;
    if (product_id in newCart) {
      newCart[product_id].product_qty =  Globalcart[product_id].product_qty - 1;
      newCart[product_id].product_subtotal =  Globalcart[product_id].product_subtotal - newCart[product_id].product_price;
      toast.success("Quantity -1");
    }else{
      router.push('/Cart')
    }
    if (newCart[product_id].product_qty <= 0) {
      delete newCart[product_id];
    }
    
    setGlobalcart(newCart);
    saveGlobalCart(newCart);
    router.push('/Cart')
  };

  const clearCart = () => {
    setGlobalcart({});
    saveGlobalCart({});
    toast.success("Cart is Empty now!");
  };

  const logout = () => {
    console.log("removing token from localStorage....");
    toast.success("Successfully logout!");
    localStorage.removeItem("token");
    setKey(Math.random());
    setUser({ value: null }); //setting user value to null so that _app.js will re render the navbar and remove the login botton and add logout button bcoz they are depend on user.value in code
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      ></link>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      <Navbar logout={logout} user={user} key={key} />
      <Component
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        saveGlobalCart={saveGlobalCart}
        setGlobalcart={setGlobalcart}
        Globalcart={Globalcart}
        Total={Total}
        user={user}
        {...pageProps}
      />
      <Footer />
    </>
  );
}

export default MyApp;
