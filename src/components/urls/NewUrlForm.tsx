import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { FieldGroup, RootError } from "@/components/ui/field.tsx";
import { useMutation } from "@tanstack/react-query";
import {
  type NewUrl,
  type NewUrlResponse,
  shortenUrl,
} from "@/lib/api/urls.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewUrlSchema } from "@/schemas";
import { FormInput } from "@/components/form.tsx";
import type { AxiosError } from "axios";

export default function NewUrlForm() {
  const form = useForm<NewUrl>({
    defaultValues: {
      url: "",
    },
    resolver: zodResolver(NewUrlSchema),
    mode: "onChange",
  });

  const mutation = useMutation<
    NewUrlResponse,
    AxiosError<{ url?: string; message?: string }>,
    NewUrl
  >({
    mutationFn: shortenUrl,
    onError: (e) => {
      let url, message;
      if (e.response?.data) {
        url = e.response.data.url;
        message = e.response.data.message;
      }

      if (url) {
        form.setError("url", {
          message: url,
        });
      }

      if (message) {
        form.setError("root", {
          message: e.response?.data.message || "Something went wrong",
        });
      }
    },
  });

  const onSubmit = (data: NewUrl) => {
    mutation.mutate(data);
  };

  return (
    <Dialog>
      <form id="new-url-form" onSubmit={form.handleSubmit(onSubmit)}>
        <DialogTrigger asChild>
          <Button variant="outline">New URL</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate a new short URL</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <FormInput name="url" label="Original URL" control={form.control} />
          </FieldGroup>
          <DialogFooter>
            <RootError error={form.formState.errors.root} />
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="cursor-pointer"
              form="new-url-form"
            >
              Generate
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
