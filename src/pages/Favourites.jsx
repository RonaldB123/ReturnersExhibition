import { ArrowDownOutlined, FacebookOutlined, InfoCircleOutlined, InstagramOutlined, LeftCircleOutlined, PictureFilled, RightCircleOutlined, StarFilled, StarOutlined, TrophyFilled, TwitterOutlined } from "@ant-design/icons";
import { Button, Carousel, Divider, Drawer, Empty, Image, Row, Segmented, Space, Spin, Tabs, Tooltip } from "antd"
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";



export const FavouritesPage = ({ setFavArt, favArt }) => {
    const [count, setCount] = useState(0);
    const [open, setOpen] = useState(false);
    const [favArtwork, setFavArtwork] = useState([]);
    const [favSculpture, setFavSculpture] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState(true);

    const incrementCount = (increment) => {
        if (tab) {
            if ((increment === -1 && count === 0) || (increment === 1 && count === favArtwork.length - 1)) {

            } else {
                setCount((currentCount) => currentCount + increment);
            }
        } else {
            if ((increment === -1 && count === 0) || (increment === 1 && count === favSculpture.length - 1)) {

            } else {
                setCount((currentCount) => currentCount + increment);
            }
        }
    }

    const showDrawer = () => {
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false);
    }

    const removeFromFav = (objId) => {
        setFavArt(favArt.filter(obj => obj.id !== objId))
        setFavArtwork(favArtwork.filter(obj => obj.id !== objId))
        setFavSculpture(favSculpture.filter(obj => obj.id !== objId))
    }
    if(tab){
        if(count === favArtwork.length){
            setCount(count-1);
        }
    }else {
        if(count === favSculpture.length){
            setCount(count-1);
        }
    }
    
    useEffect(() => {
        setFavSculpture(favArt.filter(obj => obj.url.includes("harvard")));
        setFavArtwork(favArt.filter(obj => !obj.url.includes("harvard")));
        setLoading(false);
    }, [favArt])

    useEffect(()=>{
        setCount(0);
    },[])

    const favouritesPics = [
        "https://www.oneren.org/media/rvbplkjo/secret-collection-3.jpg",
        "https://naturalhistory.si.edu/sites/default/files/styles/hero/public/media/image/top-research-hero-paleo4stafflg.jpg.webp?itok=NjV-wW-c",
        "https://www.prm.ox.ac.uk/sites/default/files/prm/images/page/multakaoxford_chandelier.jpg",
    ]

    const mainRef = useRef();

    return (
        <>
            <Carousel autoplay autoplaySpeed={2000} >
                {favouritesPics.map((bg, i) => {
                    return <img key={i} className="h-screen w-full bg-cover object-cover" src={bg}></img>
                })}
            </Carousel>
            <div className="p-5 bg-black/80 w-3/4 h-fit sm:w-1/2 sm:h-1/2 absolute top-0 right-0 left-0 mr-auto ml-auto translate-y-1/3 sm:translate-y-1/2 border-4 border-double">
                <h1 className="text-center text-5xl text-white underline">Your Collection</h1>
                <p className="text-center text-2xl text-white mt-10 sm:mt-5">Welcome to your favourited art pieces!</p>
                <p className="text-center text-2xl text-white mt-10 sm:mt-5">Browse your favourited pieces!</p>
                <Button shape="circle" className="flex mr-auto ml-auto justify-center mt-5 border border-white hover:border-2" type="text" icon={<ArrowDownOutlined className="text-white mt-0.5"/>} onClick={()=>{
                     mainRef.current.scrollIntoView({behavior: "smooth"})
                }}></Button>            </div>
            <div ref={mainRef} className="bg-black h-20">
                <h1 className=" text-center text-2xl sm:text-3xl text-white translate-y-3/4 sm:translate-y-1/2 :translate-y-1/2">Discover favourited collection</h1>
            </div>




            {/* Main image and image border */}
            <div className="h-max w-full bg-contain overflow-hidden pb-20" style={{ backgroundImage: "url(" + "https://i.ibb.co/yYXg8By/white-damask-wallpaper-with-floral-patterns-HMCFAN.jpg" + ")" }}>
                <Segmented options={[{ label: "Artwork", value: 1, icon: <PictureFilled /> }, { label: "Sculpture", value: 2, icon: <TrophyFilled /> }]} onChange={() => {
                    setTab(!tab);
                    setCount(0);
                }}
                    className="w-fit flex mr-auto ml-auto mt-5 border border-black p-2 text-lg mb-10"
                />
                {tab ?
                        <Tooltip title="Click image for a better view!" defaultOpen trigger="contextMenu">
                            <div>
                            <div className="image-border mr-auto ml-auto w-full max-w-2xl rounded-lg mt-16 text-center">
                        <Spin spinning={loading}>
                            {favArtwork.length ? <Image height={350} src={favArtwork[count] ? favArtwork[count].images.web.url : <Empty />} className="max-w-full object-contain flex mr-auto ml-auto"></Image> : <h1 style={{ height: 350 }} className="translate-y-1/2">No Artwork Favourited!</h1>}
                        </Spin>
                    </div>
                    </div>
                        </Tooltip>
                    : <>
                        <div className="mr-auto ml-auto w-fit left-0 right-0 text-center pt-10">
                            <Tooltip title="Click image for a better view!" defaultOpen trigger="contextMenu">
                                <div>
                                    <Spin spinning={loading}>
                                        <img className="absolute" src="https://i.ibb.co/x3yR55p/file.png" style={{ width: 400, height: 400, marginTop: 305 }} draggable={false} />
                                        {favSculpture.length ? <Image width={350} height={350} src={favSculpture[count] ? favSculpture[count].images[0].baseimageurl : <Empty />} className="border-4 border-double border-black rounded-lg absolute object-contain bg-white"></Image> : <div style={{ height: 350, width: 350 }} className="border-4 border-double border-black rounded-lg object-contain bg-white"><h1 className="mt-40">{favSculpture.length === 0 ? <p style={{ height: 350, width: 350 }} >No Sculptures Favourited!</p> : ""}</h1></div>}
                                    </Spin>
                                </div>
                            </Tooltip>
                        </div>
                    </>
                }
                {tab ?
                    <Row justify={"space-between"} className="mt-2 mb-2 max-w-xs mr-auto ml-auto">
                        <Row span={4}></Row>
                        <Row span={4}>
                            <Button className="bg-white" icon={<LeftCircleOutlined className="text-2xl" />} onClick={() => {
                                incrementCount(-1);
                            }}> </Button>
                            {favArtwork.length
                                ? <Button icon={<InfoCircleOutlined className="text-xl" />} onClick={showDrawer} className="ml-5 mr-5 bg-white"></Button>
                                : <Button disabled icon={<InfoCircleOutlined className="text-xl" />} onClick={showDrawer} className="ml-5 mr-5 bg-white"></Button>}
                            <Button className="bg-white" icon={<RightCircleOutlined className="text-2xl" />} onClick={() => {
                                incrementCount(1);
                            }}> </Button>
                        </Row>
                        <Row span={4}>
                            {favArtwork.length
                                ? <Button className="bg-white" onClick={() => {
                                    removeFromFav(favArtwork[count].id);
                                }} icon={<StarFilled className="text-xl" />}></Button>
                                : <Button className="bg-white" disabled icon={<StarOutlined className="text-xl" />}></Button>
                            }
                        </Row>
                    </Row>
                    : <Row justify={"space-between"} className="mt-20 mb-2 max-w-xs mr-auto ml-auto">
                        <Row span={4}></Row>
                        <Row span={4}>
                            <Button className="bg-white" icon={<LeftCircleOutlined className="text-2xl" />} onClick={() => {
                                incrementCount(-1);
                            }}> </Button>

                            {favSculpture.length
                                ? <Button icon={<InfoCircleOutlined className="text-xl" />} onClick={showDrawer} className="ml-5 mr-5 bg-white"></Button>
                                : <Button disabled icon={<InfoCircleOutlined className="text-xl" />} onClick={showDrawer} className="ml-5 mr-5 bg-white"></Button>}
                            <Button icon={<RightCircleOutlined className="text-2xl" />} className="bg-white" onClick={() => {
                                incrementCount(1);
                            }}> </Button>
                        </Row>
                        <Row span={4}>
                            {favSculpture.length
                                ? <Button className="bg-white" onClick={() => {
                                    removeFromFav(favSculpture[count].id);
                                }} icon={<StarFilled className="text-xl" />}></Button>
                                : <Button className="bg-white" disabled icon={<StarOutlined className="text-xl" />}></Button>
                            }
                        </Row>
                    </Row>
                }
                {/* Information Drawer and Button */}
                <Drawer onClose={onClose} open={open} size="default" extra={
                    <Space>
                        <Button onClick={onClose}>OK</Button>
                    </Space>
                }>

                    {/* Drawer artwork information */}
                    {tab && favArtwork[count] ? <>
                        <p className="text-2xl sm:text-4xl font-bold underline mb-1">{favArtwork[count].title}</p>
                        <p className="text-lg mb-1">{favArtwork[count].creation_date}</p>
                        <p className="underline">{favArtwork[count].creators.length ? "No Artists Found" : favArt[count].creators[0].description}</p>
                        <p className="mb-1">{favArtwork[count].culture[0]}</p>
                        <p>{favArtwork[count].technique}</p>
                        <Divider>Description</Divider>
                        <p className="indent-1 first-letter:text-6xl first-letter:font-bold first-letter:me-2 first-letter:float-start">{favArtwork[count].description}</p>
                        <Divider>Current Location</Divider>
                        <p>{favArtwork[count].current_location}</p>
                        <Divider>Did you know ?</Divider>
                        <p>{favArtwork[count].did_you_know}</p>
                    </> : <p></p>}
                    {!tab && favSculpture[count] ? <>
                        <p className="text-2xl sm:text-4xl font-bold underline mb-1">{favSculpture[count].title}</p>
                        <p className="text-lg mb-1">{favSculpture[count].dated}</p>
                        <p className="underline text-lg">{favSculpture[count].people ? favSculpture[count].people[0].name : "No artist found"}</p>
                        <p className="mb-1">{favSculpture[count].culture}</p>
                        <p>{favSculpture[count].medium}</p>
                        <Divider>Description</Divider>
                        <p className="indent-1 first-letter:text-6xl first-letter:font-bold first-letter:me-2 first-letter:float-start">{favSculpture[count].description !== null ? favSculpture[count].description : "No description found"}</p>
                        <Divider>Current Location</Divider>
                        <p>{favSculpture[count].provenance ? favSculpture[count].provenance : "No Location Found."}</p>
                    </> : <p></p>}
                </Drawer>
            </div>
            <div className="h-45 w-full bg-black">
                    <div className="h-5"></div>
                    <div className="border-t w-full divide-x-2 divide-solid divide-white"></div>
                    <div className="text-white flex justify-center text-xl mt-3">
                        <Link to="/ReturnersExhibition/">
                            <h1 className="sm:mr-5 mr-3 hover:underline">Home</h1>
                        </Link>
                        <Link to="/ReturnersExhibition/favourites">
                            <h1 className="sm:mr-5 mr-3 hover:underline">Favourites</h1>
                        </Link>
                        <Link to="/ReturnersExhibition/sculptures">
                            <h1 className="sm:mr-5 mr-3 hover:underline">Sculptures</h1>
                        </Link>
                        <Link to="/ReturnersExhibition/paintings">
                            <h1 className="hover:underline">Artwork</h1>
                        </Link>
                    </div>
                    <div className="border-t w-full divide-x-2 divide-solid divide-white mt-3"></div>
                    <div className="flex justify-center text-white text-4xl mt-5">
                    <InstagramOutlined className="mr-3" />
                    <FacebookOutlined className="mr-3" />
                    <TwitterOutlined className="mr-3" />
                    </div>
                    <p className="text-white mt-5 text-right mr-5">Privacy Policy | Terms of Use | Copyright © 2024 Exhibition Curator Project</p>
                </div>
        </>
    )
}