import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const MyOrders = ({
  setGlobalcart,
  saveGlobalCart,
  Globalcart,
  product,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  Total,
  user,
}) => {
  const router = useRouter();
  useEffect(() => {
    if (!user.value) {
      router.push("/");
    }
  }, [router.query]);

  return (
    <>
      <div class="container m-10">
        <div class="flex shadow-2xl rounded-3xl">
          <div class="w-full bg-white m-10 px-10 py-10 rounded-3xl">
            <div class="flex justify-center border-b pb-8">
              <h2 className="text-bold text-3xl">Your Orders</h2>
            </div>
            <div class="flex mt-10 mb-5">
              <h3 class="font-semibold text-gray-600 text-xs uppercase w-1/5">
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
              <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                Delivery Status
              </h3>
            </div>
            {Object.keys(Globalcart).length === 0 && (
              <div className="text-3xl">No Orders</div>
            )}

            {Object.keys(Globalcart).map((item) => {
              return (
                <Link href={"/order/" + item} passHref>
                  <a>
                    <div
                      key={item}
                      class="flex items-center hover:bg-gray-100 -mx-4 px-4 py-2 rounded-lg"
                    >
                      <div class="flex w-1/5">
                        <div class="ml-4">
                          1
                        </div>
                        <div class="flex flex-col justify-between ml-4  flex-grow">
                        </div>
                      </div>
                      <div class="flex justify-center w-1/5">
                        <input
                          class="mx-2 border text-center w-8"
                          type="text"
                          disabled={true}
                          value={Globalcart[item].product_qty}
                        />
                      </div>
                      <span class="text-center w-1/5 font-semibold text-sm">
                        {Globalcart[item].product_price}
                      </span>
                      <span class="text-center w-1/5 font-semibold text-sm">
                        Pending
                      </span>
                      <span class="text-center w-1/5 font-semibold text-sm">
                        Not Delivered
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
