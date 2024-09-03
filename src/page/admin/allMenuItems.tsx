import { ReactNode } from "react";
import { bookingRoomSmall, roomSmall, scheduleSmall } from "../../icons/icons";

export type TMenuItems = {
    icon: ReactNode;
    title: string;
    link: string;
}

export const allMenuItems:TMenuItems[]= [
    {
        icon: roomSmall,
        title: 'Room',
        link: '/dashboard'
    },
    {
        icon: scheduleSmall,
        title: 'Slot',
        link: '/dashboard/admin-slot'
    },
    {
        icon: bookingRoomSmall,
        title: 'Booking',
        link: '/dashboard/admin-booking'
    },
]