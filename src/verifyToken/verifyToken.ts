import { jwtDecode, JwtPayload } from "jwt-decode";
interface UserInfo extends JwtPayload {
  role?: string; // Assuming role is optional
  email?: string;
  iat?: number;
  exp?: number; // Assuming role is optional
}
export const verifyToken = (token: string): UserInfo | null => {
  return jwtDecode<UserInfo>(token) as JwtPayload;
};
