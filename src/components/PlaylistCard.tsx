import {Music} from "lucide-react";
import PlaylistBaseObject = SpotifyApi.PlaylistObjectFull;

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Link} from "react-router";



interface  PlaylistCardProps  {
    item:PlaylistBaseObject
}

function PlaylistCard({item}:PlaylistCardProps) {

    return (
       <Link to={`playlist/${item?.id}`}>
           <div  className={" p-2.5 flex-col h-auto flex rounded-md bg-[#292929]   border-[0.2px] border-white/30"}>

               <Avatar className="aspect-square w-full h-auto  bg-[#292929]  rounded-lg">
                   <AvatarImage className={""} src={ item?.images?.[0]?.url} alt={""}/>
                   <AvatarFallback className="rounded-lg bg-[#191919]"><Music size={30}/></AvatarFallback>
               </Avatar>

               <div>
                   <h1 className={"PlusJakartaSans-Bold text-white/80 text-xs text-nowrap truncate pt-2"}> {item?.name}</h1>
                   <p className={"PlusJakartaSans-Regular text-xs leading-4"}>Songs</p>
                   <p className={"PlusJakartaSans-Bold text-md"}>{item?.tracks.total}</p>
               </div>
           </div >

       </Link>
    );
}

export default PlaylistCard;
