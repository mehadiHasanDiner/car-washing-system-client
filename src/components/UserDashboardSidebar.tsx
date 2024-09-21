import { FaArrowLeft } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/auth/authSlice";
import { CiLogout, CiUser } from "react-icons/ci";
import { RiLockPasswordLine, RiUserSettingsLine } from "react-icons/ri";

export const userProfileLinks = [
  {
    href: "/dashboard-user",
    label: "Profile",
    Icon: CiUser,
  },
  {
    href: "/dashboard-user/update-info",
    label: "Account setting",
    Icon: RiUserSettingsLine,
  },
  {
    href: "/dashboard-user/my-bookings",
    label: "My Bookings",
    Icon: RiLockPasswordLine,
  },
];

const UserDashboardSidebar = () => {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout(undefined));
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col gap-[15px] w-full md:w-fit">
      <button
        className="flex items-center justify-start gap-[10px]"
        onClick={handleGoBack}
      >
        <FaArrowLeft /> Go Back
      </button>
      {user &&
        userProfileLinks.map(({ Icon, href, label }, i) => (
          <Link
            to={href}
            key={"profile" + i}
            className={`w-full md:w-[240px] border-[1px] border-borderColor py-[12px] rounded-[5px] flex items-center justify-start gap-[5px] font-[500] pl-[20px] ${
              path === href
                ? "bg-primary/90 text-muted"
                : "bg-white text-primaryTxt"
            }`}
          >
            <Icon /> {label}
          </Link>
        ))}

      <button className="button-card flex items-center" onClick={handleLogout}>
        <CiLogout /> Logout
      </button>
    </div>
  );
};

export default UserDashboardSidebar;
