"use client"

import { useState } from "react"
import { z } from "zod"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCreateUserMutation } from "@/redux/features/auth/auth.api"

import { toast } from "sonner"

import { useNavigate } from "react-router"

// Zod Schema
const createUserSchemaForm = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters."),
  role: z.enum(["RIDER", "DRIVER","ADMIN"], { message: "Please select a role" }),
})

export default function SigninForm() {


  const navigate = useNavigate();




  const [step, setStep] = useState(1)
  const [createUser] = useCreateUserMutation()

  // react-hook-form
  const form = useForm<z.infer<typeof createUserSchemaForm>>({
    resolver: zodResolver(createUserSchemaForm),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "RIDER",
    },
    mode: "onTouched", // show errors after touch
  })

  // handle submission
  const onSubmit = async (data: z.infer<typeof createUserSchemaForm>) => {

    const toastId = toast.loading("Process..")
    try {
      const res = await createUser(data).unwrap()
      console.log("Created user:", res)


      toast.success("Registation Successfully",{id:toastId});

      // navigate to home

      navigate('/');

      console.log("click")

      


    } catch (err:any) {
      console.error(err?.data);

      toast.error(err?.data?.message)
      
    }
  }

  // handle next step with validation
  const handleNext = async () => {

 


    let valid = false
    if (step === 1) valid = await form.trigger(["name", "role"])
    if (step === 2) valid = await form.trigger(["email", "password"])
    if (valid) setStep(step + 1)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md p-6 space-y-6 shadow-md">
        <h1 className="text-2xl font-semibold text-center">Create Account</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            {/* Step 1: Full Name + Role */}
            {step === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant={field.value === "RIDER" ? "default" : "outline"}
                          onClick={() => field.onChange("RIDER")}
                        >
                          Rider
                        </Button>
                        <Button
                          type="button"
                          variant={field.value === "DRIVER" ? "default" : "outline"}
                          onClick={() => field.onChange("DRIVER")}
                        >
                          Driver
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="button" className="w-full" onClick={handleNext}>
                  Next
                </Button>
              </>
            )}

            {/* Step 2: Email + Password */}
            {step === 2 && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="name@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button type="button" onClick={handleNext}>
                    Next
                  </Button>
                </div>
              </>
            )}

            {/* Step 3: Review + Submit */}
            {step === 3 && (
              <>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md border border-gray-200 dark:border-gray-800">
                  <h3 className="font-medium mb-2">Review your details:</h3>
                  <ul className="space-y-1 text-sm">
                    <li><strong>Name:</strong> {form.getValues("name")}</li>
                    <li><strong>Email:</strong> {form.getValues("email")}</li>
                    <li><strong>Role:</strong> {form.getValues("role")}</li>
                  </ul>
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button type="submit">Create Account</Button>
                </div>
              </>
            )}

          </form>
        </Form>
      </Card>
    </div>
  )
}
