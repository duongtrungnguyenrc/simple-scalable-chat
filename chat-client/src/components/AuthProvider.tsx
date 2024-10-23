"use client";

import { FC, ReactNode, useEffect, useState } from "react";

import { AuthContext } from "@app/context";
import { checkAuth } from "@app/actions";

type AuthProviderProps = { children: ReactNode };

const AuthProvider: FC<AuthProviderProps> = ({
  children,
}: AuthProviderProps) => {
  const [auth, setAuth] = useState<User | null>(null);
  const [ready, setAuthReady] = useState<boolean>(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const user: User | null = await checkAuth();

      setAuth(user);
      setAuthReady(true);
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, ready, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
