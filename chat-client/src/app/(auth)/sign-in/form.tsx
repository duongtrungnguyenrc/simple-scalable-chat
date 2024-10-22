'use client';

import React, { FC } from "react";
import { Button, Form, Input } from 'antd';
import Link from "next/link";

interface IProps {
    className?: string;
};

const LoginForm: FC<IProps> = ({ className }) => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <div className={className}>
            <Form
                name="login"
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    label="Tên tài khoản"
                    rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản!' }]}
                >
                    <Input placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                >
                    <Input type="password" placeholder="Password" />
                </Form.Item>

                <Form.Item>
                    <Button className="mt-3" block type="primary" htmlType="submit">
                        Đăng nhập
                    </Button>
                    <p className="text-center mt-2">hoặc <Link href="/sign-up">Đăng ký ngay</Link></p>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginForm;