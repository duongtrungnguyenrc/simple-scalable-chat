"use client";

import { Button, Form, Input, InputNumber, Modal } from "antd";
import React, { FC, useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { useCreateChatRoom } from "@app/actions/chat";

type IProps = {};

const CreateRoomModal: FC<IProps> = ({}) => {
  const [displayModal, setDisplayModal] = useState(false);
  const { mutate: onCreateChatRoom, isSuccess } = useCreateChatRoom();

  useEffect(() => {
    isSuccess && setDisplayModal(false);
  }, [isSuccess]);

  return (
    <>
      <Button
        type="dashed"
        iconPosition="end"
        onClick={() => setDisplayModal(true)}
        icon={<PlusCircle size={14} />}
      >
        Tạo phòng
      </Button>
      <Modal
        destroyOnClose
        title="Tạo phòng mới"
        centered
        open={displayModal}
        onOk={() => setDisplayModal(false)}
        onCancel={() => setDisplayModal(false)}
        footer
      >
        <div className="pt-2">
          <Form name="signup" layout="vertical" onFinish={onCreateChatRoom}>
            <div className="grid grid-cols-2 gap-x-3 w-full">
              <Form.Item
                name="name"
                label="Tên Phòng"
                rules={[
                  { required: true, message: "Vui lòng nhập tên phòng!" },
                ]}
              >
                <Input placeholder="Super Car Community..." />
              </Form.Item>
              <Form.Item name="maxMembers" label="Số người tối đa">
                <InputNumber
                  min={1}
                  placeholder="10"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
            <Form.Item name="password" label="Mật khẩu (tùy chọn)">
              <Input type="password" placeholder="Mật khẩu" />
            </Form.Item>

            <Form.Item>
              <Button className="mt-3" block type="primary" htmlType="submit">
                Tạo phòng
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default CreateRoomModal;
