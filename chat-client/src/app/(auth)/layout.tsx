import Image from "next/image";
import React, { FC, ReactNode } from "react";

interface IProps {
    children: ReactNode
};

const AuthLayout: FC<IProps> = ({ children, ...props }) => {
    return <main className="grid grid-cols-12 gap-x-3">
        <div className="relative col-span-8 h-[100vh]">
            <Image
                src="/images/auth-bg.jpg"
                alt="background image"
                fill
                className="object-cover h-full w-full"
            />
        </div>
        <div className="p-10 col-span-4">
            {children}
        </div>
    </main>
};

export default AuthLayout;