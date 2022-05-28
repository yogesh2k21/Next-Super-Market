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
  user
}) => {
  const [promocode, setPromocode] = useState("");
  const [cartitem, setCartitem] = useState(0);
  let router = useRouter();
  let total_html=''


  useEffect(() => {
    console.log("hey i am Cart.js useEffect");
    if(!user.value){
      router.push("/");
    }
    // console.log(Total===0);
    setCartitem(Object.keys(Globalcart).length);
    if(Total==0){
      total_html=''
    }else{
      total_html=Total;
      console.log(total_html);
    }
    // try {
    //   if (!localStorage.getItem("token")) {
    //     router.push("/");
    // setGlobalcart(JSON.parse(localStorage.getItem("cart")));
    //   }
    // } catch (error) {
    //   console.log(error);
    //   localStorage.clear();
    // }

    // const token = localStorage.getItem("token");
    // if (token) {
    //   console.log("changing user value");
    //   setUser({ value: token });
    //   setKey(Math.random());
    // }
  }, [router.query, Math.random()]); //passing router.query is to Re-render the _app so that this useEffect runs, now it will re render on every URL change.

  const removeFromCart = (product_id, product_name) => {
    console.log(product_id);
    console.log(Globalcart);
    let newCart = Globalcart;
    delete newCart[product_id];
    console.log("removeFromCart");
    setGlobalcart(newCart);
    saveGlobalCart(newCart);
    toast.success(product_name + " is removed from Cart!");
    router.push("/Cart");
    // delete Globalcart[product_id];
    // Object.keys(Globalcart)
  };

  const checkPromoCode = () => {
    toast.error("Invalid Code");
  };
  return (
    <>
      <div class="bg-white m-5 rounded-3xl">
        <div class="container mx-auto">
          <div class="flex shadow-2xl rounded-3xl">
            <div class="w-full bg-white px-10 py-10 rounded-3xl">
              <div class="flex justify-between border-b pb-8">
                <div className="">
                <Link
                  href="/"
                  class="flex font-semibold text-indigo-600 text-sm"
                >
                  <a>{"<---"} Continue Shopping</a>
                </Link>
              </div>
                <div className="flex">
                <h1 class="font-semibold text-2xl">Your Cart has</h1>
                <h2 class="font-semibold text-2xl ml-2 text-indigo-600">
                  {cartitem} Items
                </h2>
                </div>
              </div>
              {/* <div className="my-5">
                <Link
                  href="/"
                  class="flex font-semibold text-indigo-600 text-sm"
                >
                  <a>{"<---"} Continue Shopping</a>
                </Link>
              </div> */}
              <div class="flex mt-10 mb-5">
                <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">
                  Product Details
                </h3>
                <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                  Quantity
                </h3>
                <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                  Price
                </h3>
                <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                  Overall Total
                </h3>
              </div>
              {!Object.keys(Globalcart).length && (
                <div className="text-3xl">Cart is empty</div>
              )}
              {Object.keys(Globalcart).map((item) => {
                return (
                  <div
                    key={item}
                    class="flex items-center hover:bg-gray-100 -mx-8 px-8 py-2 rounded-lg"
                  >
                    <div class="flex w-2/5">
                      <div class="w-20">
                        <Image
                          class="h-24 rounded-lg"
                          src={`http://localhost:8000/media/productImages/1.jpg`}
                          height={110}
                          width={100}
                          alt={Globalcart[item].product_name}
                        />
                      </div>
                      <div class="flex flex-col justify-between ml-4  flex-grow">
                        <span class="font-bold text-sm items-center">
                          {Globalcart[item].product_name}
                        </span>
                        <span class="text-red-500 text-xs">
                          {Globalcart[item].product_category}
                        </span>
                        <button
                          onClick={() => {
                            removeFromCart(item, Globalcart[item].product_name);
                          }}
                          class="flex font-semibold hover:text-red-500 text-gray-500 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div class="flex justify-center w-1/5">
                      <svg
                        onClick={() => {
                          decreaseQuantity(item);
                        }}
                        class="fill-current cursor-pointer text-gray-600 w-3"
                        viewBox="0 0 448 512"
                      >
                        <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>

                      <input
                        class="mx-2 border text-center w-8"
                        type="text"
                        disabled={true}
                        value={Globalcart[item].product_qty}
                      />

                      <svg
                        onClick={() => {
                          increaseQuantity(item);
                        }}
                        class="fill-current cursor-pointer text-gray-600 w-3"
                        viewBox="0 0 448 512"
                      >
                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                    </div>
                    <span class="text-center w-1/5 font-semibold text-sm">
                      {Globalcart[item].product_price}
                    </span>
                    <span class="text-center w-1/5 font-semibold text-sm">
                      {Math.ceil(Globalcart[item].product_subtotal)}
                    </span>
                  </div>
                );
              })}

              {/* <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                <div class="flex w-2/5">
                  <div class="w-20">
                    <img
                      class="h-24"
                      src="https://drive.google.com/uc?id=10ht6a9IR3K2i1j0rHofp9-Oubl1Chraw"
                      alt=""
                    />
                  </div>
                  <div class="flex flex-col justify-between ml-4 flex-grow">
                    <span class="font-bold text-sm">Xiaomi Mi 20000mAh</span>
                    <span class="text-red-500 text-xs">Xiaomi</span>
                    <a
                      href="#"
                      class="font-semibold hover:text-red-500 text-gray-500 text-xs"
                    >
                      Remove
                    </a>
                  </div>
                </div>
                <div class="flex justify-center w-1/5">
                  <svg
                    class="fill-current text-gray-600 w-3"
                    viewBox="0 0 448 512"
                  >
                    <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg>

                  <input
                    class="mx-2 border text-center w-8"
                    type="text"
                    value="1"
                  />

                  <svg
                    class="fill-current text-gray-600 w-3"
                    viewBox="0 0 448 512"
                  >
                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg>
                </div>
                <span class="text-center w-1/5 font-semibold text-sm">
                  $40.00
                </span>
                <span class="text-center w-1/5 font-semibold text-sm">
                  $40.00
                </span>
              </div> */}

              {/* <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                <div class="flex w-2/5">
                  <div class="w-20">
                    <img
                      class="h-24"
                      src="https://drive.google.com/uc?id=1vXhvO9HoljNolvAXLwtw_qX3WNZ0m75v"
                      alt=""
                    />
                  </div>
                  <div class="flex flex-col justify-between ml-4 flex-grow">
                    <span class="font-bold text-sm">Airpods</span>
                    <span class="text-red-500 text-xs">Apple</span>
                    <a
                      href="#"
                      class="font-semibold hover:text-red-500 text-gray-500 text-xs"
                    >
                      Remove
                    </a>
                  </div>
                </div>
                <div class="flex justify-center w-1/5">
                  <svg
                    class="fill-current text-gray-600 w-3"
                    viewBox="0 0 448 512"
                  >
                    <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg>
                  <input
                    class="mx-2 border text-center w-8"
                    type="text"
                    value="1"
                  />

                  <svg
                    class="fill-current text-gray-600 w-3"
                    viewBox="0 0 448 512"
                  >
                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg>
                </div>
                <span class="text-center w-1/5 font-semibold text-sm">
                  $150.00
                </span>
                <span class="text-center w-1/5 font-semibold text-sm">
                  $150.00
                </span>
              </div> */}

              {/* <Link href="/" class="flex font-semibold text-indigo-600 text-sm mt-10">Continue Shopping</Link> */}
              <div className="md:flex justify-around  py-8 my-4 border-t border-gray-200">

                <div className="md:pl-3 md:w-3/4 w-full">
                    {<button disabled={Total===0?true:false} onClick={clearCart} className="flex text-white bg-red-500 border-0 py-2 px-6 m-5 focus:outline-none hover:bg-red-600 rounded">Clear Cart</button>}
                </div>
                <div className="md:pl-3 md:w-3/4 w-full">
                    {<button disabled={Total===0?true:false} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 m-5 focus:outline-none hover:bg-indigo-600 rounded">$ {Total===0?'0':Math.ceil(Total)} Checkout</button>}
                </div>
              </div>
            </div>

            {/* <div id="summary" class="w-1/4 px-8 py-10">
              <h1 class="font-semibold text-2xl border-b pb-8">
                Order Summary
              </h1>
              <div class="flex justify-between mt-10 mb-5">
                <span class="font-semibold text-sm uppercase">Items 3</span>
                <span class="font-semibold text-sm">590$</span>
              </div>
              <div>
                <label class="font-medium inline-block mb-3 text-sm uppercase">
                  Shipping
                </label>
                <select class="block p-2 text-gray-600 w-full text-sm">
                  <option>Standard shipping - ₹150.00</option>
                </select>
              </div>
              <div class="py-10">
                <label
                  for="promo"
                  class="font-semibold inline-block mb-3 text-sm uppercase"
                >
                  Promo Code
                </label>
                <input
                  type="text"
                  value={promocode}
                  id="promo"
                  placeholder="Enter your code"
                  class="p-2 text-sm w-full"
                />
              </div>
              <button
                onClick={checkPromoCode}
                class="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase"
              >
                Apply
              </button>
              <div class="border-t mt-8">
                <div class="flex font-semibold justify-between py-6 text-sm uppercase">
                  <span>Total cost</span>
                  <span>$600</span>
                </div>
                <button class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                  Checkout
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
