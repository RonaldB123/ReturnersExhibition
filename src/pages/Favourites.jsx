import { Empty, Image } from "antd"
import { useState } from "react";



export const FavouritesPage = ({setFavArt, favArt}) => {
    const [count, setCount] = useState(0);

    const incrementCount = (increment) => {
        if((increment === -1 && count === 0) || (increment === 1 && count === artworkData.length -1)){

        }else{
            setCount((currentCount) => currentCount + increment);
        }
    }

    return (
        <>
        <div className="m-2">
        <h1 className="text-center">Welcome to the Favourites Page!</h1>
        <div className="image-border mr-auto ml-auto w-full max-w-2xl rounded-lg mt-10 text-center">
            {favArt.length ? <Image height={350} src={favArt.length > 0 ? favArt[0].images.web.url : <Empty/>} className="max-w-full object-contain flex mr-auto ml-auto"></Image> : <Empty/>}
        </div>
        </div>
        </>
    )
}