import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const MyOrders = ({ user, setOrders, orders }) => {
  // const [orders, setOrders] = useState({})
  const router = useRouter();
  useEffect(async () => {
    if (!user.value) {
      router.push("/");
    }
    // if(localStorage.getItem("orders")){
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MY_BACK_HOST}/product/getMyOrders/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      ); //request end
      const res = await response.json();
      console.log(res);
      localStorage.setItem("orders", JSON.stringify(res.data)); //saving this object in localstorage

      setOrders(JSON.parse(localStorage.getItem("orders"))); //setting stateVariable
      console.log(orders);
    } catch (error) {
      console.log(error);
    }
    // }
  }, [router.query]);

  return (
    <>
      <div class="min-h-screen flex justify-center">
        <div class="flex shadow-2xl rounded-2xl m-10 w-full">
          <div class="w-full bg-white m-10  rounded-3xl">
            <div class="flex justify-center border-b pb-8">
              <h2 className="text-bold text-3xl">Your Orders</h2>
            </div>
            {Object.keys(orders).length === 0 || (
              <div class="flex mt-10 mb-5">
                <h3 class="font-semibold text-gray-600 text-xs uppercase w-1/4">
                  Order ID
                </h3>
                <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/4">
                  Product Quantity
                </h3>
                <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/4">
                  Total
                </h3>
                <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/4">
                  Order Status
                </h3>
                <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/4">
                  Order Date
                </h3>
              </div>
            )}
            {Object.keys(orders).length === 0 && (
              <div className="text-3xl flex justify-center py-16">
                <Image
                  class="h-24 rounded-lg"
                  src="/no-order.svg"
                  height={350}
                  width={500}
                  alt={"Empty Cart"}
                />
              </div>
            )}

            {Object.keys(orders)
              .slice(0)
              .reverse()
              .map((item) => {
                //slice(0).reverse() is used to print the array in reverese order because in localstorage it store keys in sorted ordered.
                return (
                  <Link href={"/order/" + item} passHref>
                    <a>
                      <div
                        key={item}
                        class="flex items-center hover:bg-gray-100 -mx-4 px-4 py-2 rounded-lg"
                      >
                        <div class="flex w-1/4">
                          <div class="ml-4">{item}</div>
                          <div class="flex flex-col justify-between ml-4  flex-grow"></div>
                        </div>
                        <div class="flex justify-center w-1/4">
                          <input
                            class="mx-2 border text-center w-8"
                            type="text"
                            disabled={true}
                            value={orders[item].products}
                          />
                        </div>
                        <span class="text-center w-1/4 font-semibold text-sm">
                          ${orders[item].amount}
                        </span>
                        <span class="text-center w-1/4 font-semibold text-sm">
                          {orders[item].ordered ? "Successfull" : "Pending"}
                        </span>
                        <span class="text-center w-1/4 font-semibold text-sm">
                          {orders[item].date}
                        </span>
                      </div>
                    </a>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOrders;
