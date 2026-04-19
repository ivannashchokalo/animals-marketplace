"use client";

import { ApiError } from "@/app/api/api";
import { register } from "@/lib/auth";
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

const RegisterSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required!"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default function SignUp() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const { mutate, isPending } = useMutation({
    mutationFn: register,
    onSuccess: (user: User) => {
      setUser(user);
      router.replace("/");
      router.refresh(); // примусово перезапитує серверні компоненти і оновлює їхні дані без повного перезавантаження сторінки
    },
    onError: (error: ApiError) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(data) => mutate(data)}
      validationSchema={RegisterSchema}
    >
      <Form>
        <Field type="email" name="email" />
        <Field type="password" name="password" />

        <button type="submit" disabled={isPending}>
          {isPending ? "Creating account..." : "Sign up"}
        </button>
      </Form>
    </Formik>
  );
}
