import { useEffect, useState } from "react"
import { getSculptureData } from "../utility/api";
import { Button, Col, Divider, Drawer, Empty, Image, Row, Space, Spin } from "antd";
import { InfoCircleOutlined, LeftCircleOutlined, RightCircleOutlined, RollbackOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { SearchBar } from "../components/SearchArt";



export const SculpturesPage = ({ favArt }) => {
    const [sculptures, setSculptures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);
    const [open, setOpen] = useState(false);
    const [keySearch, setKeySearch] = useState('');
    const [fav, setFav] = useState(false);

    useEffect(() => {
        if(keySearch === ''){
            getSculptureData().then((data) => {
                if(data.length){
                    setSculptures(data);
                    setLoading(false);
                }
            }).catch((err)=>console.log(err));
        }else{
            setLoading(true);
        }
    }, [keySearch])

    const incrementCount = (increment) => {
        if ((increment === -1 && count === 0) || (increment === 1 && count === sculptures.length - 1)) {

        } else {
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
        setFavArt((currentArr) => {
            return currentArr.concat(obj);
        });
    }

    const removeFromFav = (objId) => {
        setFavArt((currentArr) => {
            return currentArr.filter(obj => obj.id !== objId)
        })
    }

    return (
        <>
            <div className="m-2">
                <h1 className="text-center mb-0">Welcome to the Sculptures Page!</h1>
                <div className="mr-auto ml-auto w-fit left-0 right-0 text-center">
                    <Spin spinning={loading}>
                    <img className="mt-80 absolute" src="https://m.media-amazon.com/images/I/61B8KwWDMxL.jpg" style={{width:400, height:400}} draggable={false}/>
                        <Image width={350} height={350} src={sculptures.length && sculptures ? sculptures[count].images[0].baseimageurl : <Empty />} className="border border-black rounded-lg absolute mt-4"></Image>
                    </Spin>
                </div>

                {/* Image buttons */}
                <Row justify={"space-between"} className="mt-20 mb-2 max-w-xs mr-auto ml-auto">
                    <Row span={4}>
                        {keySearch
                            ? <Button icon={<RollbackOutlined className="text-x" />} className="bg-white" onClick={() => {
                                setKeySearch('')
                                setLoading(true);
                            }}></Button>
                            : <Button icon={<RollbackOutlined className="text-xl" />} className="invisible bg-white"></Button>
                        }
                    </Row>

                    <Row span={4}>
                        <Button className="bg-white" icon={<LeftCircleOutlined className="text-2xl" />} onClick={() => {
                            incrementCount(-1);
                            if (sculptures[count - 1]) {
                                if (favArt.some(obj => obj.id === sculptures[count - 1].id)) {
                                    setFav(true);
                                } else {
                                    setFav(false);
                                }
                            }
                        }}> </Button>
                        <Button icon={<InfoCircleOutlined className="text-xl" />} onClick={showDrawer} className="ml-5 mr-5 bg-white"></Button>
                        <Button icon={<RightCircleOutlined className="text-2xl" />} className="bg-white" onClick={() => {
                            incrementCount(1);
                            if (sculptures[count + 1]) {
                                if (favArt.some(obj => obj.id === sculptures[count + 1].id)) {
                                    setFav(true);
                                } else {
                                    setFav(false);
                                }
                            }
                        }}> </Button>
                    </Row>
                    <Row span={4}>
                        {fav
                            ? <Button className="bg-white" onClick={() => {
                                setFav(false);
                                removeFromFav(artworkData[count].id);
                            }} icon={<StarFilled className="text-xl" />}></Button>
                            : <Button className="bg-white" onClick={() => {
                                setFav(true);
                                addToFav(artworkData[count]);
                            }} icon={<StarOutlined className="text-xl" />}></Button>
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
            {sculptures.length >= 1? <>
            <p className="text-2xl sm:text-4xl font-bold underline mb-1">{sculptures[count].title}</p>
            <p className="text-lg mb-1">{sculptures[count].dated}</p>
            <p className="underline">{sculptures[count].people}</p>
            <p className="mb-1">{sculptures[count].culture}</p> 
            <p>{sculptures[count].medium}</p>
            <Divider>Description</Divider>
            <p className="indent-1 first-letter:text-6xl first-letter:font-bold first-letter:me-2 first-letter:float-start">{sculptures[count].description !== null ? sculptures[count].description : "No description found"}</p>
            <Divider>Current Location</Divider>
            <p>{sculptures[count].provenance ? sculptures[count].provenance : "No Location Found." }</p>
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
