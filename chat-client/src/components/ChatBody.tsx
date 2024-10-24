"use client";

import React, { FC, memo, useRef, useState } from "react";
import { SendHorizonal } from "lucide-react";
import classNames from "classnames";

import { useChatMessages } from "@app/actions";
import ChatMessage from "./ChatMessage";
import ChatActionMenu from "./ChatActionMenu";

type AdminChatBodyProps = { activeRoom?: Room };

type InitialChatFormData = {
  message: string;
};

const initialChatFormValues: InitialChatFormData = {
  message: "",
};

const AdminChatBody: FC<AdminChatBodyProps> = ({
  activeRoom,
}: AdminChatBodyProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<InitialChatFormData>(
    initialChatFormValues
  );

  const { data } = useChatMessages(activeRoom?._id);

  const messages: Message[] =
    data?.pages.reduce<Message[]>(
      (prevMessages, page) => [...prevMessages, ...page.data],
      []
    ) || [];

  console.log(activeRoom?._id);

  return (
    <section className="bg-white flex-col h-full rounded col-span-9 md:flex hidden custom-scroll">
      {activeRoom ? (
        <>
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
              <h1 className="font-bold">{activeRoom?.name}</h1>
              <p className="font-semibold text-green-500 text-xs">
                Đang hoạt động
              </p>
            </div>
            <div className="flex-1 flex justify-end self-center">
              <ChatActionMenu id={activeRoom._id} isYour={true} />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scroll w-full py-5">
            {messages.map(({ _id, content, createdAt, from }) => {
              return (
                <ChatMessage key={_id} from={from} time={createdAt}>
                  {content}
                </ChatMessage>
              );
            })}
            <div ref={bottomRef} />
          </div>
          <div className="border-t w-full px-3 py-2 mb-5">
            <div className="flex gap-x-3 items-center relative border rounded-md overflow-hidden">
              <input
                onChange={(e) => {
                  setValues((prev) => ({
                    ...prev,
                    message: e.target.value,
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
                  values.message.length > 0 ? "bg-black" : "bg-white"
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
        </>
      ) : (
        <div className="flex flex-col items-center justify-center flex-1">
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="80px"
            height="80px"
            viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
              fill="#000000"
              stroke="none"
            >
              <path
                d="M2410 4786 c-339 -72 -583 -326 -640 -666 -14 -85 -8 -226 13 -307
l14 -53 -392 0 c-359 0 -395 -1 -414 -17 -14 -13 -133 -330 -386 -1033 l-365
-1016 0 -662 0 -663 25 -24 24 -25 2271 0 2271 0 24 25 25 24 0 663 0 662
-365 1016 c-253 703 -372 1020 -386 1033 -19 16 -55 17 -414 17 l-392 0 15 53
c21 76 22 295 0 372 -29 106 -58 172 -107 247 -113 173 -274 288 -481 345 -78
21 -260 26 -340 9z m285 -161 c213 -44 409 -224 476 -435 29 -91 35 -226 15
-320 -48 -227 -216 -410 -445 -484 l-66 -21 -55 -107 c-30 -60 -57 -108 -60
-108 -3 0 -29 47 -58 104 -51 101 -54 105 -100 121 -131 47 -216 98 -292 174
-254 255 -253 648 0 901 156 156 369 220 585 175z m-800 -1067 c93 -141 235
-254 386 -307 l53 -19 85 -168 c93 -183 108 -199 169 -178 22 7 42 38 113 178
l85 168 53 19 c150 53 293 166 386 307 l28 42 373 0 374 0 0 -560 0 -560
-1440 0 -1440 0 0 560 0 560 374 0 373 0 28 -42z m-1052 -1470 l-118 -328
-142 0 c-79 0 -143 3 -143 7 0 4 116 330 258 723 l257 716 3 -396 2 -395 -117
-327z m3584 393 c139 -387 253 -707 253 -712 0 -5 -64 -9 -142 -9 l-143 0
-118 328 -117 327 1 400 c0 220 3 393 6 385 4 -8 120 -332 260 -719z m-305
-436 c54 -148 98 -273 98 -277 0 -5 -242 -8 -538 -8 -504 0 -539 -1 -572 -19
-50 -26 -75 -68 -100 -171 -35 -140 1 -130 -455 -130 l-382 0 -20 23 c-12 12
-31 59 -43 107 -27 107 -52 147 -104 171 -38 17 -76 19 -573 19 -293 0 -533 3
-533 8 0 4 43 130 97 280 l98 272 1465 -2 1465 -3 97 -270z m-2162 -536 c26
-106 62 -161 130 -199 l45 -25 425 0 425 0 45 25 c68 38 104 93 130 199 l22
91 769 0 769 0 0 -560 0 -560 -2160 0 -2160 0 0 560 0 560 769 0 769 0 22 -91z"
              />
              <path
                d="M2222 4337 c-14 -14 -22 -36 -22 -57 0 -29 15 -48 122 -157 l122
-123 -122 -123 c-109 -111 -122 -127 -122 -159 0 -45 34 -78 80 -78 29 0 48
15 157 122 l123 122 123 -122 c111 -109 127 -122 159 -122 45 0 78 34 78 80 0
29 -15 48 -122 157 l-122 123 122 123 c109 111 122 127 122 159 0 45 -34 78
-80 78 -29 0 -48 -15 -157 -122 l-123 -122 -123 122 c-111 109 -127 122 -159
122 -23 0 -42 -8 -56 -23z"
              />
            </g>
          </svg>
          <p className="mt-3">Chọn phòng chat để bắt đầu</p>
        </div>
      )}
    </section>
  );
};

export default memo(AdminChatBody);
