import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";

const Cart = ({
  setGlobalcart,
  saveGlobalCart,
  Globalcart,
  product,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  Total,
  user,
  // dataBaseCart,
  // cartitems,
  // logout,
}) => {
  // const [promocode, setPromocode] = useState("");
  const [cartitem, setCartitem] = useState(0);
  let router = useRouter();
  // let total_html = "";

  // console.log(cartitems + " cartitems");
  // console.log("cart.js");
  // console.log(Globalcart);
  // const initialCart=async()=>{
  //   const data = await fetch("http://127.0.0.1:8000/product/getCart/", {
  //     method: "GET",
  //     headers: {
  //     "Content-Type": "application/json",
  //     "Authorization":"Bearer "+localStorage.getItem("token")
  //   }
  // }); //request end
  // const product = await data.json();
  // console.log(product);
  // // localStorage.removeItem("cart")
  // localStorage.setItem("cart",JSON.stringify(product))
  // JSON.parse(localStorage.getItem("cart"))
  // }

  // useCallback(
  //   () => {
    
  //   },
  //   [second],
  // )
  //eslint-disable-line
  useEffect(() => {
    console.log("hey i am Cart.js useEffect");
    const getData = async () => {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_MY_BACK_HOST}/product/getCart/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      ); //request end
      const product = await data.json();
      localStorage.setItem("cart", JSON.stringify(product));
      saveGlobalCart(product);
      setCartitem(Object.keys(Globalcart).length);
    };
    if (!user.value) {
      router.push("/");
    }
  
  //eslint-disable-line
    // getData();
    // try {
      // const data = await fetch(`${process.env.NEXT_PUBLIC_MY_BACK_HOST}/product/getCart/`, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Authorization":"Bearer "+localStorage.getItem("token")
      //   }
      // }); //request end
    // } catch (error) {
    //   console.log(error);
    // }
    // const product = await data.json();
    // console.log(product);
    // if(product["code"]==true){

    // localStorage.removeItem("cart")
    // localStorage.setItem("cart", JSON.stringify(product));
    // setGlobalcart(JSON.parse(localStorage.getItem("cart")))
    // saveGlobalCart(product);
    // JSON.parse(localStorage.getItem("cart"))
    // localStorage.removeItem("cart")
    // localStorage.setItem("cart",JSON.stringify(Globalcart))
    //   const data = await fetch("http://127.0.0.1:8000/product/getCart/", {
    //     method: "GET",
    //     headers: {
    //     "Content-Type": "application/json",
    //     "Authorization":"Bearer "+localStorage.getItem("token")
    //   }
    // }); //request end
    // const product = await data.json();
    // console.log(product);
    // // localStorage.removeItem("cart")
    // // setGlobalcart(localStorage.getItem("cart"))
    // localStorage.setItem("cart",JSON.stringify(product))
    // setGlobalcart(JSON.parse(localStorage.getItem("cart")))
    // console.log(Total===0);
    // setCartitem(Object.keys(Globalcart).length);
    // if (Total == 0) {
    //   total_html = "";
    // } else {
    //   total_html = Total;
    //   console.log(total_html);
    // }
    // let a="dasd"
    // a.upp
    // }else{

    //   localStorage.clear()
    //   toast.error('Session timeout, Please Login Again!')
    //   setTimeout(() => {

    //     logout()
    //   }, 1);
    // console.log('Session timeout, Please Login Again!');
    // router.push('/Login')
    // }
    // initialCart(JSON.parse(localStorage.getItem("cart")))
    getData();
  }, [router.query,product,router,user.value]); //passing router.query is to Re-render the _app so that this useEffect runs, now it will re render on every URL change.
// useEffect(() => {
//   first

