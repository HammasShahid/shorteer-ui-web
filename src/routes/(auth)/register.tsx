import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FieldGroup, FieldSeparator } from "@/components/ui/field.tsx";
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

export const Route = createFileRoute("/(auth)/register")({
  component: RegisterComponent,
});

function RegisterComponent() {
  const form = useForm<z.infer<typeof RegisterUserSchema>>({
    resolver: zodResolver(RegisterUserSchema),
    mode: "onChange",
  });

  async function onSubmit(data: z.infer<typeof RegisterUserSchema>) {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const result = RegisterUserSchema.safeParse(data);
    console.log("Hello");
    if (!result.success) {
      return;
    }
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
                disabled={form.formState.isSubmitting}
              >
                Create account
              </Button>
            </FieldGroup>
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
