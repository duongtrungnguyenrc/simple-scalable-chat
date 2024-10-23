"use client";

import { useRouter } from "next/navigation";
import { FC, ReactNode } from "react";

import { useAuth } from "@app/common";

type AuthProtectProps = {
  children: ReactNode;
  status?: boolean;
  navigateTo?: string;
};

const AuthProtect: FC<AuthProtectProps> = ({
  children,
  status = false,
  navigateTo = "/sign-in",
}: AuthProtectProps) => {
  const { auth, ready } = useAuth();
  const router = useRouter();

  if (ready && !!auth == status) {
    router.replace(navigateTo);
  }

  console.log(auth);

  return ready && children;
};

export default AuthProtect;
