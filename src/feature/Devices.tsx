
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Loader, MonitorSmartphone} from "lucide-react";

import { Smartphone, Monitor, Speaker, Laptop, Tablet, Tv, Radio } from "lucide-react";
import {useSpotifyPlayer} from "../hooks/useSpotifyPlayer.ts"
import {useAuth} from "@/context/AuthProvider.tsx";
import {useTransferPlayback} from "@/hooks/useTransferPlayback.ts";
type Device = {
    id: string;
    name: string;
    type: string;
    is_active: boolean;
};

function Devices() {

    function getDeviceIcon(type: string, isActive: boolean) {
        const color = isActive ? "#212121" : "white";
        const size = "w-5 h-5";

        switch (type.toLowerCase()) {
            case "smartphone":
                return <Smartphone size={20} color={color} className={size} />;
            case "computer":
                return <Monitor color={color} className={size} />;
            case "speaker":
                return <Speaker color={color} className={size} />;
            case "laptop":
                return <Laptop color={color} className={size} />;
            case "tablet":
                return <Tablet color={color} className={size} />;
            case "tv":
                return <Tv color={color} className={size} />;
            case "avr": // Spotify calls some audio receivers "AVR"
                return <Radio color={color} className={size} />;
            default:
                return <Monitor color={color} className={size} />;
        }
    }
    const {token}=useAuth()
    const {listOfDevices,refetchDevices}=useSpotifyPlayer(token)
    const { mutate, isPending } = useTransferPlayback(() => {
        setTimeout(()=>{
            refetchDevices().then()
        },300)
    });
    return (
        <div>
            <DropdownMenu >
                <DropdownMenuTrigger>
                    <MonitorSmartphone className="hover:text-[#0e6]" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mr-5 mt-2 min-w-[250px]">
                    <DropdownMenuLabel className={"flex justify-between"}>Switch Devices {isPending &&  <Loader className={"animate-spin"} size={17}/>}</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {listOfDevices?.devices.map((device:Device) => (
                        <DropdownMenuItem onClick={()=>mutate({ device_ids: [device?.id] })} onSelect={(e) => e.preventDefault()}
                            key={device.id}
                            style={{
                                background: device.is_active ? "#0e6" : undefined,
                                color: device.is_active ? "#212121" : undefined
                            }}
                            className="py-2 mb-1 PlusJakartaSans-Regular flex items-center gap-2"
                        >
                            {getDeviceIcon(device.type, device.is_active)}
                            {device.name}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default Devices;
