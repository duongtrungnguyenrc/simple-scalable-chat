"use client";

import { useFindRoom, useJoinRoom } from "@app/actions";
import { Button, Form, Input, Radio, RadioChangeEvent } from "antd";
import { LockIcon } from "lucide-react";
import Link from "next/link";
import React, { FC, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface IProps {
  className?: string;
}

const JoinRoomForm: FC<IProps> = ({ className }) => {
  const [id, setRoomId] = useState<string>("");
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const { data } = useFindRoom(id);
  const { mutate: joinRoom, error } = useJoinRoom();

  const onInputId = useDebouncedCallback((id: string) => setRoomId(id), 300);

  const handleRoomChange = (event: RadioChangeEvent) => {
    setSelectedRoomId(event.target.value);
  };

  const onJoinRoom = ({ password }: { password?: string }) => {
    joinRoom({
      id: selectedRoomId,
      password,
    });
  };

  return (
    <div className={className}>
      <Input
        onChange={(event) => onInputId(event.target.value)}
        placeholder="Nhập ID phòng..."
      />
      <Form onFinish={onJoinRoom}>
        <div className="custom-scroll overflow-y-scroll max-h-[40vh] my-3 p-3">
          {data && (
            <Radio.Group onChange={handleRoomChange} className="w-full">
              {data.map(({ room, isPrivate }) => {
                return (
                  <label
                    key={`sr:${room._id}`}
                    htmlFor={`room:${room._id}`}
                    className="flex items-center gap-3 py-2 px-3 border rounded-md mb-2 cursor-pointer hover:bg-gray-100 w-full"
                  >
                    <Radio
                      id={`room:${room._id}`}
                      className="hidden"
                      value={room._id}
                      name="room"
                    />

                    <div className="flex-1 flex flex-col">
                      <h4 className="font-semibold text-sm text-black">
                        {room.name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {isPrivate ? "Yêu cầu mật khẩu" : "Phòng công khai"}
                      </p>
                    </div>

                    <span>{isPrivate && <LockIcon size={16} />}</span>
                  </label>
                );
              })}
            </Radio.Group>
          )}
        </div>

        {selectedRoomId &&
          data?.some(
            ({ room, isPrivate }) => room._id === selectedRoomId && isPrivate
          ) && (
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input type="password" placeholder="Mật khẩu phòng" />
            </Form.Item>
          )}

        {error && (
          <label className="text-red-500 transition-all text-xs">
            {error.message}
          </label>
        )}
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Tham gia
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default JoinRoomForm;
