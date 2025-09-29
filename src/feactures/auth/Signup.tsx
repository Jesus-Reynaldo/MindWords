// src/pages/SignUp.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { supabase } from "../core/lib/supabaseClient";


type FormData = {
  email: string;
  password: string;
  confirm: string;
};

export default function SignUp() {
  const nav = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ mode: "onBlur" });

  const pwd = watch("password");

  async function onSubmit(values: FormData) {
    setServerError(null);
    if (values.password !== values.confirm) {
      setServerError("Passwords do not match");
      return;
    }
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });
    if (error) return setServerError(error.message);
    nav("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-semibold text-gray-900">Create account</h1>
        <p className="text-sm text-gray-500 mt-1">
          Save your words and track your reviews.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 space-y-4">
          {/* Email */}
          <label className="block">
            <span className="text-sm font-medium text-gray-800">Email</span>
            <input
              type="email"
              placeholder="you@email.com"
              className="mt-1 w-full rounded-xl border border-gray-300 p-3 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Enter a valid email" },
              })}
            />
            {errors.email && (
              <span className="text-sm text-red-600">{errors.email.message}</span>
            )}
          </label>

          {/* Password */}
          <label className="block">
            <span className="text-sm font-medium text-gray-800">Password</span>
            <div className="mt-1 flex items-center rounded-xl border border-gray-300 p-0.5 pr-2">
              <input
                type={show ? "text" : "password"}
                placeholder="••••••••"
                className="w-full rounded-xl p-3 outline-none"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "At least 8 characters" },
                })}
              />
              <button
                type="button"
                onClick={() => setShow(s => !s)}
                className="text-sm text-gray-500 hover:text-gray-800"
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <span className="text-sm text-red-600">{errors.password.message}</span>
            )}
          </label>

          {/* Confirm */}
          <label className="block">
            <span className="text-sm font-medium text-gray-800">Confirm password</span>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full rounded-xl border border-gray-300 p-3 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
              {...register("confirm", { required: "Please confirm your password" })}
            />
          </label>

          {/* Weak indicator (super simple) */}
          {pwd && (
            <p className="text-xs text-gray-500">
              Tip: use at least 8 chars with numbers/letters.
            </p>
          )}

          {serverError && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {serverError}
            </div>
          )}

          <button
            disabled={isSubmitting}
            className="w-full rounded-xl bg-blue-600 p-3 text-white font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 disabled:opacity-60"
          >
            {isSubmitting ? "Creating…" : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
