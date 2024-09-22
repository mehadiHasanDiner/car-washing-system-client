import { TService } from "./service.types";
import { TSlot } from "./slots.types";
import { TUser } from "./user";

export type TCustomer = {
  name: string;
  email: string;
  mobile: string;
  address: string;
};

export type TBooking = {
  _id: string;
  customer: TCustomer;
  service: TService;
  slot: TSlot;
  vehicleType: string;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
  transactionId: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TUserBooking = {
  _id: string;
  customer: TUser;
  slot: TSlot;
  service: TService;
  payment: string;
  status: "cancel" | "confirm";
  slotId: "string";
  vehicleType: string;
  updatedAt: Date;
};

export type TBookingCountDown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export type TFormattedBooking = {
  id: string;
  serviceName: string | null;
  date: string | null;
  startTime: string | null;
  paymentStatus: "pending" | "completed" | "failed";
};
