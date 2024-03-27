import { useEffect, useState } from "react"
import { getArtworks } from "../utility/api"
import { InfoCircleOutlined, LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons"
import { Button, Divider, Drawer, Image, Space } from "antd";


export function HomePage() {
    const [artworkData, setArtworkData] = useState([]); 
    const [count, setCount] = useState(0);
    const [open, setOpen] = useState(false);

    const incrementCount = (increment) => {
        if(increment === -1 && count === 0){

        }else{
            setCount((currentCount) => currentCount + increment);
        }
    }
    const showDrawer = () => {
        setOpen(true);
    }
    
    const onClose = () => {
        setOpen(false);
    }
    
    useEffect(() => {
        getArtworks().then(({data}) => {
            setArtworkData(data);
        }).catch((err)=> console.log(err));
    },[])
    
    return (
        <div className="m-2">
            <h1 className="text-center">Welcome to the home page!</h1>
        <div className="image-border mr-auto ml-auto w-full max-w-2xl rounded-lg mt-10 text-center">
            <Image height={350} src={artworkData[count] ? artworkData[count].images.web.url : <h1>Loading...</h1> } className="max-w-full object-contain flex mr-auto ml-auto"></Image>
        </div>
        <div className="m-5 max-w-30 flex ml-auto mr-auto justify-center">
            <Button icon={<LeftCircleOutlined className="text-2xl"/>} onClick={()=> incrementCount(-1)}> </Button>
            <Button icon={<InfoCircleOutlined className="text-xl"/>} onClick={showDrawer} className="ml-5 mr-5"></Button>
            <Button icon={<RightCircleOutlined className="text-2xl"/>} onClick={()=> incrementCount(1)}> </Button>
        </div>
        <Drawer onClose={onClose} open={open} size="default" extra={
            <Space>
                <Button onClick={onClose}>OK</Button>
            </Space>
        }>
            {artworkData[count] ? <>
            <p className="text-2xl sm:text-4xl font-bold underline mb-1">{artworkData[count].title}</p>
            <p className="text-lg mb-1">{artworkData[count].creation_date}</p>
            <p className="underline">{artworkData[count].creators.length === 0 ? "No Artists Found" : artworkData[count].creators[0].description}</p>
            <p className="mb-1">{artworkData[count].culture[0]}</p> 
            <p>{artworkData[count].technique}</p>
            <Divider>Description</Divider>
            <p className="indent-1 first-letter:text-6xl first-letter:font-bold first-letter:me-2 first-letter:float-start">{artworkData[count].description}</p>
            <Divider>Current Location</Divider>
            <p>{artworkData[count].current_location}</p>
            <Divider>Did you know ?</Divider>
            <p>{artworkData[count].did_you_know}</p>
            </>
            : <h1>Loading...</h1> }
        </Drawer>
        </div>
    )
}