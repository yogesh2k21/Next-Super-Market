import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Banner from "../components/Banner";
import Statistic from "./Statistic";
const Home = (props) => {
const [products, setproducts] = useState(props.product);
return (
<div className="">

  <Head>
    <title>Next Super Market</title>
    <meta name="description" content="Generated by create next app" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
  <main>
    <Banner banners={props.banner} />
    <div className="bg-gray-100 flex flex-col justify-center py-10">
      <div className="relative m-3 flex flex-wrap mx-auto justify-center">
        <div className="max-w-2xl sm:py-2 sm:px-6 lg:max-w-7xl lg:px-1">
          <div className="mt- grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product, i) => {
              return (
                <Link key={i} href={"/product/" + product.id} passHref>
            <a>
              <div className="group relative">
                <div
                  className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <Image src={`${process.env.NEXT_PUBLIC_MY_BACK_HOST}${product.image}`} width={350} height={450} alt={product.description} />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                        <span aria-hidden="true" className="absolute text-xl inset-0" />
                        {product.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.category}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ${product.price}
                  </p>
                </div>
              </div>
            </a>
            </Link>
            )})}
          </div>
        </div>
      </div>
    </div>
    <Statistic />
    <hr />
  </main>
</div>
);
};

export async function getServerSideProps(context) {
let products = await fetch(`${process.env.NEXT_PUBLIC_MY_BACK_HOST}`); //fetching products
let product = await products.json();
let banners = await fetch(`${process.env.NEXT_PUBLIC_MY_BACK_HOST}/banner`); //fetching banners
let banner = await banners.json();
return {
props: { product, banner }, // will be passed to the page component as props
};
}

export default Home;