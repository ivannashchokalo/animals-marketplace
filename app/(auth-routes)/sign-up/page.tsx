"use client";

import { register } from "@/lib/auth";
import { useMutation } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import { ApiError } from "next/dist/server/api-utils";
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

  const { mutate, isPending } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      router.replace("/");
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
