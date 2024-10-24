"use client";

import React, { FC, useState } from "react";
import { Button, Popover } from "antd";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import CreateRoomModal from "./CreateRoomModal";
import { useSignOut } from "@app/actions";
import { useAuth } from "@app/common";

type IProps = {};

const Header: FC<IProps> = () => {
  const [open, setOpen] = useState(false);
  const { mutate: signOut } = useSignOut();
  const { auth } = useAuth();

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <header className="max-h-[80px] bg-white shadow-sm p-3 flex items-center border-b">
      <Link href="/" className="font-semibold">
        CHATCHIT.COM
      </Link>
      <div className="flex items-center flex-1 gap-x-4 justify-end">
        <CreateRoomModal />
        <Link href="/rooms">
          <Button type="primary">Danh sách phòng</Button>
        </Link>
        <div className="flex items-center gap-x-2">
          <h4 className="text-sm font-medium">{auth?.name}</h4>
          <Popover
            content={
              <button
                onClick={signOut}
                className="hover:bg-gray-50 text-sm py-2 px-1 rounded flex gap-x-2 items-center justify-center w-full border"
              >
                Đăng xuất <LogOut size={14} />
              </button>
            }
            title="Tùy chọn"
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
          >
            <div className="rounded-full overflow-hidden cursor-pointer w-8 h-8 relative">
              <Image
                src="/images/auth-bg.jpg"
                alt="avatar"
                fill
                className="object-cover"
              />
            </div>
          </Popover>
        </div>
      </div>
    </header>
  );
};

export default Header;
