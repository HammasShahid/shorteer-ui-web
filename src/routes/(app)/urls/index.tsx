import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchUrls, type Url } from "@/lib/api/urls.ts";
import type { AxiosError } from "axios";
import UrlItem from "@/components/urls/UrlItem.tsx";
import NewUrlForm from "@/components/urls/NewUrlForm.tsx";

export const Route = createFileRoute("/(app)/urls/")({
  component: UrlsComponent,
});

function UrlsComponent() {
  const { data, isLoading, isError, error } = useQuery<
    Url[],
    AxiosError<{ message?: string }>
  >({
    queryKey: ["urls"],
    queryFn: fetchUrls,
  });

  return (
    <div className="space-y-5">
      <h2 className="text-primary text-2xl font-bold">My Urls</h2>
      <NewUrlForm />

      {isLoading ? (
        <> Loading... </>
      ) : (
        <div className="flex flex-col gap-5">
          {data?.map((url) => (
            <UrlItem key={url.id} url={url} />
          ))}
        </div>
      )}
      {isError && (
        <div className="bg-red-200 text-red-500">
          {error.response?.data.message || "Something went wrong"}
        </div>
      )}
    </div>
  );
}
