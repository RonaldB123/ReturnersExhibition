import { CommentOutlined, HomeFilled, MenuOutlined, PictureFilled, StarFilled, TrophyFilled } from "@ant-design/icons"
import { FloatButton } from "antd"
import { Link, useNavigate } from "react-router-dom"



export const Menu = ({ favArt }) => {

    const navigate = useNavigate();

    return (
        <>
                <FloatButton.Group
                    trigger="hover"
                    style={{
                        bottom: 5,
                        left: 5,
                    }}
                    badge={{ count: favArt.length || 0 }}
                    icon={<MenuOutlined />}
                >
                    <FloatButton onClick={()=> navigate("/ReturnersExhibition/paintings")} icon={<PictureFilled />} tooltip={"Paintings"} />
                    <FloatButton onClick={()=> navigate("/ReturnersExhibition/sculptures")} icon={<TrophyFilled />} tooltip={"Antiques/Sculptures"} />
                    <FloatButton onClick={()=> navigate("/ReturnersExhibition/favourites")} icon={<StarFilled />} badge={{ count: favArt.length }} tooltip={"Favourites"} />
                    <FloatButton onClick={()=> navigate("/ReturnersExhibition/")} icon={<HomeFilled />} tooltip={"Home"} />
                </FloatButton.Group>
        </>
    )
}