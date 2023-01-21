import React, { useState } from "react";
import { toast } from "react-toastify";


const ReviewForm = ({ setPostStatus,reviews,setReviewData,prod_id }) => {

  const [rating, setRating] = useState(1);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState({ title: "", message: "" });

  const onChange = (e) => {
    e.preventDefault();
    setReview({ ...review, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    console.log("handle submit run");
    if (review.title.length == 0) {
      toast.error("Write Review title");
      return;
    }
    if (review.title.length > 50) {
      toast.error("Title limit 50 characters");
      return;
    }
    if (review.message.length == 0) {
      toast.error("Write Review");
      return;
    }
    if (review.message.length > 500) {
      toast.error("Review limit 500 characters");
      return;
    }
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_MY_BACK_HOST}/product/review/${prod_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title: review.title,
          message: review.message,
          star: rating,
        }),
      }
    ); //request end
    let res = await data.json();
    if (res.success) {
      toast.success(res.message);
      const postedreview = {
        id: -1,
        title: review.title,
        message: review.message,
        rating: rating,
        customer__user__first_name: "You",
        customer__user__last_name: "",
        review_date: "Now",
      };
      reviews.unshift(postedreview)
      setReviewData(reviews);
      setReview({ title: "", message: "" });
      setRating(1);
      setPostStatus(true);
    } else {
      toast.error(res.message);
    }
  };
  return (
    <>
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
                        className={index <= (hover || rating) ? "on" : "off"}
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
    </>
  );
};

export default ReviewForm;
