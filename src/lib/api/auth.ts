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

export type Login = z.infer<typeof LoginSchema>;
export type RegisterUser = z.infer<typeof RegisterUserSchema>;

export const login = async (requestData: Login) => {
  const { data } = await api.post<JWTResponse>("/auth/login", requestData);
  return data;
};

export const register = async (requestData: RegisterUser) => {
  const { data } = await api.post<RegisterUserResponse>(
    "/auth/register",
    requestData,
  );
  return data;
};

export const refresh = async () => {
  const { data } = await api.post<JWTResponse>("/auth/refresh");
  return data;
};

export const me = async () => {
  const { data } = await api.get<MeResponse>("/auth/me");
  return data;
};

export const logout = async () => {
  const { data } = await api.post<void>("/auth/logout");
  return data;
};
