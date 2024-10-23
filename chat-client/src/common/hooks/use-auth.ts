import { AuthContext } from "@app/context";
import { useContext } from "react";

export const useAuth = () => {
  return useContext(AuthContext);
};
