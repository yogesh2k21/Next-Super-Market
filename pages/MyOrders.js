import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react'
import UserOrders from '../components/UserOrders'

const MyOrders = ({user, setOrders, orders}) => {
  const router = useRouter();

  // getData();
  useEffect( () => {
    console.log("i am MyOrder.js useEffect");
    if (!user.value) {
      router.push("/");
    }
    const getData=async()=>{
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
      // console.log(res);
      localStorage.setItem("orders", JSON.stringify(res.data)); //saving this object in localstorage
  
      setOrders(JSON.parse(localStorage.getItem("orders"))); //setting stateVariable
  
    };
    // if(localStorage.getItem("orders")){
    try {
      // const response = await fetch(
      //   `${process.env.NEXT_PUBLIC_MY_BACK_HOST}/product/getMyOrders/`,
      //   {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: "Bearer " + localStorage.getItem("token"),
      //     },
      //   }
      // ); //request end
      // const res = await response.json();
      // console.log(res);
      // localStorage.setItem("orders", JSON.stringify(res.data)); //saving this object in localstorage

      // setOrders(JSON.parse(localStorage.getItem("orders"))); //setting stateVariable
      // console.log(orders);
    } catch (error) {
      console.log(error);
    }
    // }
    getData();
  }, [router.query]);
  return (
    <UserOrders orders={orders}/>
  )
}

export default MyOrders