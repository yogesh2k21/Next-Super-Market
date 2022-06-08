import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Checkout = ({ Globalcart,Total }) => {
  let router = useRouter();
  useEffect(() => {
      console.log('hey i m test.js useeffect');
    if(Total === 0){
        router.push('/Cart')
    }
    
  }, [router.query]);

  const [address, setAddress] = useState({
    address: "",
    postal_code: "",
    city: "",
    state: "",
    full_name: "",
    phone: "",
  });

  const onChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
    console.log(address);
  };

  const handleSubmit = async (e) => {
    if (address.full_name === "") {
      toast.error("Enter Full name");
      return;
    }
    if (address.phone === "") {
      toast.error("Enter Phone");
      return;
    }
    if (address.address === "") {
      toast.error("Enter Address");
      return;
    }
    if (address.city === "") {
      toast.error("Enter City");
      return;
    }
    if (address.state === "") {
      toast.error("Enter State");
      return;
    }
    if (address.postal_code === "") {
      toast.error("Enter Pincode");
      return;
    }
    e.preventDefault();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MY_BACK_HOST}/product/getAddressMakeOrder/`,
      {
        method: "POST", // *POST is use bcoz here we are login the user
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },

        body: JSON.stringify({
          address: address.address,
          postal_code: address.postal_code,
          city: address.city,
          state: address.state,
          full_name: address.full_name,
          phone: address.phone,
        }),
      }
    ); //request end
    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <section className="">
        <div class="relative mx-auto ">
          <div class="grid grid-cols-1 md:grid-cols-2 min-h-screen">
            <div class="py-12 bg-gray-100 md:py-24">
              <div class="max-w-lg px-4 mx-auto lg:px-8">
                <div class="flex items-center">
                  <h2 class="text-3xl">Order Summary</h2>
                </div>

                {
                  <div class="mt-8">
                    <p class="text-2xl font-medium tracking-tight">${Total}</p>
                    <p class="mt-1 text-sm text-gray-500">
                      For the purchase of
                    </p>
                  </div>
                }

                <div class="mt-12">
                  <div class="flow-root py-3 px-4 h-max">
                    <ul class="-my-4 divide-y divide-gray-200">
                      {Object.keys(Globalcart).map((item) => {
                        return (
                          <li
                            key={item}
                            class="flex items-center justify-between py-4"
                          >
                            <div class="flex items-start">
                              <img
                                class="flex-shrink-0 object-cover w-16 h-16 rounded-lg"
                                src={`${process.env.NEXT_PUBLIC_MY_BACK_HOST}${Globalcart[item].product_image}`}
                                alt=""
                              />

                              <div class="ml-4">
                                <p class="text-sm">{Globalcart[item].product_name.toUpperCase()}</p>

                                <dl class="mt-1 space-y-1 text-xs text-gray-500">
                                  <div>
                                    <dt class="inline">Category:</dt>
                                    <dd class="inline"> {Globalcart[item].product_category}</dd>
                                  </div>

                                  <div>
                                    <dt class="inline">Quantity:</dt>
                                    <dd class="inline"> {Globalcart[item].product_qty}</dd>
                                  </div>
                                </dl>
                              </div>
                            </div>

                            <div>
                              <p class="text-sm">
                                ${Math.ceil(Globalcart[item].product_price)}
                                <small class="text-gray-500">x{Globalcart[item].product_qty}</small>
                                =<span className="text-base text-indigo-500">{Math.ceil(Globalcart[item].product_subtotal)}</span>
                              </p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="py-12 bg-white md:py-24">
              <div class="max-w-lg px-4 mx-auto lg:px-8">
                <div class="grid grid-cols-6 gap-4">
                  <div class="col-span-3">
                    <label
                      class="block mb-1 text-sm text-gray-600"
                      for="full_name"
                    >
                      Full Name
                    </label>

                    <input
                      class="rounded-lg shadow-sm border-gray-200 w-full text-sm p-2.5"
                      type="text"
                      name="full_name"
                      value={address.full_name}
                      onChange={onChange}
                    />
                  </div>

                  <div class="col-span-3">
                    <label class="block mb-1 text-sm text-gray-600" for="phone">
                      Phone
                    </label>

                    <input
                      class="rounded-lg shadow-sm border-gray-200 w-full text-sm p-2.5"
                      type="tel"
                      name="phone"
                      value={address.phone}
                      onChange={onChange}
                    />
                  </div>

                  <div class="col-span-6">
                    <label
                      class="block mb-1 text-sm text-gray-600"
                      for="address"
                    >
                      Address
                    </label>

                    <input
                      class="rounded-lg shadow-sm border-gray-200 w-full text-sm p-2.5"
                      type="text"
                      name="address"
                      value={address.address}
                      onChange={onChange}
                    />
                  </div>

                  <div class="col-span-2">
                    <label class="block mb-1 text-sm text-gray-600" for="city">
                      City
                    </label>

                    <input
                      class="rounded-lg shadow-sm border-gray-200 w-full text-sm p-2.5"
                      type="text"
                      name="city"
                      value={address.city}
                      onChange={onChange}
                    />
                  </div>

                  <div class="col-span-2">
                    <label class="block mb-1 text-sm text-gray-600" for="email">
                      State
                    </label>

                    <input
                      class="rounded-lg shadow-sm border-gray-200 w-full text-sm p-2.5"
                      type="text"
                      name="state"
                      value={address.state}
                      onChange={onChange}
                    />
                  </div>

                  <div class="col-span-2">
                    <label
                      class="block mb-1 text-sm text-gray-600"
                      for="postal_code"
                    >
                      Pincode
                    </label>

                    <input
                      class="rounded-lg shadow-sm border-gray-200 w-full text-sm p-2.5"
                      type="number"
                      name="postal_code"
                      value={address.postal_code}
                      onChange={onChange}
                    />
                  </div>

                  <div class="col-span-6">
                    <button
                      onClick={handleSubmit}
                      class="rounded-lg mt-6 bg-indigo-500 text-sm p-2.5 text-white w-full block hover:bg-indigo-600"
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
