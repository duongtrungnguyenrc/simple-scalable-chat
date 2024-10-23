"use client";

import { Button, Form, Input } from "antd";
import React, { FC } from "react";
import Link from "next/link";

import { useSignIn } from "@app/actions";

type IProps = {
  className?: string;
};

const LoginForm: FC<IProps> = ({ className }) => {
  const { mutate } = useSignIn();

  const onFinish = (data: SignInDto) => mutate(data);

  return (
    <div className={className}>
      <Form name="login" layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="email"
          label="Tên tài khoản"
          rules={[{ required: true, message: "Vui lòng nhập tên tài khoản!" }]}
        >
          <Input className="py-3" placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input className="py-3" type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button className="mt-3" block type="primary" htmlType="submit">
            Đăng nhập
          </Button>
          <p className="text-center mt-2">
            hoặc <Link href="/sign-up">Đăng ký ngay</Link>
          </p>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
