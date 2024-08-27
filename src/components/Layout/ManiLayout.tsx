import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";

const ManiLayout = () => {
  return (
    <div className="container mx-auto ">
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default ManiLayout;
