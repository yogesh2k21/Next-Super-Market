import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const SearchItem = ({getSearchData}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    try {
      setData(JSON.parse(localStorage.getItem("search")));
      console.log("data",data)
    } catch (error) {
      console.log(error)
    }
  }, [getSearchData])
  
  return (
    <>
    <div className="bg-gray-100 flex flex-col justify-center py-10">
      <div className="relative m-3 flex flex-wrap mx-auto justify-center">
        <div className="max-w-2xl sm:py-2 sm:px-6 lg:max-w-7xl lg:px-1">
          <div className="mt- grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {data && data.map((product) => {
              return (
                <Link key={product} href={"/product/" + product.id} passHref>
            <a>
              <div className="group relative">
                <div
                  className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <Image src={`${process.env.backend}/media/${product.image}`} width={350} height={450} />
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
    </>
  )
}

export default SearchItem