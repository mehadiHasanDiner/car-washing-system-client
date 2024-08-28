import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";

const ManiLayout = () => {
  return (
    <>
      <Header></Header>
      <div className="container mx-auto ">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </>
  );
};

export default ManiLayout;


// Module 24: Intro to Redux
// Module 25: Hands-on Redux Toolkit
// Module 26: Fundamentals of RTK Query