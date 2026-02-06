import { LoginSchema, RegisterUserSchema } from "@/schemas";
import z from "zod";
import { api } from "@/lib/api/client.ts";

export type JWTResponse = {
  token: string;
};

export type RegisterUserResponse = {
  id: string;
  email: string;
  username: string;
};

type MeResponse = {
  id: string;
  email: string;
  username: string;
};

export const login = async (requestData: z.infer<typeof LoginSchema>) => {
  const { data } = await api.post<JWTResponse>("/auth/login", requestData);
  // const res = await api.post("/auth/login", data);
  // return res.data as JWTResponse;
  return data;
};

export const register = async (
  requestData: z.infer<typeof RegisterUserSchema>,
) => {
  const { data } = await api.post<RegisterUserResponse>(
    "/auth/register",
    requestData,
  );
  // const res = await api.post("/auth/register", data);
  // return res.data as RegisterUserResponse;
  return data;
};

export const refresh = async () => {
  const { data } = await api.post<JWTResponse>("/auth/refresh");
  // const res = await api.post("/auth/refresh");
  // return res.data as JWTResponse;
  return data;
};

export const me = async () => {
  const { data } = await api.get<MeResponse>("/auth/me");
  // const res = await api.get<MeResponse>("/auth/me");
  // return res.data;
  return data;
};

export const logout = async () => {
  const { data } = await api.post<void>("/auth/logout");
  return data;
};
