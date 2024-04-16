import { useEffect, useState } from "react"
import { getSculptureData } from "../utility/api";
import { Button, Col, Empty, Image, Row, Spin } from "antd";
import { InfoCircleOutlined, LeftCircleOutlined, RightCircleOutlined, RollbackOutlined, StarFilled, StarOutlined } from "@ant-design/icons";



export const SculpturesPage = ({ favArt }) => {
    const [sculptures, setSculptures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);
    const [open, setOpen] = useState(false);
    const [keySearch, setKeySearch] = useState('');
    const [fav, setFav] = useState(false);

    useEffect(() => {
        getSculptureData().then((data) => {
            setSculptures(data);
            setLoading(false);
        })
    }, [])

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
                    <img className="mt-40 absolute" src="https://m.media-amazon.com/images/I/61B8KwWDMxL.jpg" height={250} width={250} draggable={false}/>
                        <Image width={192} height={192} src={sculptures.length && sculptures ? sculptures[count].images[0].baseimageurl : <Empty />} className="border border-black rounded-lg absolute"></Image>
                    </Spin>
                </div>

                {/* Image buttons */}
                <Row justify={"space-between"} className="mt-44 mb-2 max-w-xs mr-auto ml-auto">
                    <Row span={4}>
                        {keySearch
                            ? <Button icon={<RollbackOutlined className="text-xl" />} onClick={() => {
                                setKeySearch('')
                                setLoading(true);
                            }}></Button>
                            : <Button icon={<RollbackOutlined className="text-xl" />} className="invisible"></Button>
                        }
                    </Row>

                    <Row span={4}>
                        <Button icon={<LeftCircleOutlined className="text-2xl" />} onClick={() => {
                            incrementCount(-1);
                            if (sculptures[count - 1]) {
                                if (favArt.some(obj => obj.id === sculptures[count - 1].id)) {
                                    setFav(true);
                                } else {
                                    setFav(false);
                                }
                            }
                        }}> </Button>
                        <Button icon={<InfoCircleOutlined className="text-xl" />} onClick={showDrawer} className="ml-5 mr-5"></Button>
                        <Button icon={<RightCircleOutlined className="text-2xl" />} onClick={() => {
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
                            ? <Button onClick={() => {
                                setFav(false);
                                removeFromFav(artworkData[count].id);
                            }} icon={<StarFilled className="text-xl" />}></Button>
                            : <Button onClick={() => {
                                setFav(true);
                                addToFav(artworkData[count]);
                            }} icon={<StarOutlined className="text-xl" />}></Button>
                        }
                    </Row>
                </Row>

            </div>
        </>
    )
}
