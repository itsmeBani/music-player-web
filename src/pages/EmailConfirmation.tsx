    import {Navigate, useNavigate, useSearchParams} from "react-router";
    import json from "../assets/success.json"
    import Lottie from "react-lottie";
    import axios from "axios";
    import {BACKEND_AUTH_BASE_URL} from "../../constant.ts";
    import {useEffect, useState} from "react";
    import {Loader} from "lucide-react";
    import {toast} from "sonner";

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: json,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    function EmailConfirmation() {
        const [searchParams] = useSearchParams();
        const navigate = useNavigate();
        const confirmation_token = searchParams.get('token');
        const confirmation_email = searchParams.get('email');
        const [countdown, setCountdown] = useState(10);
       const [loading, setLoading]=useState(true)
        useEffect(() => {
            getConfirmation()
        }, [confirmation_email, confirmation_token])

        useEffect(() => {
            if (!loading) {
                const interval = setInterval(() => {
                    setCountdown((prev) => (prev > 1 ? prev - 1 : prev));
                }, 1000);

                const timeout = setTimeout(() => {
                    navigate("/");
                }, 10000);

                return () => {
                    clearInterval(interval);
                    clearTimeout(timeout);
                };
            }
        }, [loading, navigate]);
        if (!confirmation_token || !confirmation_email) return <Navigate to={"/"} replace={true}/>

        const getConfirmation: () => void = async () => {
            try {
                const response = await
                    axios.get(`${BACKEND_AUTH_BASE_URL}/api/account/confirmemail?token=${encodeURIComponent(confirmation_token)}&email=${encodeURIComponent(confirmation_email)}`)
                   if (response.status === 200){
                       setLoading(false)
                       // this is it for now
                   }
            } catch (e) {
                console.log(e)
                toast.error("Failed to Verify Email")

            }
        }

        if (loading) return   <div className={"w-full flex h-screen place-items-center justify-center"}><Loader size={30} className={"animate-spin mr-2"}/><p className={"PlusJakartaSans-Regular"}>Verifying...</p></div>

        return (
            <section className={"w-full h-[100dvh] flex place-items-center justify-center bg-[#191919]"}>
                <div className="p-10 bg-[#212121] flex flex-col border max-w-130 border-white/50 rounded-md">

                    <div className="relative flex place-items-center justify-center w-full h-[100px]">
                        <div className={"absolute "}>
                            <Lottie
                                options={defaultOptions}
                                height={300}
                                width={200}
                            />
                        </div>
                    </div>
                    <h1 className={"text-center PlusJakartaSans-Bold text-lg mt-10 text-[#0e6]"}>Your email has been
                        successfully verified!</h1>

                    <p className={"text-center "}>
                        your account is now ready to use, and you can continue exploring
                    </p>
                    <div
                          className={"PlusJakartaSans-Bold flex justify-center text-white  py-3 px-5 mt-5 rounded-full bg-[#1DB954]/70"}>
                        Redirecting to Home ({countdown}s)
                    </div>

                </div>
            </section>
        );
    }

    export default EmailConfirmation;