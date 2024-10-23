import React, { FC } from "react";
import LoginForm from "./form";

type IProps = {};

const SignInPage: FC<IProps> = ({}) => {
  return (
    <div className="w-full flex justify-center flex-col">
      <section className="">
        <h1 className="font-semibold text-xl text-nowrap">Đăng nhập</h1>
        <p className="text-sm text-gray-500">
          Vui lòng đăng nhập để tiếp tục nhắn tin với bạn bè
        </p>
      </section>
      <section className="flex flex-col items-center justify-center">
        <LoginForm className="mt-5 w-full" />
      </section>
    </div>
  );
};

export default SignInPage;
