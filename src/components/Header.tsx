import { ReactNode, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "./../assets/images/logo.png";
import { BiSolidLogIn } from "react-icons/bi";
import { MdDashboardCustomize } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { BiSolidLogOut } from "react-icons/bi";

import { RiHealthBookFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { RiMenu3Fill } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { Button } from "antd";
import { logout } from "../redux/features/auth/authSlice";

type UserRole = "admin" | "user";

type TNavItem = {
  icon: ReactNode;
  name: string;
  path?: string | UserRole;
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth) || null;
  console.log(user);

  const navLinks: TNavItem[] = [
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

    user
      ? {
          icon: <MdDashboardCustomize />,
          name: "Dashboard",
          path: `/dashboard-${user?.role === "admin" ? "admin" : "user"}`,
        }
      : {
          icon: <BiSolidLogIn size={18} />,
          name: "Login",
          path: "/login",
        },
  ];

  const active = {
    fontWeight: "bold",
    color: "purple", // Active state style
  };

  const inactive = {
    fontWeight: "normal",
    color: "black", // Inactive state style
  };

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className=" container mx-auto bg-gradient-to-t p-2  shadow-md mb-1">
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
                  {navItem.path && (
                    <NavLink
                      style={({ isActive }: { isActive: boolean }) =>
                        isActive ? active : inactive
                      }
                      to={navItem.path}
                    >
                      <div className="flex items-center">
                        <span className="mr-1">{navItem.icon}</span>
                        {navItem.name}
                      </div>
                    </NavLink>
                  )}
                </li>
              ))}
              <li className="-mt-1 mb-1 ">
                {user ? (
                  <Button
                    onClick={handleLogout}
                    className=" flex items-center bg-purple-600 text-white"
                  >
                    <BiSolidLogOut size={18} /> Logout
                  </Button>
                ) : (
                  ""
                )}
              </li>
            </ul>
          </div>
        </nav>
        {/* <p>Logout</p> */}

        {/* mobile menubar button */}
        <div className={isMenuOpen ? "" : "md:hidden mt-1"}>
          <button className="hover:text-purple-600" onClick={handleMenuToggle}>
            {isMenuOpen ? <RxCross2 size={28} /> : <RiMenu3Fill size={26} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
