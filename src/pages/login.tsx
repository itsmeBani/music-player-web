
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useAuth} from "@/context/AuthProvider.tsx";

import {Input} from "@/components/ui/input.tsx";

import {Link} from "react-router";
import {Loader} from "lucide-react";
import logo from "@/assets/LOGOAPP.png";
function Login() {
    const {LoginWithEmailPassword,LoginForm,loadingLogin}=useAuth()

    return (
        <section className={"h-[100dvh] w-full bg-[#191919]"}>


            <div className={"grid h-full lg:grid-cols-2"}>

                <div className="p-5 lg:p-30 flex gap-4 flex-col justify-center">

                    <div className="w-full flex flex-col place-items-center">
                        <div className="pb-5">
                            <img alt="" className="h-10"
                                 src={logo}/>
                        </div>
                        <h1 className={"text-3xl lg:text-4xl text-white lg:leading-13 PlusJakartaSans-Bold"}>Welcome Back</h1>
                        <p className={"text-md text-center lg:px-0 px-4 lg:text-lg text-white PlusJakartaSans-Regular"}>Log in to continue enjoying your favorite tracks</p>
                    </div>
                    <Form {...LoginForm}>
                        <form onSubmit={LoginForm.handleSubmit(LoginWithEmailPassword)} className="flex flex-col gap-4">
                            <FormField
                                control={LoginForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className={"w-full"}>
                                        <FormLabel className="PlusJakartaSans-Regular text-white/80">Email</FormLabel>
                                        <FormControl >
                                            <Input   className={"text-white PlusJakartaSans-Regular  "} placeholder="shadcn" {...field} />
                                        </FormControl>

                                        <FormMessage className={"text-[#df6d6d]"} />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={LoginForm.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem  className={"w-full"}>
                                        <FormLabel className="PlusJakartaSans-Regular text-white/80">Password</FormLabel>

                                        <FormControl >
                                            <Input  className={"  text-white PlusJakartaSans-Regular"} placeholder="shadcn" {...field} />
                                        </FormControl>

                                        <FormMessage className={"text-[#df6d6d]"} />
                                    </FormItem>
                                )}
                            />
                            <button className={"bg-[#1DB954] flex place-items-center justify-center   h-[50px]  rounded-full PlusJakartaSans-Bold hover:bg-unset text-white text-shadow-lg"} type="submit">
                                {loadingLogin ? <Loader className={"animate-spin"} size={23} color={"white"}/> :"Submit"}
                            </button>
                        </form>
                    </Form>
                    <div>
                        <p className={"text-center text-white PlusJakartaSans-Regular"}>Don't Have an Account? <Link to={"/register"}><span className={"text-[#0e6] PlusJakartaSans-SemiBold underline"}>Register now</span></Link></p>
                    </div>
                </div>
                <div className={"hidden lg:flex h-full w-full "}>
                    <img className={"h-full flex object-cover"}  src={"https://ui.shadcn.com/placeholder.svg"}/>
                </div>
            </div>
        </section>
    );
}

export default Login;