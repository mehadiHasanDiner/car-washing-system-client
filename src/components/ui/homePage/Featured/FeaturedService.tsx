import { Button } from "antd";
import { featuredServiceData } from "../../../../utils/featuredServiceData";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const FeaturedService = () => {
  //   console.log(featuredServiceData);

  return (
    <div className="mt-12 relative">
      <div className="text-center space-y-4 mb-3">
        <h1 className="text-4xl font-semibold"> Our Top Services</h1>
        <p className="text-xl">Top 6 popular services you can chose from us</p>
      </div>

      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={150}
        totalSlides={6}
        isPlaying={true}
        playDirection="backward"
        isIntrinsicHeight={true}
      >
        <Slider>
          {featuredServiceData.map((slide) => (
            <Slide index={slide?.id} key={slide?.id}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-100 rounded-xl ">
                <div className="2/4">
                  <img
                    className="object-cover h-96 w-full rounded-l-xl"
                    src={slide.image}
                    alt="examples"
                  />
                </div>
                <div className="2/4">
                  <h2 className="text-2xl font-semibold mb-3">{slide.name}</h2>
                  <p className="mb-3 font-semibold">🕒 {slide.duration} min</p>
                  <p className="mb-3">{slide.description}</p>
                  <ul className="mb-8">
                    {slide.features.map((feature, index) => (
                      <li key={index}> ✔ {feature}</li>
                    ))}
                  </ul>
            
                </div>
              </div>
            </Slide>
          ))}
        </Slider>
        <div className="text-center space-x-4 absolute right-4 bottom-4 hidden md:block ">
          <ButtonBack className="hover:bg-slate-800 hover:text-white  rounded p-1">
            <AiOutlineArrowLeft size={20} />
          </ButtonBack>
          <ButtonNext className="hover:bg-slate-800 hover:text-white rounded p-1">
            <AiOutlineArrowRight size={20} />
          </ButtonNext>
        </div>
      </CarouselProvider>
    </div>
  );
};

export default FeaturedService;
