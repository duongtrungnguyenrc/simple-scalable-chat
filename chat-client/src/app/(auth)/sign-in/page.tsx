import React, { FC } from "react";
import LoginForm from "./form";

interface IProps { };

const SignInPage: FC<IProps> = (props) => {
    return (<div className="w-full flex justify-center flex-col">
        <div className="">
            <h1 className="font-semibold text-xl text-nowrap">Đăng nhập</h1>
            <p className="text-sm text-gray-500">Vui lòng đăng nhập để tiếp tục nhắn tin với bạn bè</p>
        </div>
        <LoginForm className="mt-5 w-full" />
    </div>);
};

export default SignInPage;