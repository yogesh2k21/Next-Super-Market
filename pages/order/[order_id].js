import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';

const Order = ({user,context}) => {
  const [order, setOrder] = useState({})
  const router = useRouter();
  const order_id=router.query.order_id
  // console.log(order_id);
      useEffect(async () => {
        if (!user.value) {
          router.push("/");
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_MY_BACK_HOST}/product/getOrder/${order_id}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization":"Bearer "+localStorage.getItem("token")
          }
        }); //request end
        const res = await response.json();
        console.log(res);
        setOrder(JSON.parse(JSON.stringify(res.data)))
        console.log(order);
      }, [router.query])
  return (
    <>
      <section class="text-gray-600 body-font min-h-screen">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-col text-center w-full mb-10">
      <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Order Items</h1>
      <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Your Order has been successfully placed.</p>
    </div>
    <div class="lg:w-2/3 w-full mx-auto overflow-auto">
      <table class="table-auto w-full text-left whitespace-no-wrap">
        <thead>
          <tr>
            <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Item name</th>
            <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Price</th>
            <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Quantity</th>
            <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Subtotal</th>
            <th class="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(order).map((i)=>{
            return (
              <tr>
              <td class="px-4 py-3"><Link href={`/product/${order[i].product_id}`}><a>{order[i].product_title}</a></Link></td>
              <td class="px-4 py-3">{order[i].product_price}</td>
              <td class="px-4 py-3">{order[i].product_qty}</td>
              <td class="px-4 py-3 text-lg text-gray-900">${order[i].product_total}</td>
              <td class="w-10 text-center">
              </td>
            </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    <div class="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
      <a href="#" class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Download invoice
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </a>
      <button class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Track order</button>
    </div>
  </div>
</section>
    </>
  );
};

export default Order;
