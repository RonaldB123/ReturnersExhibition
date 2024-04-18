import { InfoCircleOutlined, LeftCircleOutlined, PictureFilled, RightCircleOutlined, StarFilled, StarOutlined, TrophyFilled } from "@ant-design/icons";
import { Button, Divider, Drawer, Empty, Image, Row, Space, Spin, Tabs } from "antd"
import { useEffect, useState } from "react";



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

    useEffect(() => {
        setFavSculpture(favArt.filter(obj => obj.url.includes("harvard")));
        setFavArtwork(favArt.filter(obj => !obj.url.includes("harvard")));
        setLoading(false);
    }, [favArt])

    return (
        <>
            {/* Main image and image border */}
            <div className="m-2">
                <h1 className="text-center">Welcome to the Favourites Page!</h1>

                <Tabs
                    className="mt-5"
                    defaultActiveKey="2"
                    items={[{ key: 1, label: "Artwork", icon: <PictureFilled /> }, { key: 2, label: "Sculpture", icon: <TrophyFilled /> }]}
                    onChange={() => {
                        setTab(!tab);
                        setCount(0);
                    }}
                />
                {tab ?
                    <div className="image-border mr-auto ml-auto w-full max-w-2xl rounded-lg mt-10 text-center">
                        <Spin spinning={loading}>
                            {favArtwork.length ? <Image height={350} src={favArtwork[count] ? favArtwork[count].images.web.url : <Empty />} className="max-w-full object-contain flex mr-auto ml-auto"></Image> : <h1 style={{ height: 350 }} className="translate-y-1/2">No Artwork Favourited!</h1>}
                        </Spin>
                    </div>
                    : <>
                        <h1 className="text-center mb-0">Welcome to the Sculptures Page!</h1>
                        <div className="mr-auto ml-auto w-fit left-0 right-0 text-center">
                            <Spin spinning={loading}>
                                <img className="mt-80 absolute" src="https://m.media-amazon.com/images/I/61B8KwWDMxL.jpg" style={{ width: 400, height: 400 }} draggable={false} />
                                {favSculpture.length ? <Image width={350} height={350} src={favSculpture[count] && favSculpture ? favSculpture[count].images[0].baseimageurl : <Empty />} className="border border-black rounded-lg absolute mt-4"></Image> : <h1 style={{ width: 350, height: 350 }} className="translate-y-1/2">No Favourited Sculptures!!</h1>}
                            </Spin>
                        </div>
                    </>
                }
            </div>
            {tab ?
                <Row justify={"space-between"} className="mt-2 mb-2 max-w-xs mr-auto ml-auto">
                    <Row span={4}></Row>
                    <Row span={4}>
                        <Button icon={<LeftCircleOutlined className="text-2xl" />} onClick={() => {
                            incrementCount(-1);
                        }}> </Button>
                        {favArtwork.length
                            ? <Button icon={<InfoCircleOutlined className="text-xl" />} onClick={showDrawer} className="ml-5 mr-5 bg-white"></Button>
                            : <Button disabled icon={<InfoCircleOutlined className="text-xl" />} onClick={showDrawer} className="ml-5 mr-5 bg-white"></Button>}
                        <Button icon={<RightCircleOutlined className="text-2xl" />} onClick={() => {
                            incrementCount(1);
                        }}> </Button>
                    </Row>
                    <Row span={4}>
                        {favArtwork.length
                            ? <Button onClick={() => {
                                removeFromFav(favArtwork[count].id);
                            }} icon={<StarFilled className="text-xl" />}></Button>
                            : <Button disabled icon={<StarOutlined className="text-xl" />}></Button>
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
                            : <Button disabled icon={<InfoCircleOutlined className="text-xl" />} onClick={showDrawer} className="ml-5 mr-5 bg-white"></Button>}                        <Button icon={<RightCircleOutlined className="text-2xl" />} className="bg-white" onClick={() => {
                                incrementCount(1);
                            }}> </Button>
                    </Row>
                    <Row span={4}>
                        {favSculpture.length
                            ? <Button onClick={() => {
                                removeFromFav(favSculpture[count].id);
                            }} icon={<StarFilled className="text-xl" />}></Button>
                            : <Button disabled icon={<StarOutlined className="text-xl" />}></Button>
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
        </>
    )
}