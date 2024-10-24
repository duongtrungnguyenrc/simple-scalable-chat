"use client";

import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AxiosError, AxiosResponse } from "axios";

import { api } from "@app/configs";

export const useChatRooms = (
  limit: number = 20
): UseInfiniteQueryResult<
  InfiniteData<InfiniteResponse<Room>, unknown>,
  AxiosError<ErrorResponse, any>
> => {
  return useInfiniteQuery<
    InfiniteResponse<Room>,
    AxiosError<ErrorResponse, any>,
    InfiniteData<InfiniteResponse<Room>, unknown>,
    (string | number | undefined)[],
    number
  >({
    queryKey: ["chat-rooms"],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await api.get("/chat", {
        params: {
          page: pageParam,
          limit,
        },
      });

      return data;
    },
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useChatMessages = (
  roomId?: string,
  limit: number = 20
): UseInfiniteQueryResult<
  InfiniteData<InfiniteResponse<Message>, unknown>,
  AxiosError
> => {
  return useInfiniteQuery<
    InfiniteResponse<Message>,
    AxiosError,
    InfiniteData<InfiniteResponse<Message>, unknown>,
    (string | number | undefined)[]
  >({
    queryKey: ["chat-messages", roomId],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await api.get(`/chat/${roomId}/message`, {
        params: {
          page: pageParam,
          limit,
        },
      });

      return data;
    },
    enabled: !!roomId,
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useCreateChatRoom = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, any>({
    mutationKey: ["create-room"],
    mutationFn: async (payload: CreateChatRoomDto) => {
      const { status } = await api.post("/chat", payload);

      if (status == 201) {
        router.push("/rooms");
        toast.success("Tạo phòng thành công");
        await queryClient.refetchQueries({
          queryKey: ["chat-rooms"],
        });
      }
    },
  });
};

export const useJoinRoom = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, any>({
    mutationKey: ["join-room"],
    mutationFn: async ({ id, password }: JoinChatRoomDto) => {
      const { status } = await api.post(`/chat/join/${id}`, {
        password,
      });

      if (status == 201) {
        router.push("/rooms");
        toast.success("Tham gia Phòng thành công");
        await queryClient.refetchQueries({
          queryKey: ["chat-rooms"],
        });
      }
    },
  });
};

export const useLeaveRoom = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, any>({
    mutationKey: ["leave-room"],
    mutationFn: async (id: string) => {
      const { status } = await api.post(`/chat/leave/${id}`);

      if (status == 201) {
        toast.success("Rời Phòng thành công");
        await queryClient.refetchQueries({
          queryKey: ["chat-rooms"],
        });
      }
    },
  });
};

export const useDeleteRoom = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, any>({
    mutationKey: ["delete-room"],
    mutationFn: async (id: string) => {
      const { status } = await api.delete(`/chat/${id}`);

      if (status == 201) {
        toast.success("Xoá Phòng thành công");
        await queryClient.refetchQueries({
          queryKey: ["chat-rooms"],
        });
      }
    },
  });
};

export const useFindRoom = (id: string) => {
  return useQuery<FindChatRoomResponseDto[], AxiosError<ErrorResponse, any>>({
    queryKey: ["room", id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const { data }: AxiosResponse<FindChatRoomResponseDto[]> = await api.get(
        `/chat/${id}`
      );

      return data;
    },
  });
};
