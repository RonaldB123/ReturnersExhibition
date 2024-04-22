import { ArrowDownOutlined, BorderBottomOutlined, FacebookOutlined, InstagramOutlined, TwitterOutlined } from "@ant-design/icons";
import { Button, Card, Carousel, Col, ConfigProvider, Divider, Row } from "antd";
import Meta from "antd/es/card/Meta";
import React, { useRef } from "react";
import { Link } from "react-router-dom";


export function HomePage() {
    const homePics = [
        "https://cdn.britannica.com/51/194651-050-747F0C18/Interior-National-Gallery-of-Art-Washington-DC.jpg",
        "https://cdn.sanity.io/images/cctd4ker/production/441e3b2a3fcc15e770c29d1458351be3697da1ac-5304x5304.jpg?w=3840&q=75&fit=clip&auto=format",
        "https://sjmusart.org/sites/default/files/styles/wide/public/2022-05/JeanConner_SJMA_JArnoldImpart%20Photography_25_37.jpg?itok=gUAP8-op",
    ]

    const mainRef = useRef();

    return (
        <>
            <Carousel autoplay autoplaySpeed={2000}>
                {homePics.map((bg, i) => {
                    return <img key={i} className="h-screen w-full bg-cover object-cover" src={bg}></img>
                })}

            </Carousel>
            <div className="p-5 bg-black/80 w-3/4 h-fit sm:w-1/2 sm:h-1/2 absolute top-0 right-0 left-0 mr-auto ml-auto translate-y-1/3 sm:translate-y-1/2 border-4 border-double">
                <h1 className="text-center text-6xl text-white underline">Welcome</h1>
                <p className="text-center text-2xl text-white mt-10 sm:mt-5">Welcome to the exhibition curator project!</p>
                <p className="text-center text-2xl text-white mt-10 sm:mt-5">Browse to find your favourite artworks and sculptures!</p>
                <Button shape="circle" className="flex mr-auto ml-auto justify-center mt-5 border border-white hover:border-2" type="text" icon={<ArrowDownOutlined className="text-white mt-0.5"/>} onClick={()=>{
                     mainRef.current.scrollIntoView({behavior: "smooth"})
                }}></Button>
            </div>
            <div className="bg-black h-56 w-full max-w-full overflow-hidden">
                <div className="flex justify-between">
                    <h1 className="text-5xl text-white pt-20 sm:ml-20 sm:mr-20 ml-5 mr-5 underline">Explore</h1>
                    <img className="h-56 w-full object-cover hover:shadow-xl hover:shadow-white hover:border-white hover:border-2 border-2 border-black" src="https://images.squarespace-cdn.com/content/v1/58194a68f5e231eb16096f46/1555903872785-XJ734L0ISA15RPKSNN4O/The+lotus+pond_sml.jpg" />
                </div>
            </div>
            <div className="bg-black h-56 w-full max-w-full">
                <div className="flex justify-between">
                    <img className="h-56 w-full object-cover overflow-hidden hover:shadow-xl hover:shadow-white hover:border-white hover:border-2" src="https://live.staticflickr.com/3109/5864227157_791db8156c_b.jpg" />
                    <h1 className="text-5xl text-white pt-20 sm:ml-20 sm:mr-20 ml-3 mr-3 underline border-b-2 border-t-2 border-black">Immerse</h1>
                </div>
            </div>
            <div className="bg-black h-56 w-full max-w-full overflow-hidden">
                <div className="flex justify-between">
                    <h1 className="text-5xl text-white pt-20 sm:ml-20 sm:mr-20 ml-3 mr-3 underline">Uncover</h1>
                    <img className="h-56 w-full object-cover hover:shadow-xl hover:shadow-white hover:border-white hover:border-2 border-2 border-black" src="https://images.squarespace-cdn.com/content/v1/5fca7df73e95df765ab2e5d6/1616068491507-TPV9LVH79KUZYM6YGN9G/Concepticide.jpg" />
                </div>
            </div>
            <div ref={mainRef} className="bg-black h-20">
                <h1 className="text-center text-3xl text-white translate-y-1/2">Discover your collection</h1>
            </div>
            <div className="w-full bg-cover overflow-hidden" style={{backgroundImage: "url("+"https://cdn.pixabay.com/photo/2016/09/05/15/07/concrete-1646788_1280.jpg"+")"}}>
            
            <div>
                <Row justify={"center"} className="mr-auto ml-auto p-2 pt-4">
                    <Col span={24} md={12} className="mb-5">
                        <Card hoverable className="w-3/4 mr-auto ml-auto"
                            cover={<img className="h-64 object-cover" src="https://cdn.sanity.io/images/cctd4ker/production/cac9d74f4b7a291507a7dfa901cdc54ad6e661ff-700x440.png"
                            />}
                            actions={[<Link to="/paintings">
                                <button className="button h-10 mr-auto ml-auto">
                                    <span className="text text-xs sm:text-sm">Discover Artworks</span>
                                    <span className="arrow"></span>
                                </button></Link>]}>
                            <h1 className="text-4xl mb-4">Artwork</h1>
                            <Meta className="text-xl" description="Find a range of different artworks" />
                        </Card>
                    </Col>
                    <Col span={24} md={12} className="mb-5">
                        <Card hoverable className="w-3/4 mr-auto ml-auto"
                            cover={<img className="h-64 object-cover" src="https://www.smb.museum/uploads/tx_smb/exhibitions/exhibition_17496/Canova_Raum_5_1920_xl.jpg" />}
                            actions={[<Link to="/sculptures">
                                <button className="button h-10 mr-auto ml-auto">
                                    <span className="text text-xs sm:text-sm">Discover Sculptures</span>
                                    <span className="arrow"></span>
                                </button></Link>]}>
                            <h1 className="text-4xl mb-4">Sculptures</h1>
                            <Meta className="text-xl" description="Find a range of different sculptures" />
                        </Card>
                    </Col>
                </Row>
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