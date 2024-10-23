"use client";

import React, { FC, useState } from "react";

import ChatBody from "./ChatBody";
import classNames from "classnames";
import ChatRoomListing from "./ChatRoomListing";
import { getRooms } from "@app/utils";

type IProps = {
  className?: string;
}

const ChatBox: FC<IProps> = ({ className }) => {
  const [activeEmail, setActiveEmail] = useState("");
  const rooms = getRooms();

  return (
    <div className={classNames("grid grid-cols-12 gap-3 h-full", className)}>
      <ChatRoomListing activeEmail={activeEmail} rooms={rooms} setActiveEmail={setActiveEmail} />
      <ChatBody activeRoom={rooms.find(room => room.email === activeEmail)} />
    </div>
  );
};

export default ChatBox;