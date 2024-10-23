import React, { FC } from "react";
import SignUpForm from "./form";

interface IProps {};

const SignUpPage:FC<IProps> = (props) => {
    return (<div className="w-full flex justify-center flex-col">
        <div className="">
            <h1 className="font-semibold text-xl text-nowrap">Đăng ký tài khoản</h1>
            <p className="text-sm text-gray-500">Đăng ký tài khoản để tiếp tục nhắn tin với bạn bè</p>
        </div>
        <SignUpForm className="mt-5 w-full" />
    </div>);
};

export default SignUpPage;