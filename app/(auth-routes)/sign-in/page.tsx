"use client";

import { login } from "@/lib/auth";
import type { ApiError } from "@/lib/api";
import { useAuthStore } from "@/stores/authStore";
import { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as Yup from "yup";

interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = {
  email: "",
  password: "",
};

const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required!"),
  password: Yup.string().required("Password is required"),
});

export default function SignIn() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (user: User) => {
      setUser(user);
      router.replace("/");
      router.refresh();
    },
    onError: (error: ApiError) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(data) => mutate(data)}
      validationSchema={LoginSchema}
    >
      <Form>
        <Field type="email" name="email" />
        <Field type="password" name="password" />

        <button type="submit" disabled={isPending}>
          {isPending ? "Loading..." : "Submit"}
        </button>
      </Form>
    </Formik>
  );
}
