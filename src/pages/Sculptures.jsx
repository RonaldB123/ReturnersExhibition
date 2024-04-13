import { useEffect, useState } from "react"
import { getSculptureData } from "../utility/api";
import { Empty, Image, Spin } from "antd";



export const SculpturesPage = () => {
    const [sculptures, setSculptures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);

    useEffect(() => {
        getSculptureData().then((data) => {
            setSculptures(data);
            setLoading(false);
        })
    }, [])


    return (
        <>
            <div className="m-2">
                <h1 className="text-center mb-0">Welcome to the Sculptures Page!</h1>
                <div className="relative flex justify-center items-center h-screen">
                    <div className="absolute top-0 left-0 w-full h-full z-10 flex justify-center items-center">
                        <img src="https://m.media-amazon.com/images/I/61B8KwWDMxL.jpg" className="w-3/4 md:w-1/2" />
                    </div>
                    <div className="absolute top-36 left-0 w-full h-full z-20 flex justify-center items-start">
                        <Spin spinning={loading}>
                            <Image width={192} height={192} src={sculptures.length && sculptures ? sculptures[0].images[0].baseimageurl : <Empty />} className="w-48 h-48 md:w-64 md:h-64 border border-black rounded-lg"></Image>
                        </Spin>
                    </div>
                </div>
            </div>
        </>
    )
}
