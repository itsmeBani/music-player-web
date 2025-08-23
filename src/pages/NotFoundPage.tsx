import json from "../assets/cat.json"
import Lottie from "react-lottie";
import {Link} from "react-router";
const defaultOptions = {
    loop: true,
    autoplay: true,
    repeat:true,
    animationData: json,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

function NotFoundPage() {
    return (
        <div className="w-full h-screen flex   ">
        <div className="w-full flex flex-col place-items-center justify-center">
            <h1 className={"lg:text-[70px] text-4xl text-[#1DB954] PlusJakartaSans-Bold leading-1 uppercase"}>Not Found</h1>
            <div className={"flex place-items-center justify-center"}>
                <div ><h1 className={"lg:text-[300px] text-[100px]  font-extrabold leading-19 mt-4"}>4</h1></div>
                <div>
                    <Lottie  style={{opacity:0.8}}
                            options={defaultOptions}
                            height={300}
                            width={200}
                    />
                </div>
                <div>
                    <div ><h1 className={"lg:text-[300px] text-[100px]   font-extrabold leading-19  mt-4"}>4</h1></div>
                </div>
            </div>
            <div><p className={"PlusJakartaSans-Regular text-white/80 text-lg px-10 lg:max-w-200 text-center"}>Oops! It looks like the page you’re looking for doesn’t exist.
                It may have been moved, deleted, or the link might be broken.</p></div>

            <Link to={"/"} className={"PlusJakartaSans-Bold  py-3 px-5 mt-5 rounded-full bg-[#1DB954]"}>Go Home and Jam</Link>
        </div>
        </div>
    );
}

export default NotFoundPage;