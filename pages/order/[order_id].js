import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";

const Order = ({ user, context }) => {
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();
  const order_id = router.query.order_id;
  // console.log(order_id);
  const getData=async ()  => {
      const response = await fetch(
        `${process.env.backend}/product/getOrder/${order_id}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      ); //request end
      const res = await response.json();
      // console.log(res);
      setOrder(JSON.parse(JSON.stringify(res.data)));
      setTotal(res.amount);
      // console.log(order);
    }
  
  useEffect(() => {
    if (!user.value) {
      router.push("/");
    }
    console.log("hey i am [order_id].js useEffect")
    getData()
  }, [router.query]);
  const getMail = async () => {
    const response = await fetch(
      `${process.env.backend}/product/getOrderInvoiceMail/${order_id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    ); //request end
    const res = await response.json();
    // console.log(res);
    toast.success("Invoice has been sent to Email");
  };
  return (
    <>
      <section className="text-gray-600 body-font min-h-screen">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-10">
            <div className="flex justify-around">
              <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
                Order ID:- {order_id}
              </h1>
              <button className="flex text-white bg-indigo-500 border-0 px-5 py-3 focus:outline-none hover:bg-indigo-600 rounded">
                Track order
              </button>
            </div>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Your Order has been successfully placed.
            </p>
          </div>
          <div className="lg:w-2/3 w-full mx-auto overflow-auto">
            <table className="table-auto w-full text-left whitespace-no-wrap">
              <thead>
                <tr>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                    Item name
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Price
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Quantity
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Subtotal
                  </th>
                  <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
                </tr>
              </thead>
              <tbody>
                {order.map((i) => {
                  return (
                    <tr key={i}>
                      <td className="px-4 py-3 text-green-500">
                        <Link href={`/product/${i.product_id}`}>
                          <a>{i.product_title.toUpperCase()}</a>
                        </Link>
                      </td>
                      <td className="px-4 py-3">{i.product_price}</td>
                      <td className="px-4 py-3">{i.product_qty}</td>
                      <td className="px-4 py-3 text-lg text-gray-900">
                        + ${i.product_total}
                      </td>
                      <td className="w-10 text-center"> </td>
                    </tr>
                  );
                })}
                <tr>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3">Grand Total</td>
                  <td className="px-4 py-3 text-2xl text-indigo-600">= ${total}</td>
                  <td className="w-10 text-center"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-between pl-4 mt-4 lg:w-2/3 w-full mx-auto">
            <button
              onClick={getMail}
              className="text-indigo-500 flex items-center md:mb-2 lg:mb-0"
            >
              Get Invoice
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
</svg>
            </button>

            {/* <p className=" text-3xl inline-flex items-center md:mb-2 lg:mb-0">Grand total:- {total}</p> */}
            {/* <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Track order</button> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Order;
