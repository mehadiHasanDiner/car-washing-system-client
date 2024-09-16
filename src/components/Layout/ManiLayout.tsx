import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import { useEffect, useState } from "react";
import ScrollToTop from "../ScrollToTop";
import { AiOutlineToTop } from "react-icons/ai";

const ManiLayout = () => {
  const [isScrollTop, setIsScrollTop] = useState(true);
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScrollBar = () => {
      if (window.scrollY < 500) {
        setIsScrollTop(true);
      } else {
        setIsScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScrollBar);

    return () => {
      window.removeEventListener("scroll", handleScrollBar);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Header></Header>
      <div className="container mx-auto ">
        <ScrollToTop>
          <Outlet />
        </ScrollToTop>
      </div>
      <Footer></Footer>

      {/* Top to bottom button */}
      {isHome && (
        <span
          className={`h-10 w-10 text-white bg-purple-600 flex items-center justify-center text-2xl rounded-full my-shadow-1 transition-all duration-500 ease-in-out cursor-pointer fixed right-2 md:right-4 bottom-2 md:bottom-4 ${
            !isScrollTop
              ? "translate-x-0 opacity-100 hover:opacity-50 scale-[1.02] visible"
              : "translate-x-5 opacity-0 invisible"
          }`}
          onClick={handleScrollToTop}
        >
          <AiOutlineToTop/>
        </span>
      )}
    </>
  );
};

export default ManiLayout;
