

import { useState } from "react";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { EyeIcon, EyeOffIcon, UserIcon, AppleIcon,  XIcon } from "lucide-react" // adjust path
import { BsGoogle } from "react-icons/bs";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import LoadingComponent from "@/utils/utils.loading";



// Zod validation
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [login,{isLoading}] = useLoginMutation();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginFormValues) => {
    console.log("submit clicked")
    try {
      await login(values).unwrap();
      // handle success, e.g., redirect
      console.log(values);
      toast.success("Login Successfully")
      navigate('/')

    } catch (error:any) {
      console.log(error);
      toast.error(`Login failed because${error.message}`)
      // handle error, show toast or form error
    }
  };


  if(isLoading)
  {
    return <LoadingComponent/>
  }

  return (
    <div className="flex items-center justify-center h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="w-full max-w-sm p-6 space-y-6 bg-white dark:bg-black rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-lg">
        {/* Header */}
        <ToastContainer/>
        <div className="text-center space-y-3">
          <div className="inline-flex p-2 bg-zinc-100 dark:bg-zinc-900 rounded-md border border-zinc-200 dark:border-zinc-800">
            <UserIcon className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
          </div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">Welcome back</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Enter your credentials to sign in</p>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-3 gap-2">
          {[AppleIcon, BsGoogle, XIcon].map((Icon, idx) => (
            <Button
              key={idx}
              variant="outline"
              className="flex items-center justify-center h-9"
            >
              <Icon className="h-5 w-5" />
            </Button>
          ))}
        </div>

        <div className="relative text-center">
          <span className="absolute left-0 right-0 top-1/2 border-t border-zinc-200 dark:border-zinc-800" />
          <span className="relative px-2 text-xs bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400">
            Or continue with
          </span>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...field}
                      className="pr-10"
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full h-9">
              Sign In
            </Button>
          </form>
        </Form>

        <div className="text-center space-y-2">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Don't have an account?{" "}
            <a href="/auth/register" className="underline">
              Sign up
            </a>
          </p>
          <a href="#" className="text-sm underline text-zinc-900 dark:text-zinc-50">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
}
