import { AuthProtect, Header } from "@app/components";
import React, { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const MainLayout: FC<IProps> = ({ children }) => {
  return (
    <AuthProtect>
      <main className="flex flex-col gap-6 bg-gray-50 h-screen">
        <Header />
        <section className="flex-1 flex justify-center items-center">
          {children}
        </section>
      </main>
    </AuthProtect>
  );
};

export default MainLayout;
