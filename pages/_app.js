import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../pages/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from 'react-top-loading-bar'

function MyApp({ Component, pageProps }) {
  let router = useRouter();
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState(0);
  const [Globalcart, setGlobalcart] = useState({});
  const [Total, setTotal] = useState(0);
  const [orders, setOrders] = useState({});
  const [progress, setProgress] = useState(0);
  const [cartLength, setCartLength] = useState(0);
  // const [searchItem, setSearchItem] = useState({});
  const [searchKeyword, setSearchKeyword] = useState("");
  // const [showMainContent, setshowMainContent] = useState(true);



  useEffect(() => {
    console.log("hey i am _app.js useEffect");
    router.events.on('routeChangeStart', ()=>{
      setProgress(10)
    })
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
      // console.log("changing user value");
      setUser({ value: token });
      setKey(Math.random());
    let subt = 0;
    let keys=Object.keys(Globalcart)
    for (let i = 0; i < keys.length; i++) {
      subt += Globalcart[keys[i]].product_subtotal;
    }
    setTotal(subt)
    try {
      setCartLength(Object.keys(JSON.parse((localStorage.getItem("cart")))).length)
  } catch (error) {
      console.log('Error in getting cart length');            
  }
    }
    router.events.on('routeChangeComplete', ()=>{
      setProgress(100)
    })
  }, [router.query]); //passing router.query is to Re-render the _app so that this useEffect runs, now it will re render on every URL change.

  const saveGlobalCart = (myCart) => {
    // console.log("save cart running");
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt = 0;
    let keys=Object.keys(myCart)
    for (let i = 0; i < keys.length; i++) {
      // console.log(myCart[keys[i]]);
      subt += myCart[keys[i]].product_subtotal;
    }
    setTotal(subt)
  };

  const increaseQuantity = async (product_id,product_name,product_price,product_qty,product_category,product_subtotal,product_image) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_MY_BACK_HOST}/product/addToCart/`+product_id, {
      method: "GET", 
      headers: {
      "Content-Type": "application/json",
      "Authorization":"Bearer "+localStorage.getItem("token")
    }}); //request end
    // console.log(product_id,product_name,product_price,product_qty,product_category,product_subtotal,product_image);
    // console.log("incresing");
    let newCart = Globalcart;
    if (product_id in newCart) {
      newCart[product_id].product_qty = Globalcart[product_id].product_qty + 1;
      newCart[product_id].product_subtotal = Globalcart[product_id].product_subtotal + Globalcart[product_id].product_price;
      toast.success("Quantity +1");
      // router.push('/Cart')
    } else {
      newCart[product_id] = { product_name, product_price, product_qty: 1 ,product_category,product_subtotal,product_image}; //new item adding
      setCartLength(cartLength+1)
      toast.success(product_name.slice(0, 11) + "..." +" in Cart Now!");
    }
    
    setGlobalcart(newCart);
    saveGlobalCart(newCart);
  };

  const decreaseQuantity = async (product_id,product_name,product_price,product_qty,product_category,product_subtotal) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_MY_BACK_HOST}/product/removeFromCart/`+product_id, {
      method: "GET",
      headers: {
      "Content-Type": "application/json",
      "Authorization":"Bearer "+localStorage.getItem("token")
    }}); //request end
    // console.log(product_id,product_name,product_price,product_qty,product_category,product_subtotal);
    // console.log("decreasing");
    let newCart = Globalcart;
    if (product_id in newCart) {
      newCart[product_id].product_qty =  Globalcart[product_id].product_qty - 1;
      newCart[product_id].product_subtotal =  Globalcart[product_id].product_subtotal - newCart[product_id].product_price;
      if (newCart[product_id].product_qty <= 0) { //if quantity becomes equal to or less then 0 then it will delete object and Re-render the page.
        delete newCart[product_id];
        setCartLength(cartLength-1);
        toast.success("Removed from Cart");
      }else{ //if newCart[product_id].product_qty not equal to zer0
        toast.success("Quantity -1");
      }
    }else{
      router.push('/Cart')
    }
    
    setGlobalcart(newCart);
    saveGlobalCart(newCart);
    // router.push('/Cart')
  };

  const clearCart = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_MY_BACK_HOST}/product/ClearCart/`, {
      method: "GET", 
      headers: {
      "Content-Type": "application/json",
      "Authorization":"Bearer "+localStorage.getItem("token")
    }}); //request end
    setGlobalcart({});
    saveGlobalCart({});
    setCartLength(0)
    toast.success("Cart is Empty now!");
  };

  const logout = () => {
    // console.log("removing token from localStorage....");
    localStorage.clear();
    toast.success("Successfully logout!");
    setKey(Math.random());
    setUser({ value: null }); //setting user value to null so that _app.js will re render the navbar and remove the login botton and add logout button bcoz they are depend on user.value in code
    setTimeout(() => {
      router.push("/");
      // window.location.replace("http://localhost:3000/"); //hard redirect addToCart button disable state not working
    }, 1500);
  };

  const getSearchData= async()=>{
    const response = await fetch(`${process.env.NEXT_PUBLIC_MY_BACK_HOST}/product/searchItem/${searchKeyword}`, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        "Authorization":"Bearer "+localStorage.getItem("token")
      }}); //request end
      let data = await response.json();
      // console.log(data)
      // setshowMainContent(false);
      if(Object.keys(data).length === 0){
        toast.error("No Product Found!")
      }else{
        localStorage.setItem("search",JSON.stringify(data))
        router.push('/SearchItem')
        // setSearchItem(data)
        // console.log(searchItem)
      }
  }

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
      <LoadingBar
        color='#ff0000'
        progress={progress}
        waitingTime={500}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar setSearchKeyword={setSearchKeyword} getSearchData={getSearchData} searchKeyword={searchKeyword} cartLength={cartLength} logout={logout} user={user} key={key} />
      <Component
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        saveGlobalCart={saveGlobalCart}
        setGlobalcart={setGlobalcart}
        Globalcart={Globalcart}
        Total={Total}
        orders={orders}
        cartLength={cartLength}
        setCartLength={setCartLength}
        setOrders={setOrders}
        user={user}
        logout={logout}
        getSearchData={getSearchData}
        {...pageProps}
      />
      <Footer />
    </>
  );
}

export default MyApp;
