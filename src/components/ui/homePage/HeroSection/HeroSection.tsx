import { useRef } from "react";
import { Swiper as SwiperType } from "swiper";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import "./HeroSection.css";

const HeroSection = () => {
  const sliderData = [
    {
      id: 1,
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1661501041641-3e731115e687?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Your Trusted Partner for Exceptional Car Service",
    },
    {
      id: 2,
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1682142450766-2bcf94b482c8?q=80&w=1492&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Expert Care for Your Car, Right When You Need It",
    },
    {
      id: 3,
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1682142564647-6f4396a34d02?q=80&w=1203&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Book Your Service Today and Experience the Difference!",
    },
    {
      id: 4,
      imageUrl:
        "https://images.unsplash.com/photo-1613214150333-53afb7561e6d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Discover why we're the go-to choice for car owners who demand excellence",
    },
    {
      id: 5,
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1661454209648-4764099a9be9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Our 50% off price rate is going. Hurry up!",
    },
  ];

  const progressCircle = useRef<HTMLDivElement | any>(null);
  const progressContent = useRef<HTMLSpanElement>(null);

  const onAutoplayTimeLeft = (
    s: SwiperType,
    time: number,
    progress: number
  ) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty("--progress", `${1 - progress}`);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
        effect="fade"
      >
        {sliderData.map((slider) => (
          <SwiperSlide key={slider.id}>
            <div className="w-full max-h-[500px] relative next-icon mt-2">
              <img className="w-full" src={slider.imageUrl} alt="" />
              <div className="bg-gradient-to-l from-gray-800 opacity-80 w-full h-full absolute top-0"></div>
              <div className="text-white w-1/2 absolute top-0 md:top-1/3 right-0 p-8 lg:top-1/4">
                <h3 className=" text-2xl lg:text-5xl ">{slider.text}</h3>
                <div className="mt-6 flex justify-center">
                  <button className=" button-primary mr-2 text-sm">
                    Schedule Service
                  </button>
                  <button className="button-secondary">
                    Browse Bookings
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );
};

export default HeroSection;
