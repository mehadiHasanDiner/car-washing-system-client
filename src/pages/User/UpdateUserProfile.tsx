import {
  useGetAnUserQuery,
  useUpdateProfileMutation,
} from "../../redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../../redux/features/auth/authSlice";
import CWForm from "../../components/ui/form/CWForm";
import CWInput from "../../components/ui/form/CWInput";
import { Button } from "keep-react";

const UpdateUserProfile = () => {
  const [updateProfile] = useUpdateProfileMutation();
  const user = useAppSelector((state: any) => state.auth.user);
  const { data: userInfo, isLoading: isUserLoading } = useGetAnUserQuery(
    user?.email
  );
  const dispatch = useAppDispatch();

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await updateProfile({
        id: userInfo?.data?._id,
        data,
      }).unwrap();
      if (!res?.success) {
        toast.error("Failed to update profile");
      }
      if (res.error) {
        toast.error("Failed to update profile.");
      }
      if (res.data) {
        toast.success("Profile updated successfully.");
        const userData = jwtDecode(res.data.token);
        dispatch(setUser({ user: userData, token: res.data.token }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (isUserLoading) {
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
  // console.log(userInfo);
  // console.log(user);

  return (
    <div>
      <CWForm defaultValues={userInfo ?? {}} onSubmit={handleSubmit}>
        <div className="space-y-3">
          <CWInput
            type="text"
            name="name"
            placeholder="Write your full name"
            defaultValue={userInfo?.data?.name}
          />
          <CWInput
            type="email"
            name="email"
            placeholder="Write your user email"
            defaultValue={userInfo?.data?.email}
            disabled
          />
          <CWInput
            type="text"
            name="phone"
            placeholder="Write your mobile no"
            defaultValue={userInfo?.data?.phone}
          />
          <CWInput
            type="text"
            name="address"
            placeholder="Write your address"
            defaultValue={userInfo?.data?.address}
          />

          <Button type="submit" className="">
            Update
          </Button>
        </div>
      </CWForm>
    </div>
  );
};

export default UpdateUserProfile;
