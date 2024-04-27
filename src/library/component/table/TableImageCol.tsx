import {ColumnUnit} from "../../atomic/unit/ColumnUnit";
import {ImageUnit} from "../../atomic/image/ImageUnit";

export function TableImageCol(imgListJsonStr: string) {
    let imgUrlList: string[] = []
    try {
        imgUrlList = JSON.parse(imgListJsonStr)
    } catch (e) {
        imgUrlList = [imgListJsonStr]
    }

    return (
        <ColumnUnit>
            {
                imgUrlList.filter(item => item.trim().length > 0).map((image, idx) => {
                    return (
                        <ImageUnit url={image} customStyleAttr={{"width": "200px", "marginBottom": "16px"}}/>
                    )
                })
            }
        </ColumnUnit>
    )
}