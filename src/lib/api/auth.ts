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

export const login = async (data: z.infer<typeof LoginSchema>) => {
  const res = await api.post("/auth/login", data);
  return res.data as JWTResponse;
};

export const register = async (data: z.infer<typeof RegisterUserSchema>) => {
  const res = await api.post("/auth/register", data);
  return res.data as RegisterUserResponse;
};

export const refresh = async () => {
  const res = await api.post("/auth/refresh");
  return res.data as JWTResponse;
};

export const me = async () => {
  const res = await api.get("/auth/me");
  return res.data as MeResponse;
};
