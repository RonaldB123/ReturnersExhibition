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
        <h1>Welcome to the home page!</h1>
        </>
    )
}