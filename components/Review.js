import React, { memo, useCallback, useEffect, useState } from "react";
import ReviewForm from "./ReviewForm";

const Review = ({ prod_id, reviews, sitare,setReviewData,reviewCount,user }) => {
  const [postStatus, setPostStatus] = useState(false);
  // const [rating, setRating] = useState(1);
  // const [hover, setHover] = useState(0);
  // const [review, setReview] = useState({ title: "", message: "" });
  // console.log("review.js",reviews);
  console.log("re rendering");

  // const onChange = (e) => {
  //   e.preventDefault();
  //   setReview({ ...review, [e.target.name]: e.target.value });
  //   // console.log(review);
  // };
  // const handleSubmit = async () => {
  //   console.log("handle submit run")
  //   if (review.title.length == 0) {
  //     toast.error("Write Review title");
  //     return;
  //   }
  //   if (review.title.length > 50) {
  //     toast.error("Title limit 50 characters");
  //     return;
  //   }
  //   if (review.message.length == 0) {
  //     toast.error("Write Review");
  //     return;
  //   }
  //   if (review.message.length > 500) {
  //     toast.error("Review limit 500 characters");
  //     return;
  //   }
  //   const data = await fetch(
  //     `${process.env.NEXT_PUBLIC_MY_BACK_HOST}/product/review/${prod_id}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + localStorage.getItem("token"),
  //       },
  //       body: JSON.stringify({
  //         title: review.title,
  //         message: review.message,
  //         star: rating,
  //       }),
  //     }
  //   ); //request end
  //   let res = await data.json();
  //   if (res.success) {
  //     toast.success(res.message);
  //     const postedreview={
  //         "id":-1,
  //         "title":review.title,
  //         "message":review.message,
  //         "rating":rating,
  //         "name":"You",
  //         "date":"Now"
        
  //     }
  //     let refreshData=reviews;
  //     refreshData["-1"]=postedreview;
  //     console.log(refreshData);
  //     setReviewData(refreshData)
  //     setReview({ title: "", message: "" });
  //     setRating(1);
  //     setPostStatus(true);
  //   } else {
  //     toast.error(res.message);
  //   }
  // };
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
    // console.log("data a gya ");
    setPostStatus(res)

  },[postStatus])

  useEffect( () => {
    console.log('hey i am Review.js useEffect');
    // const data = await fetch(
    //   `${process.env.NEXT_PUBLIC_MY_BACK_HOST}/product/isPosted/${prod_id}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: "Bearer " + localStorage.getItem("token"),
    //     }
    //   }
    // ); //request end
    // let res = await data.json();
    // console.log(res);
    // setPostStatus(res)
    // try {
      if(localStorage.getItem("token")){
        getData();
      }
  }, [])
   
  return (
    <>
      {/* <hr /> */}

      <section className=" bg-gray-100">
      {!postStatus && user.value && <ReviewForm reviews={reviews} setReviewData={setReviewData} setPostStatus={setPostStatus} prod_id={prod_id}/>}
        {/* {!postStatus && user.value && (
          <section className="bg-gray-100">
            <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-1">
                <div className="p-8 bg-white rounded-3xl shadow-lg lg:p-12 lg:col-span-3">
                  <div className="space-y-4">
                    <div>
                      <input
                        className="appearance-nonerelative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Review Title"
                        onChange={onChange}
                        name="title"
                        type="text"
                        required
                        value={review.title}
                        id="name"
                      />
                    </div>

                    <div className="border-indigo-500">
                      <textarea
                        className="appearance-nonerelative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Write Product review Max 500 characters"
                        rows="3"
                        onChange={onChange}
                        value={review.message}
                        required
                        name="message"
                        id="message"
                      ></textarea>
                    </div>
                    <input type="hidden" name="rating" value={rating} />
                    <div className="star-rating">
                      <style jsx>{`
                        button {
                          background-color: transparent;
                          border: none;
                          outline: none;
                          cursor: pointer;
                        }
                        .on {
                          color: #facc15;
                        }
                        .off {
                          color: #ccc;
                        }

                        body {
                          padding: 100px;
                        }
                      `}</style>
                      {[...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                          <button
                            type="button"
                            key={index}
                            className={
                              index <= (hover || rating) ? "on" : "off"
                            }
                            onClick={() => setRating(index)}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(rating)}
                          >
                            <span className="star m-3 text-2xl">&#9733;</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-4">
                      <button
                        onClick={handleSubmit}
                        className="inline-flex items-center justify-center w-full px-5 py-3 bg-indigo-500 rounded-lg sm:w-auto"
                      >
                        <span className="font-medium text-white">
                          {" "}
                          Post review{" "}
                        </span>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 ml-2 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )} */}
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
                Based on {reviewCount} reviews
              </p>
            </div>
          </div>

          <div className="grid bg grid-cols-1 mt-8 lg:grid-cols-1 gap-x-16 gap-y-12">
            {Object.keys(reviews).slice(0)
              .reverse().map((i) => {
              return (
                <blockquote key={i} className="bg-white shadow-xl rounded-3xl p-5 min-w-min h-auto">
                  <header className="sm:items-center sm:flex">
                    <div className="flex -ml-1">
                      {/* ${i.reviews>=?"text-yellow-400":"text-gray-200"} */}
                      {/* ()=>{return i.rating>=1?"w-5 h-5 text-yellow-400":"w-5 h-5 text-gray-200"} */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={
                          reviews[i].rating >= 1
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
                          reviews[i].rating >= 2
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
                          reviews[i].rating >= 3
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
                          reviews[i].rating >= 4
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
                          reviews[i].rating == 5
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
                      {reviews[i].title}
                    </p>
                  </header>

                  <p className="mt-2 text-gray-700">{reviews[i].message}</p>

                  <footer className="mt-4">
                    <p className="text-xs text-gray-500">
                      {reviews[i].name} - {reviews[i].date}
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