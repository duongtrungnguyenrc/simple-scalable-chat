import React, { FC } from "react";
import JoinRoomForm from "./form";

interface IProps { };

const MainPage: FC<IProps> = (props) => {
    return (
        <div className="w-[35vw] p-10 bg-white rounded-lg">
            <div className="">
                <h1 className="text-xl font-bold text-center">WELCOME</h1>
                <JoinRoomForm className="mt-5" />
            </div>
        </div>
    );
};

export default MainPage;