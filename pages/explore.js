import React from "react";
import { useState } from "react";
import Link from "next/link";

const Explore = ({ category }) => {
  const [items, setitems] = useState(category);
  console.log(items);
  return (
    <>
    <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-wrap -m-4">
      {items.map((item, i) => {
        return (
          <Link  href={"category/" + item.id} passHref>
              <div key={i} class="lg:w-1/3 sm:w-1/2 p-4">
                        <div class="flex relative">
                        <img alt="gallery" class="absolute inset-0 w-full h-full object-cover object-center" src="https://media.istockphoto.com/photos/healthy-rainbow-colored-fruits-and-vegetables-smoothies-isolated-on-picture-id1304936721?b=1&k=20&m=1304936721&s=170667a&w=0&h=DiGoVD2R75gCK-jJayc89NFxd3HHiKLba46Bmr5Ud_Y="/>
                        <div class="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                            <h2 class="tracking-widest text-lg title-font font-medium text-indigo-500 mb-1">{item.title}</h2>
                            <p class="leading-relaxed">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
                        </div>
                        </div>
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
  console.log(category);
  return {
    props: { category }, // will be passed to the page component as props
  };
}

export default Explore;
