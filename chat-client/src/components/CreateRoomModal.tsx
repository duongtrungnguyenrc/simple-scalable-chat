'use client';

import { Button, Form, Input, Modal } from "antd";
import React, { FC, useState } from "react";
import { PlusCircle } from "lucide-react";

type IProps = { };

const CreateRoomModal: FC<IProps> = ({}) => {
    const [modalCreate, setModalCreate] = useState(false);

    const onFinish = (values: any) => {
        console.log(values);
    }

    return (<>
        <Button type="dashed" iconPosition="end" onClick={() => setModalCreate(true)} icon={<PlusCircle size={14} />}>
            Tạo phòng
        </Button>
        <Modal
            destroyOnClose
            title="Tạo phòng mới"
            centered
            open={modalCreate}
            onOk={() => setModalCreate(false)}
            onCancel={() => setModalCreate(false)}
            footer
        >
            <div className="pt-2">
                <Form
                    name="signup"
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <div className="grid grid-cols-2 gap-x-3 w-full">
                        <Form.Item
                            name="roomName"
                            label="Tên Phòng"
                            rules={[{ required: true, message: 'Vui lòng nhập tên phòng!' }]}
                        >
                            <Input placeholder="Super Car Community..." />
                        </Form.Item>
                        <Form.Item
                            name="size"
                            label="Số người tối đa"
                            rules={[{ required: true, message: 'Vui lòng nhập số người tối đa!' }]}
                        >
                            <Input type="number" placeholder="10" />
                        </Form.Item>
                    </div>
                    <Form.Item
                        name="roomPass"
                        label="Mật khẩu (tùy chọn)"
                    >
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
    </>)
};

export default CreateRoomModal;