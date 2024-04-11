import { CommentOutlined, HomeFilled, MenuOutlined, PictureFilled, StarFilled, TrophyFilled } from "@ant-design/icons"
import { FloatButton } from "antd"
import { Link } from "react-router-dom"



export const Menu = ({ favArt }) => {
    return (
        <>
            <FloatButton.Group
                trigger="hover"
                style={{
                    bottom: 5,
                    left: 5
                }}
                badge={{count:favArt.length}}
                icon={<MenuOutlined />}
            >
                <FloatButton icon={<Link to={"/paintings"}><PictureFilled /></Link>} tooltip={"Paintings"} />
                <FloatButton icon={<Link to={"/sculptures"}><TrophyFilled/></Link>} tooltip={"Antiques/Sculptures"}/>
                <FloatButton icon={<Link to={"/favourites"}><StarFilled/></Link>} badge={{count:favArt.length}} tooltip={"Favourites"} />
                <FloatButton icon={<Link to={"/"}><HomeFilled/></Link>} tooltip={"Home"}/>
            </FloatButton.Group>
        </>
    )
}