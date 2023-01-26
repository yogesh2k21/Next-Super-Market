import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const MyReview = () => {
    const [reviews, setReviews] = useState([])
    const capFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    useEffect(() => {
        const getReviews = async () => {
            const response = await fetch(
                `${process.env.backend}/product/getMyreviews/`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            ); //request end
    
            const data = await response.json();
            setReviews(data)
        }
        getReviews()
    }, [])

    return (
        <>
            <section className=" bg-gray-100">
                <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
                    <h2 className="text-xl text-center font-bold sm:text-2xl">Your Reviews</h2>
                    <div className="pt-6 pb-12 ">
                        <div id="card" className="">
                            <div className="grid bg grid-cols-1 mt-1 lg:grid-cols-1 gap-x-16 gap-y-12">
                                {reviews.length !== 0 && reviews.map((i) => {
                                    return (
                                        <Link key={i} href={"/product/" + i.product} passHref>
                                            <a>
                                                <div className="container w-100 lg:w-5/6 mx-auto flex flex-col">
                                                    <div v-for="card in cards" className="flex flex-col md:flex-row overflow-hidden bg-white rounded-lg shadow-xl  mt-4 w-100 mx-2">

                                                        <div className="h-64 w-auto md:w-1/2">
                                                            <Image className="h-24 rounded-lg"
                                                                src={`${process.env.backend}${i.product__image}`}
                                                                height={400}
                                                                width={400}
                                                                alt={i.product_name} />
                                                        </div>

                                                        <div className="w-full py-4 px-6 text-gray-800 flex flex-col justify-between">
                                                            <div className="flex -ml-1">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className={
                                                                        i.rating >= 1
                                                                            ? "w-5 h-5 text-yellow-400"
                                                                            : "w-5 h-5 text-gray-200"
                                                                    }
                                                                    viewBox="0 0 20 20"
                                                                    fill="currentColor"
                                                                >
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className={
                                                                        i.rating >= 2
                                                                            ? "w-5 h-5 text-yellow-400"
                                                                            : "w-5 h-5 text-gray-200"
                                                                    }
                                                                    viewBox="0 0 20 20"
                                                                    fill="currentColor"
                                                                >
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className={
                                                                        i.rating >= 3
                                                                            ? "w-5 h-5 text-yellow-400"
                                                                            : "w-5 h-5 text-gray-200"
                                                                    }
                                                                    viewBox="0 0 20 20"
                                                                    fill="currentColor"
                                                                >
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className={
                                                                        i.rating >= 4
                                                                            ? "w-5 h-5 text-yellow-400"
                                                                            : "w-5 h-5 text-gray-200"
                                                                    }
                                                                    viewBox="0 0 20 20"
                                                                    fill="currentColor"
                                                                >
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className={
                                                                        i.rating == 5
                                                                            ? "w-5 h-5 text-yellow-400"
                                                                            : "w-5 h-5 text-gray-200"
                                                                    }
                                                                    viewBox="0 0 20 20"
                                                                    fill="currentColor"
                                                                >
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            </div>
                                                            <h3 className="font-semibold text-lg leading-tight truncate">{capFirstLetter(i.title)}</h3>
                                                            <p className="mt-2">
                                                                {capFirstLetter(i.message)}
                                                            </p>
                                                            <p className="text-sm text-gray-700 uppercase tracking-wide font-semibold mt-2">
                                                                {i.review_date}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default MyReview;