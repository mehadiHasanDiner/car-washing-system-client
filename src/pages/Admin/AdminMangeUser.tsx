import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllUsersQuery } from "@/redux/features/auth/authApi";
import { useAppSelector } from "@/redux/hook";
import { ListOrderedIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import ChangeUserRole from "@/components/ChangeRole/ChangeUserRole";

import { formatDistanceToNow } from "date-fns";

const AdminMangeUser = () => {
  const [page, setCurrentPage] = useState(2);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const { data } = useGetAllUsersQuery(undefined);
  const { user } = useAppSelector((state: any) => state.auth);
  console.log(user);
  return (
    <div className="px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <p className="text-muted-foreground">
          Manage user roles and permissions.
        </p>
      </div>

      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {searchTerm || page > 1 ? (
          ""
        ) : (
          <Card key={user?._id} className="border-[1px] border-muted">
            <div className="flex items-center gap-4 p-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user?.image} alt="John Doe" />
                <AvatarFallback>{user?.data?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{user?.name}</div>
                <div className="text-sm text-muted-foreground">
                  {user?.email}
                </div>
                <div className="text-sm text-muted-foreground">
                  Member since{" "}
                  {formatDistanceToNow(
                    new Date(user?.createdAt || "11-11-2022"),
                    {
                      addSuffix: false,
                    }
                  )}
                </div>
              </div>
            </div>
            <Separator />
            <CardContent className="p-4">
              <Select defaultValue={user?.auth?.role} disabled={true}>
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="Set Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select role</SelectLabel>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        )}

        {data?.data?.map((pay_user: any) => (
          <Card key={pay_user._id}>
            <div className="flex items-center gap-4 p-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={pay_user.image} alt="John Doe" />
                <AvatarFallback>{pay_user.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{pay_user.name}</div>
                <div className="text-sm text-muted-foreground">
                  {pay_user.email}
                </div>
                <div className="text-sm text-muted-foreground">
                  Member since{" "}
                  {formatDistanceToNow(new Date(pay_user.createdAt), {
                    addSuffix: false,
                  })}
                </div>
                <div className="text-sm text-muted-foreground">
                  Role: {pay_user?.role.toUpperCase()}
                </div>
              </div>
            </div>
            <Separator />
            <CardContent className="p-4">
              <ChangeUserRole
                id={pay_user._id}
                role={pay_user.auth?.role || ""}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminMangeUser;
