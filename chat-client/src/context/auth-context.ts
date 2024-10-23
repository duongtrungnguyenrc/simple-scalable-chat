import { createContext, Dispatch, SetStateAction } from "react";

export type AuthContextType = {
  auth: User | null;
  ready: boolean;
  setAuth: Dispatch<SetStateAction<User | null>>;
};

export const AuthContext = createContext<AuthContextType>({
  setAuth: () => {},
  ready: false,
  auth: null,
});
