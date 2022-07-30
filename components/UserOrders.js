import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";

const UserOrders = ({orders}) => {
  // const [orders, setOrders] = useState({})
  // const router = useRouter();

  // const getData=useCallback(async()=>{
  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_MY_BACK_HOST}/product/getMyOrders/`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + localStorage.getItem("token"),
  //       },
  //     }
  //   ); //request end
  //   const res = await response.json();
  //   console.log(res);
  //   localStorage.setItem("orders", JSON.stringify(res.data)); //saving this object in localstorage

  //   setOrders(JSON.parse(localStorage.getItem("orders"))); //setting stateVariable

  // },[setOrders])
  // useEffect( () => {
  //   if (!user.value) {
  //     router.push("/");
  //   }
  //   // if(localStorage.getItem("orders")){
  //   try {
  //     // const response = await fetch(
  //     //   `${process.env.NEXT_PUBLIC_MY_BACK_HOST}/product/getMyOrders/`,
  //     //   {
  //     //     method: "GET",
  //     //     headers: {
  //     //       "Content-Type": "application/json",
  //     //       Authorization: "Bearer " + localStorage.getItem("token"),
  //     //     },
  //     //   }
  //     // ); //request end
  //     // const res = await response.json();
  //     // console.log(res);
  //     // localStorage.setItem("orders", JSON.stringify(res.data)); //saving this object in localstorage

  //     // setOrders(JSON.parse(localStorage.getItem("orders"))); //setting stateVariable
  //     console.log(orders);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   // }
  //   getData();
  // }, [router.query]);

  return (
    <>
      <div className="min-h-screen flex justify-center">
        <div className="flex shadow-2xl rounded-2xl m-10 w-full">
          <div className="w-full bg-white m-10  rounded-3xl">
            <div className="flex justify-center border-b pb-8">
              <h2 className="text-bold text-3xl">Your Orders</h2>
            </div>
            {Object.keys(orders).length === 0 || (
              <div className="flex mt-10 mb-5">
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/4">
                  Order ID
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/4">
                  Product Quantity
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/4">
                  Total
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/4">
                  Order Status
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/4">
                  Order Date
                </h3>
              </div>
            )}
            {Object.keys(orders).length === 0 && (
              <div className="text-3xl flex justify-center py-16">
                <Image
                  className="h-24 rounded-lg"
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
                  <Link key={item} href={"/order/" + item} passHref>
                    <a>
                      <div
                        className="flex items-center hover:bg-gray-100 -mx-4 px-4 py-2 rounded-lg"
                      >
                        <div className="flex w-1/4">
                          <div className="ml-4">{item}</div>
                          <div className="flex flex-col justify-between ml-4  flex-grow"></div>
                        </div>
                        <div className="flex justify-center w-1/4">
                          <input
                            className="mx-2 border text-center w-8"
                            type="text"
                            disabled={true}
                            value={orders[item].products}
                          />
                        </div>
                        <span className="text-center w-1/4 font-semibold text-sm">
                          ${orders[item].amount}
                        </span>
                        <span className="text-center w-1/4 font-semibold text-sm">
                          {orders[item].ordered ? "Successfull" : "Pending"}
                        </span>
                        <span className="text-center w-1/4 font-semibold text-sm">
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

export default UserOrders;
