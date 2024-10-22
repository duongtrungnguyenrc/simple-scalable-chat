"use client";

import React, { FC, memo, useRef, useState } from "react";
import { SendHorizonal } from "lucide-react";
import ChatMessage from "./ChatMessage";
import classNames from "classnames";

type AdminChatBodyProps = { activeRoom?: Room };

type InitialChatFormData = {
  message: string;
};

const initialChatFormValues: InitialChatFormData = {
  message: "",
};

const AdminChatBody: FC<AdminChatBodyProps> = ({ activeRoom }: AdminChatBodyProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<InitialChatFormData>(initialChatFormValues);

  return (
    <section className="border bg-white flex-col h-fit rounded col-span-8 md:flex hidden custom-scroll">
      <div className="border-b w-full px-5 py-3 flex gap-x-3">  
        <div className="flex-shrink-0">
          <div className="bg-gray-100 p-3 rounded-full flex items-center justify-center">
            <svg
              className="text-gray-400 w-5 h-5"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M370.7 96.1C346.1 39.5 289.7 0 224 0S101.9 39.5 77.3 96.1C60.9 97.5 48 111.2 48 128l0 64c0 16.8 12.9 30.5 29.3 31.9C101.9 280.5 158.3 320 224 320s122.1-39.5 146.7-96.1c16.4-1.4 29.3-15.1 29.3-31.9l0-64c0-16.8-12.9-30.5-29.3-31.9zM336 144l0 16c0 53-43 96-96 96l-32 0c-53 0-96-43-96-96l0-16c0-26.5 21.5-48 48-48l128 0c26.5 0 48 21.5 48 48zM189.3 162.7l-6-21.2c-.9-3.3-3.9-5.5-7.3-5.5s-6.4 2.2-7.3 5.5l-6 21.2-21.2 6c-3.3 .9-5.5 3.9-5.5 7.3s2.2 6.4 5.5 7.3l21.2 6 6 21.2c.9 3.3 3.9 5.5 7.3 5.5s6.4-2.2 7.3-5.5l6-21.2 21.2-6c3.3-.9 5.5-3.9 5.5-7.3s-2.2-6.4-5.5-7.3l-21.2-6zM112.7 316.5C46.7 342.6 0 407 0 482.3C0 498.7 13.3 512 29.7 512l98.3 0 0-64c0-17.7 14.3-32 32-32l128 0c17.7 0 32 14.3 32 32l0 64 98.3 0c16.4 0 29.7-13.3 29.7-29.7c0-75.3-46.7-139.7-112.7-165.8C303.9 338.8 265.5 352 224 352s-79.9-13.2-111.3-35.5zM176 448c-8.8 0-16 7.2-16 16l0 48 32 0 0-48c0-8.8-7.2-16-16-16zm96 32a16 16 0 1 0 0-32 16 16 0 1 0 0 32z" />
            </svg>
          </div>
        </div>
        <div>
          <h1 className="font-bold">{"Annonymous customer"}</h1>
          <p className="font-semibold text-green-500 text-xs">Đang hoạt động</p>
        </div>
        <div className="flex-1 flex justify-end self-center">
          <button
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm p-3 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentColor"
              className="w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900"
            >
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto custom-scroll min-h-[60vh] max-h-[60vh] w-full py-5">
        {(activeRoom?.messages || []).map(({ _id, message, createdAt, from }) => {
          return (
            <ChatMessage key={_id} isMe={from === "ME"} time={createdAt}>
              {message}
            </ChatMessage>
          );
        })}
        <div ref={bottomRef} />
      </div>
      <div className="border-t w-full px-3 py-2">
        <div className="flex gap-x-3 items-center relative border rounded-md overflow-hidden">
          <input
            onChange={(e) => {
              setValues(prev => ({ 
                ...prev,
                message: e.target.value 
              }));
            }}
          value={values.message}
          className="w-full border-none pr-10 p-3 outline-none text-sm"
          name="message"
          placeholder="Nhập tin nhắn..."
          />
          <button
            disabled={!!!values.message}
            type="submit"
            className={classNames(
              "px-3 flex items-center justify-center absolute right-0 top-0 bottom-0 rounded-md m-1 transition-all",
              values.message.length > 0 ? "bg-black" : "bg-white",
            )}
          >
            <SendHorizonal
              className="transition-all"
              size={18}
              color={values.message.length > 0 ? "white" : "black"}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default memo(AdminChatBody);
