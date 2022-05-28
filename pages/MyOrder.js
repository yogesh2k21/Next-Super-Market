import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const MyOrder = ({setGlobalcart,
    saveGlobalCart,
    Globalcart,
    product,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    Total,
    user}) => {
  return (
    <>
        <div class="container mx-auto">
          <div class="flex shadow-2xl rounded-3xl">
            <div class="w-full bg-white px-10 py-10 rounded-3xl">
              <div class="flex justify-center border-b pb-8">
                {/* <div className="">
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
                     Items
                  </h2>
                </div> */}
                <h2 className='text-bold text-3xl'>Your Orders</h2>
              </div>
              <div class="flex mt-10 mb-5">
                <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">
                Order ID
                </h3>
                <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                  Product Quantity
                </h3>
                <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                  Total
                </h3>
                <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                  Order Status
                </h3>
              </div>
              {/* {Object.keys(Globalcart).length===0 && (
                <div className="text-3xl">Cart is empty</div>
              )} */}

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
                  {
                    <button
                      disabled={Total === 0 ? true : false}
                      className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 m-5 focus:outline-none hover:bg-indigo-600 rounded"
                    >
                      $ {Total === 0 ? "0" : Math.ceil(Total)} Checkout
                    </button>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default MyOrder