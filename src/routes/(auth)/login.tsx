import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import {
  FieldGroup,
  FieldSeparator,
  RootError,
} from "@/components/ui/field.tsx";
import { FormInput } from "@/components/form.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import { useAuthMutations } from "@/hooks/useAuthMutations.ts";

export const Route = createFileRoute("/(auth)/login")({
  component: LoginComponent,
});

function LoginComponent() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
  });
  const { loginMutation } = useAuthMutations();

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    loginMutation.mutate(data, {
      onError: (error) => {
        form.setError("root", {
          message:
            error.response?.data?.message ?? "Login failed please try again.",
        });
      },
    });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="register-user-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormInput name="email" label="email" control={form.control} />
            <FormInput
              name="password"
              label="Password"
              control={form.control}
            />

            <Button
              type="submit"
              form="register-user-form"
              className="w-full cursor-pointer"
              disabled={form.formState.isSubmitting}
            >
              Login
            </Button>
          </FieldGroup>
          <RootError error={form.formState.errors.root} />
        </form>
      </CardContent>
      <FieldSeparator />
      <CardFooter>
        <p className="text-muted-foreground text-center text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="underline">
            Create an account
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
