import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "./../assets/images/logo.png";
import { BiSolidLogIn } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { RiHealthBookFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { RiMenu3Fill } from "react-icons/ri";

const navLinks = [
  {
    icon: <FaHome size={18} />,
    name: "Home",
    path: "/",
  },
  {
    icon: <MdOutlineMiscellaneousServices size={18} />,
    name: "Service",
    path: "/service",
  },
  {
    icon: <RiHealthBookFill size={18} />,
    name: "Booking",
    path: "/booking",
  },

  {
    icon: <BiSolidLogIn size={18} />,
    name: "Login",
    path: "/login",
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gradient-to-t p-2  shadow-md mb-1">
      <div className=" flex justify-between">
        <nav className={isMenuOpen ? "" : "flex justify-between w-full"}>
          <div className="flex justify-between ">
            <div className="">
              <Link to={"/"}>
                <div className={"flex items-center"}>
                  <img className="pr-2" width={50} src={logo} alt="" />
                  <p className="text-2xl font-bold font-expanded">CAR Expert</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="pt-2 ">
            <ul
              className={
                isMenuOpen
                  ? "flex flex-col space-y-3 pt-4 pl-2"
                  : "hidden md:flex space-x-8"
              }
            >
              {navLinks.map((navItem, index) => (
                <li className=" hover:text-purple-600" key={index}>
                  <NavLink
                    // style={({ isActive }: { isActive: boolean }) =>
                    //   isActive ? active : inactive
                    // }
                    to={navItem.path}
                  >
                    <div className="flex items-center">
                      {" "}
                      <span className="mr-1">{navItem.icon}</span>{" "}
                      {navItem.name}
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* mobile menubar button */}
        <div className={isMenuOpen ? "" : "md:hidden mt-1"}>
          <button className="hover:text-purple-600" onClick={handleMenuToggle}>
            {isMenuOpen ? <RxCross2 size={28} /> : <RiMenu3Fill size={26}/>}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
