"use client";

import { useMutation } from "@tanstack/react-query";

import { api } from "@app/configs";
import { AxiosError } from "axios";
import { useAuth } from "@app/common";

export const useSignIn = () => {
  const { setAuth } = useAuth();

  return useMutation<any, AxiosError, any>({
    mutationKey: ["sign-in"],
    mutationFn: async (payload: SignInDto) => {
      try {
        const { status, data } = await api.post("/auth/sign-in", payload);

        if (status == 200) {
          setAuth(data);
        }
      } catch (error) {
        console.log((error as any).message);
      }
    },
  });
};

export const useSignOut = () => {
  const { setAuth } = useAuth();

  return useMutation<any, AxiosError, any>({
    mutationKey: ["sign-out"],
    mutationFn: async () => {
      try {
        const { status } = await api.post("/auth/sign-out", {});

        if (status == 200) {
          setAuth(null);
        }
      } catch (error) {
        console.log((error as any).message);
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
