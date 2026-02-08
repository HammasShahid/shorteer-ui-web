import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import type { AxiosError } from "axios";

export type ApiError = {
  message?: string;
  errors?: Record<string, string>;
};

export function applyFormErrors<T extends FieldValues>(
  form: UseFormReturn<T>,
  error: AxiosError<ApiError>,
  customRootError?: string,
) {
  const data = error.response?.data;
  if (!data) return;

  if (data.message) {
    form.setError("root", { message: data.message });
  } else if (customRootError) {
    form.setError("root", { message: customRootError });
  }

  if (data.errors) {
    for (const field in data.errors) {
      if (field in form.getValues())
        form.setError(field as Path<T>, { message: data.errors[field] });
    }
  }
}
