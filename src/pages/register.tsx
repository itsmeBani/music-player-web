
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";


import { Input } from "@/components/ui/input.tsx";

import { Link } from "react-router";
import {useAuth} from "@/context/AuthProvider.tsx";
import {Loader} from "lucide-react";
import logo from "@/assets/LOGOAPP.png";

function Register() {

  const {RegisterForm,RegisterUser,loadingRegister}=useAuth()



    return (
        <section className={"h-[100dvh] bg-image-concert flex w-full  bg-[#191919]"}>
            <div className={"grid h-full lg:grid-cols-2 overflow-hidden"}>
                <div className="p-5 z-3 lg:p-30 flex gap-4 flex-col justify-center">
                    <div className="w-full flex flex-col  place-items-center">

                        <div className="pb-5">
                            <img alt="" className="h-10"
                                 src={logo}/>
                        </div>
                        <h1 className={"text-3xl lg:text-4xl text-white PlusJakartaSans-Bold"}>
                            Create Account
                        </h1>
                        <p className={"text-md lg:text-lg text-center text-white/80 PlusJakartaSans-Regular"}>
                            Sign up to listen to your favorite tracks anytime, anywhere.
                        </p>
                    </div>
                    <Form {...RegisterForm}>
                        <form
                            onSubmit={RegisterForm.handleSubmit(RegisterUser)}
                            className="flex flex-col gap-4"
                        >
                            {/* Username */}
                            <FormField
                                control={RegisterForm.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem className={"w-full"}>
                                        <FormLabel className="PlusJakartaSans-Regular text-white/80">
                                            Username
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className={
                                                    "text-white PlusJakartaSans-Regular"
                                                }
                                                placeholder="Your username"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className={"text-[#df6d6d]"} />
                                    </FormItem>
                                )}
                            />

                            {/* Email */}
                            <FormField
                                control={RegisterForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className={"w-full"}>
                                        <FormLabel className="PlusJakartaSans-Regular text-white/80">
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className={
                                                    "text-white PlusJakartaSans-Regular"
                                                }
                                                placeholder="you@example.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className={"text-[#df6d6d]"} />
                                    </FormItem>
                                )}
                            />

                            {/* Password */}
                            <FormField
                                control={RegisterForm.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className={"w-full"}>
                                        <FormLabel className="PlusJakartaSans-Regular text-white/80">
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                className={
                                                    "text-white PlusJakartaSans-Regular"
                                                }
                                                placeholder="Enter password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className={"text-[#df6d6d]"} />
                                    </FormItem>
                                )}
                            />

                            {/* Confirm Password */}
                            <FormField
                                control={RegisterForm.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem className={"w-full"}>
                                        <FormLabel className="PlusJakartaSans-Regular text-white/80">
                                            Confirm Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                className={
                                                    "text-white PlusJakartaSans-Regular "
                                                }
                                                placeholder="Confirm password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className={"text-[#df6d6d]"} />
                                    </FormItem>
                                )}
                            />

                            <button disabled={loadingRegister} className={"bg-[#1DB954]  place-items-center py-3 rounded-full PlusJakartaSans-Bold hover:bg-unset text-white text-shadow-lg"} type="submit">
                                {loadingRegister ? <Loader  className={"animate-spin"} color={"white"}/> :"Register"}
                            </button>
                        </form>
                    </Form>
                    <div>
                        <p className={"text-center text-sm lg:text-md text-white PlusJakartaSans-Regular"}>
                            Already have an account?{" "}
                            <Link to={"/login"}>
                <span className="text-[#0e6] PlusJakartaSans-SemiBold underline">
                  Log in
                </span>
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="absolute inset-0 z-1 w-full h-full bg-gradient-to-r from-black/100 via-black/90 lg:to-transparent to-black/70 " />

                <div className="flex relative">
                       </div>
            </div>
        </section>
    );
}

export default Register;
