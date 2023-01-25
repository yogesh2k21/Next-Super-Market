import React, { useCallback, useEffect, useState } from "react";
import ReviewForm from "./ReviewForm";

const Review = ({ prod_id, reviews, sitare,setReviewData,user }) => {
  const [postStatus, setPostStatus] = useState(false);
  
  console.log("re rendering");
  //sorting the reviews according to its rating decsending order
  reviews.sort((a,b)=> b.rating-a.rating)

  const capFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const getData= useCallback(async()=>{
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_MY_BACK_HOST}/product/isPosted/${prod_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        }
      }
    ); //request end
    let res = await data.json();
    setPostStatus(res)

  },[postStatus])

  useEffect( () => {
    console.log('hey i am Review.js useEffect');
      if(localStorage.getItem("token")){
        getData();
      }
  }, [])
   
  return (
    <>
      <section className=" bg-gray-100">
      {!postStatus && user.value && <ReviewForm reviews={reviews} setReviewData={setReviewData} setPostStatus={setPostStatus} prod_id={prod_id}/>}
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold sm:text-2xl">Customer Latest Reviews</h2>

          <div className="flex items-center mt-4">
            <p className="text-3xl font-medium">
              {sitare}
              <span className="sr-only"> Average review score </span>
            </p>

            <div className="ml-4">
              <div className="flex -ml-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={
                    sitare >= 1
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
                    sitare >= 2
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
                    sitare >= 3
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
                    sitare >= 4
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
                    sitare == 5
                      ? "w-5 h-5 text-yellow-400"
                      : "w-5 h-5 text-gray-200"
                  }
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>

              <p className="mt-0.5 text-xs text-gray-500">
                Based on {reviews.length} reviews
              </p>
            </div>
          </div>

          <div className="grid bg grid-cols-1 mt-8 lg:grid-cols-1 gap-x-16 gap-y-12">
            {reviews.map((i) => {
              return (
                <blockquote key={i} className="bg-white shadow-xl rounded-3xl p-5 min-w-min h-auto">
                  <header className="sm:items-center sm:flex">
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

                    <p className="mt-2 font-medium sm:ml-4 sm:mt-0">
                      {i.title}
                    </p>
                  </header>

                  <p className="mt-2 text-gray-700">{i.message}</p>

                  <footer className="mt-4">
                    <p className="text-xs text-gray-500">
                      {capFirstLetter(i.customer__user__first_name)+' '+capFirstLetter(i.customer__user__last_name)} - {i.review_date}
                    </p>
                  </footer>
                </blockquote>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Review;