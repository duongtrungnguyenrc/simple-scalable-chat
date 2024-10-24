"use client";

import { useMutation } from "@tanstack/react-query";

import { api } from "@app/configs";
import { AxiosError } from "axios";
import { useAuth } from "@app/common";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useSignIn = () => {
  const { setAuth } = useAuth();

  return useMutation<any, AxiosError, any>({
    mutationKey: ["sign-in"],
    mutationFn: async (payload: SignInDto) => {
      const { status, data } = await api.post("/auth/sign-in", payload);

      if (status == 200) {
        setAuth(data);
        toast.success("Đăng nhập thành công");
      }
    },
  });
};

export const useSignOut = () => {
  const { setAuth } = useAuth();

  return useMutation<any, AxiosError, any>({
    mutationKey: ["sign-out"],
    mutationFn: async () => {
      const { status } = await api.post("/auth/sign-out", {});

      if (status == 200) {
        setAuth(null);
        toast.success("Đăng xuất thành công");
      }
    },
  });
};

export const useSignUp = () => {
  const router = useRouter();

  return useMutation<any, AxiosError, any>({
    mutationKey: ["sign-up"],
    mutationFn: async (payload: SignUpDto) => {
      const { status } = await api.post("/auth/sign-up", payload);

      if (status == 201) {
        router.replace("/sign-in");
        toast.success("Đăng kí tài khoản mới thành công");
      }
    },
  });
};

export const checkAuth = async (): Promise<User | null> => {
  try {
    const { status, data } = await api.get("/auth/status");

    if (status == 200) return data;
  } catch (error) {
    console.log((error as any).message);
  }
  return null;
};
