"use client";

import { FC, memo, useCallback, useState } from "react";
import { Popover } from "antd";
import ConfirmModal from "./ConfirmModal";
import { useDeleteRoom, useLeaveRoom } from "@app/actions";

type ChatActionMenuProps = {
  id: string;
  isYour: boolean;
};

const ChatActionMenu: FC<ChatActionMenuProps> = ({
  id,
  isYour,
}: ChatActionMenuProps) => {
  const [openState, setOpenState] = useState<boolean>(false);
  const [confirmModalOpenState, setConfirmModalOpenState] =
    useState<boolean>(false);

  const { mutate: onLeaveRoom } = useLeaveRoom();
  const { mutate: onDeleteRoom } = useDeleteRoom();

  const onCancelLeaveRoom = useCallback(
    () => setConfirmModalOpenState(false),
    [setConfirmModalOpenState]
  );

  const onConfirmLeaveRoom = useCallback(() => {
    (isYour ? onDeleteRoom : onLeaveRoom)(id);
    setConfirmModalOpenState(false);
  }, [onLeaveRoom, setConfirmModalOpenState, id]);

  return (
    <Popover
      content={
        <button
          onClick={() => setConfirmModalOpenState(true)}
          className="hover:bg-gray-50 text-sm py-2 px-1 rounded flex gap-x-2 items-center justify-center w-full border"
        >
          {isYour ? "Xoá phòng" : "Rời phòng"}
        </button>
      }
      title="Tùy chọn"
      trigger="click"
      open={openState}
      onOpenChange={setOpenState}
    >
      <div className="bg-gray-100 p-3 rounded-full flex items-center justify-center cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="currentColor"
          className="w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900"
        >
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
        </svg>
      </div>
      <ConfirmModal
        open={confirmModalOpenState}
        title={`Xác nhận ${isYour ? "xoá" : "rời"} phòng`}
        onCancel={onCancelLeaveRoom}
        onOk={onConfirmLeaveRoom}
        content={`Bạn có chắc chắn muốn ${
          isYour ? "xoá" : "rời"
        } phòng chat này ?`}
      />
    </Popover>
  );
};

export default memo(ChatActionMenu);
