import { TService } from "./service.types";

export type TSlot = {
  _id: string;
  service: TService | string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
};

export type TTimeSlot = {
  _id: string;
  startTime: string;
  endTime: string;
  isBooked: string;
};

export type TDateSlot = {
  date: string;
  slots: TTimeSlot[];
};
