export type TNav = {
  name: string;
  icon: string;
  link: string;
  hide: boolean;
  sublink?: string[];
};

export const navManuRoutes: TNav[] = [
  {
    name: "Home",
    icon: "",
    link: "/",
    hide: false,
  },
  {
    name: "Meeting Room",
    icon: "",
    link: "/room",
    hide: false,
  },
  {
    name: "About Us",
    icon: "",
    link: "/about",
    hide: false,
  },
  {
    name: "Contact Us",
    icon: "",
    link: "/contact",
    hide: false,
  },
  {
    name: "Registration",
    icon: "",
    link: "/registration",
    hide: false,
  },
  {
    name: "Login",
    icon: "",
    link: "/login",
    hide: false,
  },
];
