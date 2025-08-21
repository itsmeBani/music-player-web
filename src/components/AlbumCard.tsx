
import AlbumObjectSimplified = SpotifyApi.AlbumObjectSimplified;
import {Link, useParams} from "react-router";
function AlbumCard({item}:{item:AlbumObjectSimplified}) {
    const {artistID} = useParams();
    return (
        <Link to={`/top-artist/${artistID}/album/${item?.id}`}>
            <div
                className="w-full select-none h-full p-2 rounded-lg border border-white/20 bg-[#292929] cursor-pointer transition-transform duration-200"
            >
                <img
                    src={item?.images?.[0]?.url}
                    alt={item?.name}
                    className="w-full aspect-square  object-cover rounded-md"
                />
                <p className="text-white/90 pt-2  PlusJakartaSans-Bold truncate">
                    {item?.name}
                </p>
                <p className="text-white text-sm  PlusJakartaSans-Regular">
                    {item?.release_date.split("-")[0]}
                    <span className="text-white text-[12px] PlusJakartaSans-Regular">
          {" • "}{item?.artists[0].name}
        </span>
                </p>
            </div>
        </Link>
    );
}

export default AlbumCard;
