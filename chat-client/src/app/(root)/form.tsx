'use client';

import { Button, Form, Input } from "antd";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { FC } from "react";

interface IProps {
    className?: string;
};

const JoinRoomForm: FC<IProps> = ({ className, ...props }) => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <div className={className}>
            <Form
                name="login"
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    label="ID Phòng"
                >
                    <Input placeholder="Nhập ID phòng..." />
                </Form.Item>
                <Form.Item>
                    {/* <Button block type="primary" htmlType="submit">
                        Tham gia
                    </Button> */}
                    <Link href="/rooms">
                        <Button block type="primary">
                            Tham gia
                        </Button>
                    </Link>
                </Form.Item>
            </Form>
        </div>
    );
};

export default JoinRoomForm;