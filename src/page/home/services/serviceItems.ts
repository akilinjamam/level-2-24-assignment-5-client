import { ReactNode } from "react";
import { bookingRoom, room, schedule, support } from "../../../icons/icons";

type TserviceItems = {
  logo: ReactNode;
  title: string;
  bgColor: string;
};

export const serviceItems: TserviceItems[] = [
  {
    logo: room,
    title: "Real-Time Availability",
    bgColor: "#fcfcb5",
  },
  {
    logo: bookingRoom,
    title: "Instant Booking Confirmation",
    bgColor: "#d8d8fa",
  },
  {
    logo: schedule,
    title: "Flexible Scheduling",
    bgColor: "#f5d0d0",
  },
  {
    logo: support,
    title: "24/7 support",
    bgColor: "#ceface",
  },
];
