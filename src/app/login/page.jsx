"use client";

import { useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { Button, Input, TextField, Label } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { useForm, Controller } from "react-hook-form";
import { authClient, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router=useRouter();

  const {
    control,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setError("");
    setLoading(true);

    console.log("FORM DATA:", data); // 🔥 debug

    const { email, password } = data;

    const result = await signIn.email({
      email,
      password,
    });

    if (result.error) {
      setError(result.error.message);
      toast.error(result.error.message);
      setLoading(false);
      return;
    }else{
      const{ data:token} = await authClient.token();

      
  
      console.log("JWT TOKEN:", token.token);
      localStorage.setItem("token", token.token)

        toast.success("Login successful!");
         router.push("/")
    }

   

    reset();
    setLoading(false);

    // redirect if needed
    // window.location.href = "/";
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <section className="min-h-screen bg-black">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Left Side */}
        <div className="relative hidden lg:block">
          <Image
            src="/signupbg.png"
            alt="Fitness Banner"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />

          <div className="absolute inset-0 flex flex-col justify-center px-16">
            <span className="mb-4 w-fit rounded-full border border-lime-500/30 bg-lime-500/10 px-4 py-2 text-sm font-medium text-lime-400">
              Welcome Back
            </span>

            <h1 className="max-w-xl text-6xl font-extrabold text-white">
              Continue Your
              <span className="block text-lime-400">
                Fitness Journey
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg text-zinc-300">
              Login to track your progress and workouts.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

            <div className="mb-8 text-center">
              <Image
                src="/logo.png"
                alt="FitZone"
                width={90}
                height={90}
                className="mx-auto"
              />

              <h2 className="mt-4 text-3xl font-bold text-white">
                Login
              </h2>

              <p className="mt-2 text-lime-400">
                Welcome back
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              {/* EMAIL */}
              <TextField isRequired>
                <Label>Email</Label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                    />
                  )}
                />
              </TextField>

              {/* PASSWORD */}
              <TextField isRequired>
                <Label>Password</Label>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter your password"
                    />
                  )}
                />
              </TextField>

              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                fullWidth
                isLoading={loading}
                className="bg-lime-500 font-bold text-black"
              >
                Login
              </Button>

              <Button
                type="button"
                fullWidth
                variant="bordered"
                onPress={handleGoogleLogin}
              >
                <FcGoogle className="text-xl" />
                Continue with Google
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-zinc-400">
              Don’t have an account?{" "}
              <NextLink href="/register" className="font-semibold text-lime-400">
                Sign Up
              </NextLink>
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}