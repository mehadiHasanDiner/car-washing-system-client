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
