"use client";

import React, { FC } from "react";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import { useSignUp } from "@app/actions";

type IProps = {
  className?: string;
};

const SignUpForm: FC<IProps> = ({ className }) => {
  const { mutate: onSignUp, error } = useSignUp();

  return (
    <div className={className}>
      <Form name="signup" layout="vertical" onFinish={onSignUp}>
        <div className="grid grid-cols-2 gap-x-3 w-full">
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Input placeholder="Tên người dùng" />
          </Form.Item>
          <Form.Item
            name="name"
            label="Tên hiển thị"
            rules={[{ required: true, message: "Vui lòng nhập tên hiển thị!" }]}
          >
            <Input placeholder="Tên hiển thị" />
          </Form.Item>
        </div>
        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password placeholder="Mật khẩu" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Nhập lại mật khẩu"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập lại mật khẩu!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Nhập lại mật khẩu không đúng!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Nhập lại mật khẩu" />
        </Form.Item>

        {error && (
          <label className="text-red-500 transition-all text-xs">
            {error.message}
          </label>
        )}

        <Form.Item>
          <Button className="mt-3" block type="primary" htmlType="submit">
            Đăng ký
          </Button>
          <p className="text-center mt-2">
            hoặc <Link href="/sign-in">Đăng nhập ngay</Link>
          </p>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUpForm;
