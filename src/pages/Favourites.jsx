import { InfoCircleOutlined, LeftCircleOutlined, RightCircleOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { Button, Divider, Drawer, Empty, Image, Row, Space } from "antd"
import { useEffect, useState } from "react";



export const FavouritesPage = ({setFavArt, favArt}) => {
    const [count, setCount] = useState(0);
    const [open, setOpen] = useState(false);

    const incrementCount = (increment) => {
        if((increment === -1 && count === 0) || (increment === 1 && count === favArt.length -1)){

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
    
    const removeFromFav = (objId) => {
        setFavArt((currentArr)=>{
            return currentArr.filter(obj=>obj.id !== objId)
        })
    }

    useEffect(()=>{

    },[favArt])

    return (
        <>
        {/* Main image and image border */}
        <div className="m-2">
        <h1 className="text-center">Welcome to the Favourites Page!</h1>
        <div className="image-border mr-auto ml-auto w-full max-w-2xl rounded-lg mt-10 text-center">
            <Image height={350} src={favArt.length > 0 ? favArt[count].images.web.url : <Empty/>} className="max-w-full object-contain flex mr-auto ml-auto"></Image>
        </div>
        </div>

        <Row justify={"space-between"} className="mt-2 mb-2 max-w-xs mr-auto ml-auto">
        <Row span={4}>

        </Row>
        <Row span={4}>
            <Button icon={<LeftCircleOutlined className="text-2xl"/>} onClick={()=>{
                incrementCount(-1);
             }}> </Button>
             {favArt.length 
             ? <Button icon={<InfoCircleOutlined className="text-xl"/>} onClick={showDrawer} className="ml-5 mr-5"></Button> 
             : <Button disabled icon={<InfoCircleOutlined className="text-xl"/>} onClick={showDrawer} className="ml-5 mr-5"></Button>            }
            <Button icon={<RightCircleOutlined className="text-2xl"/>} onClick={()=>{
                incrementCount(1);
                }}> </Button>
            </Row>
            <Row span={4}>
                { favArt.length   
            ?<Button onClick={()=>{
                    removeFromFav(favArt[count].id);
                }} icon={<StarFilled  className="text-xl" />}></Button>
            : ""
            } 
            </Row>
        </Row>

         {/* Information Drawer and Button */}
         <Drawer onClose={onClose} open={open} size="default" extra={
            <Space>
                <Button onClick={onClose}>OK</Button>
            </Space>
        }>
            {/* Drawer artwork information */}
            {favArt.length >= 1? <>
            <p className="text-2xl sm:text-4xl font-bold underline mb-1">{favArt[count].title}</p>
            <p className="text-lg mb-1">{favArt[count].creation_date}</p>
            <p className="underline">{favArt[count].creators.length === 0 ? "No Artists Found" : favArt[count].creators[0].description}</p>
            <p className="mb-1">{favArt[count].culture[0]}</p> 
            <p>{favArt[count].technique}</p>
            <Divider>Description</Divider>
            <p className="indent-1 first-letter:text-6xl first-letter:font-bold first-letter:me-2 first-letter:float-start">{favArt[count].description}</p>
            <Divider>Current Location</Divider>
            <p>{favArt[count].current_location}</p>
            <Divider>Did you know ?</Divider>
            <p>{favArt[count].did_you_know}</p>
            </>
            : <Empty/> }
        </Drawer>
        </>
    )
}