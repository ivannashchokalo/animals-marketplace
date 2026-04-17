"use client";

import { logout } from "@/lib/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Logout() {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      router.replace("/auth/sign-in");
    },
    onError: () => {
      toast.error("Logout failed");
    },
  });

  return (
    <button type="button" onClick={() => mutate()} disabled={isPending}>
      {isPending ? "Logging out..." : "Logout"}
    </button>
  );
}
