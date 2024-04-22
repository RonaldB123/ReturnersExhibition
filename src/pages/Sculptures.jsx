import { useEffect, useRef, useState } from "react"
import { getSculptureData, getSearchedSculptures } from "../utility/api";
import { Button, Carousel, Divider, Drawer, Empty, Image, Row, Space, Spin, Tooltip } from "antd";
import { ArrowDownOutlined, FacebookOutlined, InfoCircleOutlined, InstagramOutlined, LeftCircleOutlined, RightCircleOutlined, RollbackOutlined, StarFilled, StarOutlined, TwitterOutlined } from "@ant-design/icons";
import { SearchBar } from "../components/SearchArt";
import { Link } from "react-router-dom";



export const SculpturesPage = ({ favArt, setFavArt }) => {
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
            getSearchedSculptures(keySearch).then((data)=> {
                setSculptures(data);
                setLoading(false);
            })
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

    const sculpturePics = [
        "https://www.namuseum.gr/wp-content/uploads/2018/09/IMG_4416-1920x988.jpg",
        "https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_1080,w_1920/f_jpg/q_65/https://media.newmindmedia.com/TellUs/image/%3Ffile%3DVigelandsmuseet-VO08493-_Foto_Fara_Mohri_59827850.JPG&dh%3D534&dw%3D800&cropX%3D0&cropY%3D165&cropH%3D2624&cropW%3D3934&t%3D4",
        "https://cdn-imgix.headout.com/mircobrands-content/image/f552254b1b6790098f683174c3eada88-matteo-maretto-9KkPloRgOUY-unsplash.jpg?auto=format&q=90&crop=faces",
    ]

    const mainRef = useRef();

    return (
        <>
        <Carousel autoplay autoplaySpeed={2000} >
                {sculpturePics.map((bg, i) => {
                    return <img key={i} className="h-screen w-full bg-cover object-cover" src={bg}></img>
                })}
            </Carousel>
            <div className="p-5 bg-black/80 w-5/6 h-fit sm:w-1/2 sm:h-1/2 absolute top-0 right-0 left-0 mr-auto ml-auto translate-y-1/3 sm:translate-y-1/2 border-4 border-double">
                <h1 className="text-center text-6xl underline text-white">Sculptures!</h1>
                <p className="text-center text-2xl text-white mt-10 sm:mt-5">Welcome to the sculptures virtual exhibition!</p>
                <p className="text-center text-2xl text-white mt-10 sm:mt-5">Browse to find your favourite sculptures!</p>
                <Button shape="circle" className="flex mr-auto ml-auto justify-center mt-5 border border-white hover:border-2" type="text" icon={<ArrowDownOutlined className="text-white mt-0.5"/>} onClick={()=>{
                     mainRef.current.scrollIntoView({behavior: "smooth"})
                }}></Button>            </div>
            <div className="bg-black h-20" ref={mainRef}>
                <h1 className=" text-center text-2xl sm:text-3xl text-white translate-y-3/4 sm:translate-y-1/2 :translate-y-1/2">Discover your favourite collection</h1>
            </div>


            <div className="w-full bg-cover overflow-clip pb-20" style={{backgroundImage: "url("+"https://i.ibb.co/yYXg8By/white-damask-wallpaper-with-floral-patterns-HMCFAN.jpg"+")"}}>
                <div className="mr-auto ml-auto w-fit left-0 right-0 text-center pt-10">
            <Tooltip title="Click image for a better view!" defaultOpen trigger="contextMenu">
                    <div>
                    <Spin spinning={loading}>
                    <img className="absolute" src="https://i.ibb.co/x3yR55p/file.png" style={{width:400, height:400, marginTop: 305}} draggable={false}/>
                        {sculptures.length > 0 && sculptures.length !== 0  ?<Image width={350} height={350} src={sculptures.length && sculptures[count].images ? sculptures[count].images[0].baseimageurl : <Empty />} className="border-4 border-black rounded-lg absolute object-contain bg-white border-double"></Image> : <div style={{height: 350, width: 350}} className="border border-black rounded-lg object-contain bg-white"><h1 className="mt-28">{sculptures.length === 0 && keySearch ? <Empty description={"No Sculptures Found!"} /> : ""}</h1></div> }
                    </Spin>
                    </div>
                </Tooltip>
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
                        <Button loading={loading} icon={<InfoCircleOutlined className="text-xl" />} onClick={showDrawer} className="ml-5 mr-5 bg-white"></Button>
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
                        {fav || (sculptures.length && favArt.some(obj=> sculptures[count].id === obj.id))
                            ? <Button loading={loading} className="bg-white" onClick={() => {
                                setFav(false);
                                removeFromFav(sculptures[count].id);
                            }} icon={<StarFilled className="text-xl" />}></Button>
                            : <Button loading={loading} className="bg-white" onClick={() => {
                                setFav(true);
                                addToFav(sculptures[count]);
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
            {sculptures.length ? <>
            <p className="text-2xl sm:text-4xl font-bold underline mb-1">{sculptures[count].title}</p>
            <p className="text-lg mb-1">{sculptures[count].dated}</p>
            <p className="underline text-lg">{sculptures[count].people ? sculptures[count].people[0].name : "No artist found"}</p>
            <p className="mb-1">{sculptures[count].culture}</p> 
            <p>{sculptures[count].medium}</p>
            <Divider>Description</Divider>
            {sculptures[count].description !== null ? <p className="indent-1 first-letter:text-6xl first-letter:font-bold first-letter:me-2 first-letter:float-start">{sculptures[count].description}</p> : <p>No Description Found</p>}
            <Divider>Current Location</Divider>
            <p>{sculptures[count].provenance ? sculptures[count].provenance : "No Location Found." }</p>
            </> 
            : <Empty/> }
        </Drawer>
                {/* Search bar  */}
                <div className="max-w-xs ml-auto mr-auto bg-white">
            <SearchBar setKeySearch={setKeySearch}/>
            </div>
        </div>
        <div className="h-45 w-full bg-black">
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
        </>
    )
}
