import json from "../assets/Recording.json"
import Lottie from "react-lottie";
const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: json,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};
function AnimatedLoader() {
    return (
        <div className="w-full h-screen flex place-items-center jusitfy-center ">
            <Lottie
                options={defaultOptions}
                height={300}
                width={200}
            />
        </div>
    );
}

export default AnimatedLoader;