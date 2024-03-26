import { useEffect } from "react"
import { getArtworkArr } from "../utility/api"


export function HomePage() {

    useEffect(() => {
        // getArtworkArr()
        // .then((res) => {
        //     console.log(res);
        // })
        // .catch((error) => {
        //     console.log(error);
        // })
    },[])

    return (
        <>
            <h1 className="">Welcome to the home page!</h1>
        <div className="image-border mr-auto ml-auto">
            <img src="https://i.ebayimg.com/images/g/iYMAAOSw269jXD2D/s-l1200.webp" className="w-full h-full max-w-100 max-h-100"></img>
        </div>
        </>
    )
}