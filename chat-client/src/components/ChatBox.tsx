"use client";

import React, { FC, useState } from "react";

import ChatBody from "./ChatBody";
import classNames from "classnames";
import ChatRoomListing from "./ChatRoomListing";
import { useChatRooms } from "@app/actions";

type IProps = {
  className?: string;
};

const ChatBox: FC<IProps> = ({ className }) => {
  const [activeRoom, setActiveRoom] = useState("");
  const { data } = useChatRooms();

  const rooms: Room[] =
    data?.pages.reduce<Room[]>(
      (prevRooms, page) => [...prevRooms, ...page.data],
      []
    ) || [];

  return (
    <div
      className={classNames("grid grid-cols-12 h-full w-full", className)}
    >
      <ChatRoomListing
        activeRoom={activeRoom}
        rooms={rooms}
        setActiveRoom={setActiveRoom}
      />
      <ChatBody activeRoom={rooms.find((room) => room._id == activeRoom)} />
    </div>
  );
};

export default ChatBox;
