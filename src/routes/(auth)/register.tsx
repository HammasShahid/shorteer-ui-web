import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import {
  FieldGroup,
  FieldSeparator,
  RootError,
} from "@/components/ui/field.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { RegisterUserSchema } from "@/schemas";
import { FormInput } from "@/components/form.tsx";
import { useAuthMutations } from "@/hooks/useAuthMutations.ts";
import { applyFormErrors } from "@/lib/api/error-handler.ts";
import type { RegisterUser } from "@/lib/api/auth.ts";

export const Route = createFileRoute("/(auth)/register")({
  component: RegisterComponent,
});

function RegisterComponent() {
  const form = useForm<RegisterUser>({
    resolver: zodResolver(RegisterUserSchema),
    mode: "onChange",
  });
  const { registerMutation, loginMutation } = useAuthMutations();

  async function onSubmit(data: RegisterUser) {
    registerMutation.mutate(data, {
      onSuccess: ({ email }, variables) => {
        loginMutation.mutate(
          {
            email,
            password: variables.password,
          },
          {
            onError: (error) => {
              applyFormErrors(
                form,
                error,
                "Account created, but login failed. Please login manually",
              );
            },
          },
        );
      },
      onError: (error) => {
        applyFormErrors(form, error);
      },
    });
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="register-user-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormInput
              name="username"
              label="Username"
              control={form.control}
            />

            <FormInput name="email" label="Email" control={form.control} />

            <FormInput
              name="password"
              label="Password"
              control={form.control}
            />

            <FormInput
              name="confirmPassword"
              label="Confirm Password"
              control={form.control}
            />

            <Button
              type="submit"
              form="register-user-form"
              className="w-full cursor-pointer"
              disabled={registerMutation.isPending || loginMutation.isPending}
            >
              Create account
            </Button>
          </FieldGroup>
          <RootError error={form.formState.errors.root} />
        </form>
      </CardContent>
      <FieldSeparator />
      <CardFooter>
        <p className="text-muted-foreground text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
