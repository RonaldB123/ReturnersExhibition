import { CommentOutlined, MenuOutlined, PictureFilled, StarFilled, TrophyFilled } from "@ant-design/icons"
import { FloatButton } from "antd"



export const Menu = ({ favArt }) => {
    return (
        <>
            <FloatButton.Group
                trigger="click"
                badge={favArt.length}
                style={{
                    bottom: 5,
                    left: 5
                }}
                icon={<MenuOutlined />}
            >
                <FloatButton icon={<PictureFilled />} tooltip={"Paintings"} />
                <FloatButton icon={<TrophyFilled />} tooltip={"Antiques/Sculptures"}/>
                <FloatButton icon={<StarFilled />} tooltip={"Favourites"} />
            </FloatButton.Group>
        </>
    )
}