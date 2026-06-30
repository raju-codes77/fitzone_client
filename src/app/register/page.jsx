"use client";

import { useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { Button, Input, TextField, Label } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { authClient, signUp } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";



export default function RegisterPage() {
       const [error, setError] = useState("");
       const [loading, setLoading] = useState(false);
       const [imageUrl, setImageUrl] = useState("");
       const [uploading, setUploading] = useState(false);
       const router=useRouter();

       const {
              register,
              handleSubmit,
              reset,
              formState: { errors },
       } = useForm();

       const handleImageUpload = async (e) => {
                     const file = e.target.files?.[0];

                     if (!file) return;

                     setUploading(true);

                     const formData = new FormData();
                     formData.append("image", file);

                     try {
                            const res = await fetch(
                                   `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
                                   {
                                          method: "POST",
                                          body: formData,
                                   }
                            );

                            const result = await res.json();

                            if (result.success) {
                                   setImageUrl(result.data.url);
                                   toast.success("Image uploaded successfully!");
                            } else {
                                   toast.error("Image upload failed");
                            }
                     } catch (error) {
                            console.error(error);
                            toast.error("Image upload failed");
                     } finally {
                            setUploading(false);
                     }
              };

       const onSubmit = async (data) => {
              setError("");
              setLoading(true);

              const { name, email, password } = data;
              console.log(data)

              // validation
              if (password.length < 6) {
                     setLoading(false);
                     return setError("Password must be at least 6 characters long");
              }

              if (!/[A-Z]/.test(password)) {
                     setLoading(false);
                     return setError("Password must contain at least one uppercase letter");
              }

              if (!/[a-z]/.test(password)) {
                     setLoading(false);
                     return setError("Password must contain at least one lowercase letter");
              }
              

              const result = await signUp.email({
                     email,
                     password,
                     name,
                     image: imageUrl,
                     role: "user"
              });

              if (result.error) {
                     setError(result.error.message);
                     setLoading(false);
                     toast.error(result.error.message);
                     return;
              }
              else {
                     await authClient.signOut();
                     toast.success("Account created successfully!");
                     window.location.replace("/login")
              }



              reset();
              setImageUrl("");
              setLoading(false);
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
                                                 Transform Your Body & Life
                                          </span>

                                          <h1 className="max-w-xl text-6xl font-extrabold text-white">
                                                 Start Your
                                                 <span className="block text-lime-400">
                                                        Fitness Journey
                                                 </span>
                                          </h1>

                                          <p className="mt-6 max-w-lg text-lg text-zinc-300">
                                                 Join thousands of members achieving their goals through expert trainers and personalized workouts.
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
                                                        Create Account
                                                 </h2>

                                                 <p className="mt-2 text-lime-400">
                                                        Join FitZone and start your transformation
                                                 </p>
                                          </div>

                                          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                                 <TextField isRequired>
                                                        <Label>Full Name</Label>
                                                        <Input
                                                               placeholder="Enter your full name"
                                                               {...register("name", { required: true })}
                                                        />
                                                 </TextField>

                                                 <TextField isRequired>
                                                        <Label>Email</Label>
                                                        <Input
                                                               type="email"
                                                               placeholder="Enter your email"
                                                               {...register("email", { required: true })}
                                                        />
                                                 </TextField>

                                                 <div className="space-y-2">
                                                        <Label>Profile Photo</Label>

                                                        <Input
                                                               type="file"
                                                               accept="image/*"
                                                               onChange={handleImageUpload}
                                                        />

                                                        {uploading && (
                                                               <p className="text-sm text-lime-400">
                                                                      Uploading image...
                                                               </p>
                                                        )}

                                                        {imageUrl && (
                                                               <Image
                                                                      src={imageUrl}
                                                                      alt="Preview"
                                                                      width={80}
                                                                      height={80}
                                                                      className="rounded-full object-cover"
                                                               />
                                                        )}
                                                 </div>

                                                 <TextField isRequired>
                                                        <Label>Password</Label>
                                                        <Input
                                                               type="password"
                                                               placeholder="Create password"
                                                               {...register("password", { required: true })}
                                                        />
                                                 </TextField>

                                                 <p className="text-xs text-zinc-400">
                                                        Minimum 6 characters, one uppercase letter and one lowercase letter.
                                                 </p>

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
                                                        Create Account
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
                                                 Already have an account?{" "}
                                                 <NextLink href="/login" className="font-semibold text-lime-400">
                                                        Login
                                                 </NextLink>
                                          </p>
                                   </div>
                            </div>
                     </div>
              </section>
       );
}