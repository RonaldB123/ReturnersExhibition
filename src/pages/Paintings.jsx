import { useEffect, useRef, useState } from "react"
import { getArtworks, getSearchedArtworks } from "../utility/api"
import { ArrowDownOutlined, FacebookOutlined, InfoCircleOutlined, InstagramOutlined, LeftCircleOutlined, RightCircleOutlined, RollbackOutlined, StarFilled, StarOutlined, TwitterOutlined } from "@ant-design/icons"
import { Button, Carousel, Divider, Drawer, Empty, Image, Row, Space, Spin, Tooltip } from "antd";
import { SearchBar } from "../components/SearchArt";
import { Link } from "react-router-dom";


export function PaintingsPage({ setFavArt, favArt }) {
    const [artworkData, setArtworkData] = useState([]);
    const [count, setCount] = useState(0);
    const [open, setOpen] = useState(false);
    const [keySearch, setKeySearch] = useState('');
    const [fav, setFav] = useState(false);
    const [loading, setLoading] = useState(true);

    const incrementCount = (increment) => {
        if ((increment === -1 && count === 0) || (increment === 1 && count === artworkData.length - 1)) {

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
        setFavArt(favArt.concat(obj))
    }

    const removeFromFav = (objId) => {
        setFavArt(favArt.filter(obj => obj.id !== objId));
    }

    const paintingPics = [
        "https://www.psmuseum.org/storage/app/uploads/public/49d/e2a/2ba/thumb__2300_0_0_0_crop.jpg",
        "https://www.germany.travel/media/redaktion/staedte_kultur_content/klassische_kunstmusen/_grj4724.jpg",
        "https://www.dglam.org.uk/wp-content/uploads/2023/09/WEB-JPM23-3099.jpg"
    ]

    useEffect(() => {
        if (keySearch === '') {
            getArtworks().then(({ data }) => {
                setLoading(false);
                setArtworkData(data);
                setCount(0)
            }).catch((err) => console.log(err));
        } else {
            setLoading(true);
            getSearchedArtworks(keySearch).then(({ data }) => {
                setArtworkData(data);
                setLoading(false);
            }).catch((err) => console.log(err));
        }
    }, [keySearch])

    const mainRef = useRef();

    return (
        <>
            <Carousel autoplay autoplaySpeed={2000} >
                {paintingPics.map((bg, i) => {
                    return <img key={i} className="h-screen w-full bg-cover object-cover" src={bg}></img>
                })}
            </Carousel>
            <div className="p-5 bg-black/80 w-3/4 h-fit sm:w-1/2 sm:h-1/2 absolute top-0 right-0 left-0 mr-auto ml-auto translate-y-1/3 sm:translate-y-1/2 border-4 border-double">
                <h1 className="text-center text-6xl underline text-white">Paintings</h1>
                <p className="text-center text-2xl text-white mt-10 sm:mt-5">Welcome to the paintings virtual exhibition!</p>
                <p className="text-center text-2xl text-white mt-10 sm:mt-5">Browse to find your favourite artwork!</p>
                <Button shape="circle" className="flex mr-auto ml-auto justify-center mt-5 border border-white hover:border-2" type="text" icon={<ArrowDownOutlined className="text-white mt-0.5"/>} onClick={()=>{
                     mainRef.current.scrollIntoView({behavior: "smooth"})
                }}></Button>            </div>
            <div className="bg-black h-20" ref={mainRef}>
                <h1 className=" text-center text-2xl sm:text-3xl text-white translate-y-3/4 sm:translate-y-1/2 :translate-y-1/2">Discover your favourite collection</h1>
            </div>

            {/* Main Image and Image-Border */}
            <div className="h-max w-full bg-contain" style={{backgroundImage: "url("+"https://i.ibb.co/yYXg8By/white-damask-wallpaper-with-floral-patterns-HMCFAN.jpg"+")"}}>
            <div className="p-1 max-w-2xl mr-auto ml-auto">
                <Tooltip title="Click image for a better view!" defaultOpen trigger="contextMenu">
                    <div className="image-border mr-auto ml-auto w-full max-w-2xl mt-10 text-center">
                        <Spin spinning={loading}>
                            {artworkData.length > 0 && artworkData.length !== 0 ? <Image height={350} src={artworkData.length > 0 ? artworkData[count].images.web.url : <Empty />} className="object-contain flex mr-auto ml-auto max-w-full"></Image> : <div style={{ height: 350 }}>{artworkData.length === 0 && keySearch ? <Empty description={"No Artwork Found!"} /> : ""}</div>}
                        </Spin>
                    </div>
                </Tooltip>


                {/* Image buttons */}
                <Row justify={"space-between"} className="mt-2 mb-2 max-w-xs mr-auto ml-auto">
                    <Row span={4}>
                        {keySearch
                            ? <Button className="bg-white" icon={<RollbackOutlined className="text-xl" />} onClick={() => {
                                setKeySearch('')
                                setLoading(true);
                            }}></Button>
                            : <Button icon={<RollbackOutlined className="text-xl" />} className="bg-white invisible"></Button>
                        }
                    </Row>

                    <Row span={4}>
                        <Button className="bg-white" icon={<LeftCircleOutlined className="text-2xl" />} onClick={() => {
                            incrementCount(-1);
                            if (artworkData[count - 1]) {
                                if (favArt.some(obj => obj.id === artworkData[count - 1].id)) {
                                    setFav(true);
                                } else {
                                    setFav(false);
                                }
                            }
                        }}> </Button>
                        <Button loading={loading} icon={<InfoCircleOutlined className="text-xl" />} onClick={showDrawer} className="ml-5 mr-5 bg-white"></Button>
                        <Button className="bg-white" icon={<RightCircleOutlined className="text-2xl" />} onClick={() => {
                            incrementCount(1);
                            if (artworkData[count + 1]) {
                                if (favArt.some(obj => obj.id === artworkData[count + 1].id)) {
                                    setFav(true);
                                } else {
                                    setFav(false);
                                }
                            }
                        }}> </Button>
                    </Row>
                    <Row span={4}>
                        {fav || (artworkData.length && favArt.some(obj => artworkData[count].id === obj.id))
                            ? <Button loading={loading} className="bg-white" onClick={() => {
                                setFav(false);
                                removeFromFav(artworkData[count].id);
                            }} icon={<StarFilled className="text-xl" />}></Button>
                            :
                            <Button loading={loading} className="bg-white" onClick={() => {
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
                    {artworkData.length >= 1 ? <>
                        <p className="text-2xl sm:text-4xl font-bold underline mb-1">{artworkData[count].title}</p>
                        <p className="text-lg mb-1">{artworkData[count].creation_date}</p>
                        <p className="underline">{artworkData[count].creators.length === 0 ? "No Artists Found" : artworkData[count].creators[0].description}</p>
                        <p className="mb-1">{artworkData[count].culture[0]}</p>
                        <p>{artworkData[count].technique}</p>
                        <Divider>Description</Divider>
                        <p className="indent-1 first-letter:text-6xl first-letter:font-bold first-letter:me-2 first-letter:float-start">{artworkData[count].description}</p>
                        <Divider>Current Location</Divider>
                        <p>{artworkData[count].current_location}, Cleveland Museum of Art</p>
                        <Divider>Did you know ?</Divider>
                        <p>{artworkData[count].did_you_know}</p>
                    </>
                        : <Empty />}
                </Drawer>

                {/* Search bar  */}
                <div className="mb-5 max-w-xs ml-auto mr-auto bg-white">
                    <SearchBar setKeySearch={setKeySearch} />
                </div>
            </div>
            <div className="h-45 w-full bg-black mt-16">
                    <div className="h-5"></div>
                    <div className="border-t w-full divide-x-2 divide-solid divide-white"></div>
                    <div className="text-white flex justify-center text-xl mt-3">
                        <Link to="/">
                            <h1 className="sm:mr-5 mr-3 hover:underline">Home</h1>
                        </Link>
                        <Link to="/favourites">
                            <h1 className="sm:mr-5 mr-3 hover:underline">Favourites</h1>
                        </Link>
                        <Link to="/sculptures">
                            <h1 className="sm:mr-5 mr-3 hover:underline">Sculptures</h1>
                        </Link>
                        <Link to="/paintings">
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
            </div>
        </>
    )
}