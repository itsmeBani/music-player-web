import {useAuth} from "@/context/AuthProvider.tsx";
import {Navigate} from "react-router";

function GetStarted() {
    const {loginWithSpotify}=useAuth()
     const {token} =useAuth()

    if (token) return  <Navigate to={"/login"} replace={true} />



    return (
        <section className="h-[100dvh]  w-full bg-[#000000]/93">


            <div className={"w-full h-full flex place-items-center "}>
                <div className={"p-10 w-[60%]"}>
                    <h1 className={"text-[#0e6] text-6xl Kerif"}>Step Into a World Where Every Beat Tells your story</h1>
                    <p className={"PlusJakartaSans-Regular pb-5 text-2xl text-[#fff]/70"}>Stream your favorite tracks, discover hidden gems, and feel music like never before. </p>
                    <button onClick={loginWithSpotify} className={"bg-[#1DB954] px-10 py-3 rounded-full text-shadow-lg text-[#fff] PlusJakartaSans-Bold"}>Start Listening</button>

                </div>
                <div className={""}>

                </div>
            </div>
        </section>
    );
}

export default GetStarted;