import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const Banner = (props) => {
  const [banners, setbanners] = useState(props.banners);
  return (
    <Swiper
      id="main"
      tag="section"
      wrapperTag="ul"
      autoplay
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination
      onInit={() => {console.log("initialized")}}
      onSlideChange={() => console.log("slide change")}
    >
      {banners.map((banner,i)=>{
        return (
          <SwiperSlide key={i}>
            <Image src={`http://localhost:8000${banner.image}`} width={10000} height={4510} alt={`${banner.title}`} />
          </SwiperSlide>
        )
      })}
    </Swiper>
  );
};

export default Banner;