import { api } from "@/lib/api/client.ts";

export type Url = {
  id: string;
  originalUrl: string;
  shortenedUrl: string;
  clicks: number;
  createdAt: string;
};

export const fetchUrls = async () => {
  const { data } = await api.get<Url[]>("/urls");
  return data;
};
