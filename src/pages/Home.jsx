import { useEffect, useState } from "react"
import { getArtworks, getSearchedArtworks } from "../utility/api"
import { InfoCircleOutlined, LeftCircleOutlined, RightCircleOutlined, RollbackOutlined, StarFilled, StarOutlined } from "@ant-design/icons"
import { Button, Divider, Drawer, Empty, Image, Row, Space, Spin } from "antd";
import { SearchBar } from "../components/SearchArt";


export function HomePage({setFavArt, favArt, setPageLoad}) {
    const [artworkData, setArtworkData] = useState([]); 
    const [count, setCount] = useState(0);
    const [open, setOpen] = useState(false);
    const [keySearch, setKeySearch] = useState('');
    const [fav, setFav] = useState(false);
    const [loading, setLoading] = useState(true);

    const incrementCount = (increment) => {
        if((increment === -1 && count === 0) || (increment === 1 && count === artworkData.length -1)){

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

    const addToFav = (obj) => {
        setFavArt((currentArr)=>{
            return currentArr.concat(obj);
        });
    }

    const removeFromFav = (objId) => {
        setFavArt((currentArr)=>{
            return currentArr.filter(obj=>obj.id !== objId)
        })
    }

    useEffect(() => {
        if(keySearch === ''){
            getArtworks().then(({data}) => {
                setArtworkData(data);
                setLoading(false);
                setCount(0)
                setPageLoad(false);
            }).catch((err)=> console.log(err));
        }else{
            setLoading(true);
            getSearchedArtworks(keySearch).then(({data}) => {
                setArtworkData(data);
                setLoading(false);
            }).catch((err) => console.log(err));
        }
    },[keySearch])
    
    return (
        <>
        {/* Main Image and Image-Border */}
        <div className="m-2">
            <h1 className="text-center">Welcome to the home page!</h1>
        <div className="image-border mr-auto ml-auto w-full max-w-2xl rounded-lg mt-10 text-center">
            <Spin spinning={loading}>
                {artworkData.length > 0 && artworkData.length !== 0 ? <Image height={350} src={artworkData.length > 0 ? artworkData[count].images.web.url : <Empty/>} className="object-contain flex mr-auto ml-auto max-w-full"></Image> : <div style={{height:350}}>{artworkData.length === 0 && keySearch ? <Empty description={"No Artwork Found!"}/> : ""}</div>}
            </Spin>
        </div>
        
        {/* Image buttons */}
        <Row justify={"space-between"} className="mt-2 mb-2 max-w-xs mr-auto ml-auto">
            <Row span={4}>
            {keySearch
            ?<Button className="bg-white" icon={<RollbackOutlined className="text-xl"/>} onClick={()=>{
                setKeySearch('')
                setLoading(true);
            }}></Button> 
            : <Button icon={<RollbackOutlined className="text-xl"/>} className="bg-white invisible"></Button>
            }
            </Row>

            <Row span={4}>
            <Button className="bg-white" icon={<LeftCircleOutlined className="text-2xl"/>} onClick={()=>{
                incrementCount(-1);
                if(artworkData[count-1]){
                    if(favArt.some(obj=> obj.id === artworkData[count-1].id)){
                        setFav(true);
                    }else{
                        setFav(false);
                    }
                }
             }}> </Button>
            <Button icon={<InfoCircleOutlined className="text-xl"/>} onClick={showDrawer} className="ml-5 mr-5 bg-white"></Button>
            <Button className="bg-white" icon={<RightCircleOutlined className="text-2xl"/>} onClick={()=>{
                incrementCount(1);
                if(artworkData[count+1]){
                    if(favArt.some(obj=> obj.id === artworkData[count+1].id)){
                        setFav(true);
                    }else{
                        setFav(false);
                    }
                }
                }}> </Button>
            </Row>
            <Row span={4}>
                {fav 
                ?<Button className="bg-white" onClick={()=>{
                    setFav(false);
                    removeFromFav(artworkData[count].id);
                }} icon={<StarFilled  className="text-xl" />}></Button> 
                :<Button className="bg-white" onClick={()=>{
                    setFav(true);
                    addToFav(artworkData[count]);
                }} icon={<StarOutlined  className="text-xl" />}></Button>
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
            {artworkData.length >= 1? <>
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
            : <Empty/> }
        </Drawer>
        
        {/* Search bar  */}
        <div className="max-w-xs ml-auto mr-auto">
            <SearchBar setKeySearch={setKeySearch}/>
        </div>
        </div>
        </>
    )
}