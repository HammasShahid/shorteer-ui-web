import z from "zod";

import { api } from "@/lib/api/client.ts";
import { NewUrlSchema } from "@/schemas";

export type Url = {
  id: string;
  originalUrl: string;
  shortenedUrl: string;
  clicks: number;
  createdAt: string;
};

export type NewUrlResponse = {
  id: string;
  originalUrl: string;
  shortenedUrl: string;
};

export type NewUrl = z.infer<typeof NewUrlSchema>;

export const fetchUrls = async () => {
  const { data } = await api.get<Url[]>("/urls");
  return data;
};

export const shortenUrl = async (urlRequestData: NewUrl) => {
  const { data } = await api.post<NewUrlResponse>(
    "/urls/shorten",
    urlRequestData,
  );
  return data;
};
