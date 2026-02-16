"use client";

import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Controller } from "react-hook-form";
import useLogin from "./useLogin";
import { cn } from "@/utils/cn";
import { signIn } from "next-auth/react";

const Login = () => {
  const {
    isVisible,
    toggleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  } = useLogin();

  return (
    <section className="flex min-h-screen p-6">
      {/* Left Side - Form */}
      <div className="flex w-full flex-col justify-center px-1 md:w-1/2 lg:px-24">
        {/* <div className="mb-10">
          <Image
            src="/images/general/logogreen.jpg"
            alt="logo"
            width={140}
            height={40}
            priority
          />
        </div> */}

        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Selamat Datang Kembali
          </h2>
          <p className="mt-1 text-gray-500">
            Masukkan username dan kata sandi Anda untuk mengakses akun Anda.
          </p>
        </div>

        {errors.root && (
          <div className="mt-4 rounded-md bg-red-50 p-2 text-sm text-red-500">
            {errors?.root?.message}
          </div>
        )}

        <form
          className={cn(
            "mt-6 flex flex-col",
            Object.keys(errors).length > 0 ? "gap-3" : "gap-5",
          )}
          onSubmit={handleSubmit(handleLogin)}
        >
          {/* Email */}
          <Controller
            name="identifier"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  {...field}
                  value={field.value || ""}
                  type="text"
                  placeholder="Enter your username"
                  className={cn(
                    "w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:bg-white focus:outline-none",
                    errors.identifier && "border-red-500",
                  )}
                />
                {errors.identifier && (
                  <span className="mt-1 text-xs text-red-500">
                    {errors.identifier.message}
                  </span>
                )}
              </div>
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    {...field}
                    value={field.value || ""}
                    type={isVisible ? "text" : "password"}
                    placeholder="Enter your password"
                    className={cn(
                      "w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-3 pr-10 text-sm shadow-sm focus:border-indigo-500 focus:bg-white focus:outline-none",
                      errors.password && "border-red-500",
                    )}
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <Eye className="h-5 w-5" />
                    ) : (
                      <EyeOff className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <span className="mt-1 text-xs text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
            )}
          />

          <button
            type="submit"
            disabled={isPendingLogin}
            className="mt-4 flex items-center justify-center rounded-lg bg-green-950 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPendingLogin ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Tidak punya Akun?{" "}
          <button className="font-semibold text-green-950 hover:underline">
            Bisa Hubungi Admin
          </button>
        </p>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden w-1/2 items-center justify-center rounded-3xl bg-green-950 text-white lg:flex">
        <div className="max-w-md text-left">
          <h3 className="mb-4 text-2xl font-semibold">
            Satu akun untuk semua kebutuhan anda.
          </h3>
          <p className="mb-6 text-sm text-indigo-100">
            Login sebagai Daerah, Desa, atau Kelompok sesuai kebutuhanmu.
          </p>

          <Image
            src="/images/logo/ppg.png"
            alt="illustration"
            width={500}
            height={400}
            className="mx-auto rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
