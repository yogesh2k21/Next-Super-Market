import React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Explore = ({ category }) => {
  const [items, setitems] = useState(category);
  return (
    <>
      <section class="text-gray-600 body-font">
        <div class="container px-10 py-10 mx-auto">
          <div class="flex flex-wrap -m-4">
            {items.map((item, i) => {
              return (
                <Link href={"category/" + item.id} passHref>
                  <div class="xl:w-1/3 md:w-1/2 p-4">
                      <a href=''>
                        <div key={i} class="border border-gray-200 p-6 rounded-lg">
                            <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                                <Image src={item.url || 'https://uxwing.com/wp-content/themes/uxwing/download/08-computers-mobile-hardware/mobile-phone.svg'} height={25} width={25} alt="ss" />
                            </div>
                        <h2 class="text-lg text-gray-900 font-medium title-font mb-2">{item.title}</h2>
                        <p class="leading-relaxed text-base">{item.description}</p>
                        </div>
                      </a>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  let data = await fetch(`http://127.0.0.1:8000/product/category`);
  let category = await data.json();
  return {
    props: { category }, // will be passed to the page component as props
  };
}

export default Explore;
