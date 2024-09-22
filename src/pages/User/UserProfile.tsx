import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hook";
import { FaPen } from "react-icons/fa";
import { format } from "date-fns";
import { useGetAnUserQuery } from "../../redux/features/auth/authApi";

const UserProfile = () => {
  const { user } = useAppSelector((state: any) => state.auth);
  const { data: userData, isLoading } = useGetAnUserQuery(
    (user?.email as string) || undefined
  );

  if (isLoading) {
    return (
      <div className="bg-purple-200 animate-pulse w-full h-[210px] rounded p-6 flex items-center gap-5">
        <div className="w-40 h-40 basis-40 shrink-0 bg-purple-300 rounded-full"></div>
        <div className="space-y-2 w-full">
          <div className="w-full h-10 bg-purple-300 rounded"></div>
          <div className="w-full h-5 bg-purple-300 rounded"></div>
          <div className="w-full h-5 bg-purple-300 rounded"></div>
          <div className="w-full h-5 bg-purple-300 rounded"></div>
          <div className="w-full h-5 bg-purple-300 rounded"></div>
        </div>
      </div>
    );
  }
  if (!user) {
    return <></>;
  }

  console.log(userData?.data?.email);

  return (
    <div className="w-full rounded-[10px] px-[25px] py-[20px]">
      <div className="flex items-start justify-start gap-[20px]">
        <Link
          to={"/dashboard-user/update-info"}
          className="w-[120px] h-[120px] rounded-full overflow-hidden bg-red-100 relative group/profile shadow-md"
        >
          <img
            src={
              userData?.data?.image ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAOx3ICIIaQaKmfxlhiZNU2lh7ST07Hxmjsw&s"
            }
            width={120}
            height={120}
            alt="avatar"
            className=" w-full h-full object-cover"
          />

          <span className="absolute top-0 left-0 bg-[#2727272f] w-full h-full scale-0 group-hover/profile:scale-[1] duration-75 rounded-full cursor-pointer center text-white">
            <FaPen />
          </span>
        </Link>
        <h3 className="text-[20px] font-[600] mt-[20px]">
          {userData?.data?.name}
        </h3>
      </div>
      <p className="text-primaryTxt mt-[20px]">
        <span className="font-[600]">Email: </span> {userData?.data?.email}
      </p>
      <p className="text-primaryTxt mt-[10px]">
        <span className="font-[600]">Phone: </span> {userData?.data?.phone}
      </p>
      <p className="text-primaryTxt mt-[10px]">
        <span className="font-[600]">Address: </span> {userData?.data?.address}
      </p>
      <p className="text-primaryTxt mt-[8px]">
        <span className="font-[600]">User since: </span>{" "}
        {format(
          new Date(userData?.data?.createdAt || "12-30-2024"),
          "MMM dd, yyy"
        )}
      </p>
    </div>
  );
};

export default UserProfile;
