import { JSX } from "react";
import { Navigate } from "react-router-dom";
import { PropsWithChildren } from "react";

export default function AuthRequire({ children }: PropsWithChildren<{}>) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}