//   return () => {
//     second
//   }
// }, [third])

  // const initialCart=async()=>{
  //   const data = await fetch("http://127.0.0.1:8000/product/getCart/", {
  //     method: "GET",
  //     headers: {
  //     "Content-Type": "application/json",
  //     "Authorization":"Bearer "+localStorage.getItem("token")
  //   }
  // }); //request end
  // const product = await data.json();
  // console.log(product);
  // localStorage.removeItem("cart")
  // localStorage.setItem("cart",JSON.stringify(product))
  // }

  // initialCart()

  const removeFromCart = async (product_id, product_name) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MY_BACK_HOST}/product/deleteFromCart/` +
        product_id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    ); //request end
    // console.log(product_id);
    // console.log(Globalcart);
    let newCart = Globalcart;
    delete newCart[product_id];
    // console.log("removeFromCart");
    setGlobalcart(newCart);
    saveGlobalCart(newCart);
    toast.success(product_name + " is removed from Cart!");
  };

  const checkPromoCode = () => {
    toast.error("Invalid Code");
  };
  return (
    <>
      <div className="bg-white m-5 rounded-3xl min-h-[86vh]">
        <div className="">
          <div className="flex shadow-2xl rounded-3xl">
            <div className="w-full bg-white px-10 py-10 rounded-3xl">
              <div className="flex justify-between border-b pb-8">
                <div className="">
                  <Link
                    href="/"
                    className="flex font-semibold text-indigo-600 text-sm"
                    passHref
                  >
                    <a className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                      </svg>{" "}
                      Continue Shopping
                    </a>
                  </Link>
                </div>
                <div className="flex">
                  <h1 className="font-semibold text-2xl">Your Cart has</h1>
                  <h2 className="font-semibold text-2xl ml-2 text-indigo-600">
                    {cartitem} Items
                  </h2>
                </div>
              </div>
              {Total != 0 && (
                <div className="flex mt-10 mb-5">
                  <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                    Product Details
                  </h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                    Quantity
                  </h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                    Price
                  </h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                    Overall Total
                  </h3>
                </div>
              )}
              {!Object.keys(Globalcart).length && (
                <div className="text-3xl flex justify-center py-16">
                  <Image
                    className="h-24 rounded-lg"
                    src="/emptyCart.png"
                    height={350}
                    width={500}
                    alt={"Empty Cart"}
                  />
                </div>
              )}
              {Object.keys(Globalcart).map((item) => {
                return (
                  <div
                    key={item}
                    className="flex items-center hover:bg-gray-100 -mx-8 px-8 py-2 rounded-lg"
                  >
                    <div className="flex w-2/5">
                      <div className="w-20">
                        <Image
                          className="h-24 rounded-lg"
                          src={`${process.env.NEXT_PUBLIC_MY_BACK_HOST}${Globalcart[item].product_image}`}
                          height={100}
                          width={100}
                          alt={Globalcart[item].product_name}
                        />
                      </div>

                      <div className="flex flex-col justify-between ml-4 flex-grow">
                        <span className="font-bold text-sm items-center">
                          <Link href={`/product/${item}/`}>
                            <a>{Globalcart[item].product_name.toUpperCase()}</a>
                          </Link>
                        </span>
                        <span className="text-red-500 text-xs">
                          {Globalcart[item].product_category}
                        </span>
                        <button
                          onClick={() => {
                            removeFromCart(item, Globalcart[item].product_name);
                          }}
                          className="flex w-5 font-semibold hover:text-red-500 text-gray-500 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-center w-1/5">
                      <svg
                        onClick={() => {
                          decreaseQuantity(item);
                        }}
                        className="fill-current cursor-pointer text-gray-600 w-3"
                        viewBox="0 0 448 512"
                      >
                        <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>

                      <input
                        className="mx-2 border text-center w-8"
                        type="text"
                        disabled={true}
                        value={Globalcart[item].product_qty}
                      />

                      <svg
                        onClick={() => {
                          increaseQuantity(item);
                        }}
                        className="fill-current cursor-pointer text-gray-600 w-3"
                        viewBox="0 0 448 512"
                      >
                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                    </div>
                    <span className="text-center w-1/5 font-semibold text-sm">
                      {Globalcart[item].product_price}
                    </span>
                    <span className="text-center w-1/5 font-semibold text-sm">
                      {Math.ceil(Globalcart[item].product_subtotal)}
                    </span>
                  </div>
                );
              })}
              {Total != 0 && (
                <div className="md:flex justify-around  py-8 my-4 border-t border-gray-200">
                  <div className="md:pl-3 md:w-3/4 w-full">
                    {
                      <button
                        disabled={Total === 0 ? true : false}
                        onClick={clearCart}
                        className="flex text-white bg-red-500 border-0 py-2 px-6 m-5 focus:outline-none hover:bg-red-600 rounded"
                      >
                        Clear Cart
                      </button>
                    }
                  </div>
                  <div className="md:pl-3 md:w-3/4 w-full">
                    <Link href={"/Checkout"} passHref>
                      <button
                        disabled={Total === 0 ? true : false}
                        className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 m-5 focus:outline-none hover:bg-indigo-600 rounded"
                      >
                        $ {Total === 0 ? "0d" : Math.ceil(Total)} Checkout
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// export async function getStaticProps() {
// Call an external API endpoint to get posts
// const res = await fetch('http://127.0.0.1:8000/product/getCart/',{
//   method: "GET",
//     headers: {
//     "Content-Type": "application/json",
//     "Authorization":"Bearer "+localStorage.getItem("token")
// })
// const data = await fetch("http://127.0.0.1:8000/product/getCart/", {
//     method: "GET",
//     headers: {
//     "Content-Type": "application/json",
//     "Authorization":"Bearer "+localStorage.getItem("token")
//     }}); //request end
// const cartitems = await data.json()

// By returning { props: { posts } }, the Blog component
// will receive `posts` as a prop at build time
//   return {
//     props: {
//       cartitems,
//     },
//   }
// }

// export async function getServerSideProps({req}) {
//   console.log(req.headers);
//   const data = await fetch("http://127.0.0.1:8000/product/getCart", {
//       method: "GET",
//       headers: {
//       "Content-Type": "application/json",
//       "Authorization":"Bearer "+localStorage.getItem("token")
//     }
//   }); //request end
//   // let data = await fetch(`http://127.0.0.1:8000/product/getCart`);
//   let dataBaseCart = await data.json();
//   return {
//   props: { dataBaseCart }, // will be passed to the page component as props
//   };
// }

export default Cart;
