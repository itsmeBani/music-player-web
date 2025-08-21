import {useAuth} from "@/context/AuthProvider.tsx";
import {Navigate} from "react-router";
import HEADPHONE from "../assets/headphone-image.png"
function GetStarted() {
    const {loginWithSpotify}=useAuth()
     const {token} =useAuth()

     if (token) return  <Navigate to={"/login"} replace={true} />



    return (
        <section className="h-[100dvh] relative overflow-hidden w-full ">


            <div className={"w-full h-full lg:flex-row flex-col-reverse  flex place-items-center "}>
                <div className={"lg:p-10 z-1 p-5 lg:w-[60%]"}>
                    <h1 className={"text-[#0e6] text-2xl lg:text-6xl Kerif"}>Step Into a World Where Every Beat Tells your story</h1>
                    <p className={"PlusJakartaSans-Regular pt-2 pb-5 lg:text-2xl text-[#fff]/70"}>Stream your favorite tracks, discover hidden gems, and feel music like never before. </p>
                    <button onClick={loginWithSpotify} className={"bg-[#1DB954] lg:w-auto w-full px-10 py-3 rounded-full text-shadow-lg text-[#fff] PlusJakartaSans-Bold"}>Start Listening</button>

                </div>
                <div className="bg-black/65 absolute w-full h-full"/>
                <div className={"p-5 lg:p-0 flex place-items-center h-full justify-center w-full lg:w-auto "}>

                        <img src={HEADPHONE} className={"lg:absolute lg:rotate-40 -z-1 top-10  right-10 h-[70%] lg:h-[80%]"}/>

                </div>
            </div>
        </section>
    );
}

export default GetStarted;