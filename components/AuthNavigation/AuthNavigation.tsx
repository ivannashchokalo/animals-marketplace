"use client";

import { logout } from "@/lib/auth";
import { useAuthStore } from "@/stores/authStore";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AuthNavigation() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearIsAuthenticated();
      router.replace("/sign-in");
      router.refresh();
    },
    onError: () => {
      toast.error("Logout failed");
    },
  });
  return (
    <ul>
      {isAuthenticated ? (
        <li>
          <button type="button" onClick={() => mutate()} disabled={isPending}>
            {isPending ? "Logging out..." : "Logout"}
          </button>
        </li>
      ) : (
        <>
          <li>
            <Link href="/sign-in">Sign in</Link>
          </li>
          <li>
            <Link href="/sign-up">Sign up</Link>
          </li>
        </>
      )}
    </ul>
  );
}
