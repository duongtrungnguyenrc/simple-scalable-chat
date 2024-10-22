'use client';

import React, { FC } from "react";
import { Button, Form, Input } from 'antd';
import Link from "next/link";

interface IProps {
    className?: string;
};

const SignUpForm: FC<IProps> = ({ className }) => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <div className={className}>
            <Form
                name="signup"
                layout="vertical"
                onFinish={onFinish}
            >
                <div className="grid grid-cols-2 gap-x-3 w-full">
                    <Form.Item
                        name="username"
                        label="Tên tài khoản"
                        rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản!' }]}
                    >
                        <Input placeholder="Tên người dùng" />
                    </Form.Item>
                    <Form.Item
                        name="displayName"
                        label="Tên hiển thị"
                        rules={[{ required: true, message: 'Vui lòng nhập tên hiển thị!' }]}
                    >
                        <Input placeholder="Tên hiển thị" />
                    </Form.Item>
                </div>
                <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                >
                    <Input type="password" placeholder="Mật khẩu" />
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    label="Mật khẩu"
                    rules={[{ required: true, message: 'Nhập lại mật khẩu không đúng!' }]}
                >
                    <Input type="confirmPassword" placeholder="Nhập lại mật khẩu" />
                </Form.Item>

                <Form.Item>
                    <Button className="mt-3" block type="primary" htmlType="submit">
                        Đăng ký
                    </Button>
                    <p className="text-center mt-2">hoặc <Link href="/sign-in">Đăng nhập ngay</Link></p>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SignUpForm;