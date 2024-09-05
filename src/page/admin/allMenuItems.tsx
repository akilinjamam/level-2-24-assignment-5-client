import { ReactNode } from "react";
import { bookingRoomSmall, roomSmall, scheduleSmall, userSmall } from "../../icons/icons";

export type TMenuItems = {
    icon: ReactNode;
    title: string;
    link: string;
    linkTwo: string;
    linkThree: string;
}

export const allMenuItems:TMenuItems[]= [
    {
        icon: roomSmall,
        title: 'Room',
        link: '/dashboard',
        linkTwo: '/dashboard/admin-add-room',
        linkThree: '/dashboard/admin-update-room'
    },
    {
        icon: scheduleSmall,
        title: 'Slot',
        link: '/dashboard/admin-slot',
        linkTwo: '/dashboard/create-admin-slot',
        linkThree: '/dashboard/update-admin-slot',
    },
    {
        icon: bookingRoomSmall,
        title: 'Booking',
        link: '/dashboard/admin-booking',
        linkTwo: 'not',
        linkThree: 'not',
    },
    {
        icon: userSmall,
        title: 'User Management',
        link: '/dashboard/user-management',
        linkTwo: 'not',
        linkThree: 'not',
    },
]