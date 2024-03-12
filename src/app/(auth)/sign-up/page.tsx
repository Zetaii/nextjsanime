"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"

import { toast } from "sonner"
import { ZodError } from "zod"
import { useRouter } from "next/navigation"
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from "@/src/lib/validators/account-credentials-validator"
import { trpc } from "@/src/trpc/client"
import { Button, buttonVariants } from "@/src/components/ui/button"
import { Label } from "@/src/components/ui/label"
import { Input } from "@/src/components/ui/input"
import { cn } from "@/src/lib/utils"
import { Icons } from "@/src/components/Icons"
import Image from "next/image"

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  })

  const router = useRouter()

  const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
    onError: (err) => {
      if (err.data?.code === "CONFLICT") {
        toast.error("This email is already in use. Sign in instead?")

        return
      }

      if (err instanceof ZodError) {
        toast.error(err.issues[0].message)

        return
      }

      toast.error("Something went wrong. Please try again.")
    },
    onSuccess: ({ sentToEmail }) => {
      toast.success(`Verification email sent to ${sentToEmail}.`)
      router.push("/verify-email?to=" + sentToEmail)
    },
  })

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    mutate({ email, password })
  }

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0 mb-6">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center text-white">
            <Image
              src="/anime.png"
              alt="anime image"
              width={200}
              height={200}
            />
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>

            <Link
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5 text-white",
              })}
              href="/sign-in"
            >
              Already have an account? Sign-in
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    {...register("email")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                    placeholder="you@example.com"
                  />
                  {errors?.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-1 py-2">
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <Input
                    {...register("password")}
                    type="password"
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                    placeholder="Password"
                  />
                  {errors?.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button>Sign up</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
