import { useEffect, useState } from "react"
import { getArtworks } from "../utility/api"
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons"
import { Button } from "antd";


export function HomePage() {
    const [artworkData, setArtworkData] = useState([]); 
    const [count, setCount] = useState(0);

    const incrementCount = (increment) => {
        if(increment === -1 && count === 0){

        }else{
            setCount((currentCount) => currentCount + increment);
        }
    }
    
    useEffect(() => {
        getArtworks().then(({data}) => {
            setArtworkData(data);
        }).catch((err)=> console.log(err));
    },[])
    
    return (
        <div className="m-2">
            <h1 className="text-center">Welcome to the home page!</h1>
        <div className="image-border mr-auto ml-auto">
            <img src={artworkData[count] ? artworkData[count].images.web.url : <h1>Loading...</h1> } className="w-full h-full max-w-100 max-h-100"></img>
        </div>
        <div className="text-center m-5">
            <Button icon={<LeftCircleOutlined className="text-xl"/>} onClick={()=> incrementCount(-1)}> </Button>
            <Button icon={<RightCircleOutlined className="text-xl"/>} onClick={()=> incrementCount(1)}> </Button>
        </div>
        </div>
    )
}