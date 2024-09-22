import { TBookingCountDown, TUserBooking } from "../../types/bookings.types";
import { getTimeRemaining } from "../../utils/formatDateTime";
import { useEffect, useState } from "react";
import { Card, Badge } from "antd";
import { format } from "date-fns";
import { CiLock } from "react-icons/ci";

const UserBookingCard = ({ data }: { data: TUserBooking }) => {
  const [countdown, setCountdown] = useState<TBookingCountDown | null>(null);

  useEffect(() => {
    const slotEndTime = new Date(`${data.slot.date}T${data.slot.endTime}`);
    const updateCountdown = () => {
      setCountdown(getTimeRemaining(slotEndTime));
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, [data]);
  console.log(data);
  return (
    <>
      <div>
        <Card hoverable style={{ width: 240 }}>
          <div className="flex flex-col gap-4 p-5">
            <h3 className="text-lg break-words font-[700]">{data?.service?.name||"Any Name"}</h3>

            <div className="text-sm text-muted-foreground flex-col flex gap-[5px]">
              <p>
                Date:{" "}
                {format(new Date(data?.slotId || "11-11-2020"), "MMM dd yyyy")}
              </p>
              <p> Vechile Type: {data?.vehicleType || "Any"}</p>
              <p>Time: {format(new Date(data?.updatedAt), "MMM dd, yyyy")}</p>
              <div className="flex items-center gap-2 text-muted-foreground shrink-0">
                <CiLock className="w-4 h-4" />
                <span>
                  {countdown?.days || 0}d {countdown?.hours || 0}h{" "}
                  {countdown?.minutes || 0}m {countdown?.seconds || 0}s
                </span>
              </div>
              <Badge
                className={`w-fit`}
                style={{
                  backgroundColor: `${
                    data?.status === "cancel" ? "red" : "blue"
                  }`,
                }}
              >
                {data?.status}
              </Badge>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default UserBookingCard;
