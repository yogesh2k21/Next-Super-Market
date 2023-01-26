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
  cartLength,
  setCartLength
  // cartitems,
  // logout,
}) => {
  
  let router = useRouter();
  
  useEffect(() => {
    console.log("hey i am Cart.js useEffect");
    const getData = async () => {
      const data = await fetch(
        `${process.env.backend}/product/getCart/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      ); //request end
      const product = await data.json();
      console.log(product);
      localStorage.setItem("cart", JSON.stringify(product.items));
      saveGlobalCart(product.items);
      setCartLength(Globalcart.length);
    };
    if (!user.value) {
      router.push("/");
    }
    getData();
  }, [router.query,product,router,user.value]); //passing router.query is to Re-render the _app so that this useEffect runs, now it will re render on every URL change.


  const removeFromCart = async (product_id, product_name) => {
    const response = await fetch(
      `${process.env.backend}/product/deleteFromCart/` +
        product_id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    ); //request end
    let newCart = Globalcart;
    newCart = newCart.filter(i => { return i._id != product_id })
    setCartLength(newCart.length)
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
                    {cartLength} Items
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
              {!Globalcart.length && (
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
              {Globalcart.length && Globalcart.map((item) => {
                return (
                  <div
                    key={item._id}
                    className="flex items-center hover:bg-gray-100 -mx-8 px-8 py-2 rounded-lg"
                  >
                    <div className="flex w-2/5">
                      <div className="w-20">
                        <Image
                          className="h-24 rounded-lg"
                          src={`${process.env.backend}${item.product_image}`}
                          height={100}
                          width={100}
                          alt={item.product_name}
                        />
                      </div>

                      <div className="flex flex-col justify-between ml-4 flex-grow">
                        <span className="font-bold text-sm items-center">
                          <Link href={`/product/${item._id}/`}>
                            <a>{item.product_name.toUpperCase()}</a>
                          </Link>
                        </span>
                        <span className="text-red-500 text-xs">
                          {item.product_category}
                        </span>
                        <button
                          onClick={() => {
                            removeFromCart(item._id, item.product_name);
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
                          decreaseQuantity(item._id,item);
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
                        value={item.product_qty}
                      />

                      <svg
                        onClick={() => {
                          increaseQuantity(item._id);
                        }}
                        className="fill-current cursor-pointer text-gray-600 w-3"
                        viewBox="0 0 448 512"
                      >
                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                    </div>
                    <span className="text-center w-1/5 font-semibold text-sm">
                      {item.product_price}
                    </span>
                    <span className="text-center w-1/5 font-semibold text-sm">
                      {Math.ceil(item.product_subtotal)}
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

export default Cart;
