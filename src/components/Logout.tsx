import type { ReactNode } from "react";
import { useAuthMutations } from "@/hooks/useAuthMutations.ts";

interface LogoutProps {
  children: ReactNode;
}

export default function Logout({ children }: LogoutProps) {
  const { logoutMutation } = useAuthMutations();

  const handleOnClick = () => {
    logoutMutation.mutate(void 0, {
      onError: (error) => {
        console.log(error.response?.data.message);
      },
    });
  };

  return <div onClick={handleOnClick}>{children}</div>;
}
