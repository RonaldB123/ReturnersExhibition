import { ArrowDownOutlined } from "@ant-design/icons";
import { Card, Carousel, Col, ConfigProvider, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { Link } from "react-router-dom";


export function HomePage() {
    const homePics = [
        "https://cdn.britannica.com/51/194651-050-747F0C18/Interior-National-Gallery-of-Art-Washington-DC.jpg",
        "https://cdn.sanity.io/images/cctd4ker/production/441e3b2a3fcc15e770c29d1458351be3697da1ac-5304x5304.jpg?w=3840&q=75&fit=clip&auto=format",
        "https://sjmusart.org/sites/default/files/styles/wide/public/2022-05/JeanConner_SJMA_JArnoldImpart%20Photography_25_37.jpg?itok=gUAP8-op",
    ]   

    return (
        <>
            <Carousel autoplay autoplaySpeed={2000}>
                {homePics.map((bg, i) => {
                    return <img key={i} className="h-screen w-full bg-cover object-cover" src={bg}></img>
                })}

            </Carousel>
            <div className="p-5 bg-black/70 w-3/4 h-fit sm:w-1/2 sm:h-1/2 absolute top-0 right-0 left-0 mr-auto ml-auto translate-y-1/3 sm:translate-y-1/2">
                <h1 className="text-center text-5xl text-white">Welcome</h1>
                <p className="text-center text-2xl text-white mt-10 sm:mt-5">Welcome to the exhibition curator project!</p>
                <p className="text-center text-2xl text-white mt-10 sm:mt-5">Browse to find your favourite artworks and sculptures!</p>
                <h1 className="text-5xl text-white text-center mt-10 sm:mt-5"><ArrowDownOutlined /></h1>
            </div>
            <div className="bg-black h-56 w-full max-w-full overflow-hidden sm:border-b-2 sm:border-t-4 sm:border-black">
                <div className="flex justify-between">
                    <h1 className="text-5xl text-white pt-20 sm:ml-20 sm:mr-20 ml-5 mr-5 underline">Explore</h1>
                    <img className="h-56 w-full object-cover" src="https://static.vecteezy.com/system/resources/previews/014/536/660/non_2x/blue-colourful-shape-background-abstract-eps-vector.jpg"/>
                </div>
            </div>
            <div className="bg-black h-56 w-full max-w-full">
                <div className="flex justify-between">
                    <img className="h-56 w-full object-cover overflow-hidden sm:border-b-2 sm:border-t-2 sm:border-black" src="https://www.singulart.com/images/artworks/v2/cropped/5097/main/zoom/1840265_2ee2f890a82f45072575e3f4a30d095d.jpeg"/>
                    <h1 className="text-5xl text-white pt-20 sm:ml-20 sm:mr-20 ml-3 mr-3 underline border-b-2 border-t-2 border-black">Immerse</h1>
                </div>
            </div>
            <div className="bg-black h-56 w-full max-w-full overflow-hidden sm:border-b-4 sm:border-t-2 sm:border-black">
                <div className="flex justify-between">
                    <h1 className="text-5xl text-white pt-20 sm:ml-20 sm:mr-20 ml-5 mr-5 underline">Uncover</h1>
                    <img className="h-56 w-full object-cover" src="https://images.squarespace-cdn.com/content/v1/5fca7df73e95df765ab2e5d6/1616068491507-TPV9LVH79KUZYM6YGN9G/Concepticide.jpg"/>
                </div>
            </div>
            <div className="bg-black h-20 mt-4 mb-2">
                <h1 className="text-center text-3xl text-white translate-y-1/2">Discover your collection</h1>
            </div>
            <div>
                <Row justify={"center"} className="mr-auto ml-auto p-2">
                    <Col span={24} md={12} className="mb-5">
                        <Card hoverable className="w-3/4 mr-auto ml-auto"
                            cover={<img className="h-64 object-cover" src="https://cdn.sanity.io/images/cctd4ker/production/cac9d74f4b7a291507a7dfa901cdc54ad6e661ff-700x440.png"
                            />}
                            actions={[<Link to="/paintings">
                                <button className="button h-10 mr-auto ml-auto">
                                    <span className="text">Discover Artworks</span>
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
                                    <span className="text">Discover Sculptures</span>
                                    <span className="arrow"></span>
                                </button></Link>]}>
                                    <h1 className="text-4xl mb-4">Sculptures</h1>
                            <Meta className="text-xl" description="Find a range of different sculptures" />
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}