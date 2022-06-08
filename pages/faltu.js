import React, { useState } from "react";

const Address = () => {
  const [address, setAddress] = useState({
    address: "",
    postal_code: "",
    city: "",
    state: "",
  });

  const onChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
    console.log(address);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/product/getAddressMakeOrder/", {
      method: "POST", // *POST is use bcoz here we are login the user
      headers: {
        "Content-Type": "application/json",
        "Authorization":"Bearer "+localStorage.getItem("token")
      },

      body: JSON.stringify({
        address: address.address,
        postal_code: address.postal_code,
        city: address.city,
        state: address.state,
      }),
    }); //request end
    const data = await response.json();
      console.log(data);

  };

  return (
    <>
      <div class="min-h-screen bg-gray-100 flex items-center justify-center">
        <div class="container max-w-screen-lg mx-auto">
          <div>
            <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div class="grid gap- gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div class="text-gray-600">
                  <p class="font-medium text-lg">Address Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div class="lg:col-span-2">
                  <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div class="md:col-span-5">
                      <label for="address">Address / Street</label>
                      <input
                        type="text"
                        id="address"
                        class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        name="address"
                        value={address.address}
                        onChange={onChange}
                        required
                      />
                    </div>

                    <div class="md:col-span-2">
                      <label for="city">City</label>
                      <input
                        class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        type="text"
                        name="city"
                        value={address.city}
                        onChange={onChange}
                        required
                      />
                    </div>

                    <div class="md:col-span-2">
                      <label for="State">State</label>
                      <input
                        class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        type="text"
                        name="state"
                        value={address.state}
                        onChange={onChange}
                        required
                      />
                    </div>

                    <div class="md:col-span-1">
                      <label for="zipcode">Zipcode</label>
                      <input
                        type="number"
                        name="postal_code"
                        value={address.postal_code}
                        onChange={onChange}
                        id="zipcode"
                        class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        required
                      />
                    </div>

                    <div class="md:col-span-5 text-right">
                      <div class="inline-flex items-end">
                        <button
                          onClick={handleSubmit}
                          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Address;
