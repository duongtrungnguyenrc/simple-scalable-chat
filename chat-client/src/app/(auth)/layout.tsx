import React, { FC, ReactNode } from "react";
import Image from "next/image";

import { AuthProtect } from "@app/components";

type IProps = {
  children: ReactNode;
};

const AuthLayout: FC<IProps> = ({ children }) => {
  return (
    <AuthProtect status={true} navigateTo="/">
      <main className="grid grid-cols-12 gap-x-3">
        <div className="relative col-span-8 h-[100vh]">
          <Image
            src="/images/auth-bg.jpg"
            alt="background image"
            fill
            className="object-cover h-full w-full"
          />
        </div>
        <div className="p-10 col-span-4">{children}</div>
      </main>
    </AuthProtect>
  );
};

export default AuthLayout;
