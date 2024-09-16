export type TUserRoles = "admin" | "user";

export type TUser = {
  _id: string;
  name: string;
  email: string;
  image?: string;
  password: string;
  phone: string;
  role: TUserRoles;
  address: string;
  auth?: {
    role: TUserRoles;
    email: string;
  };
};
