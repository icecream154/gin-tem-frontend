import {CustomUnitProps} from "../unit/UnitProps";
import {Component} from "react";
import {WindowParamContext} from "../../context/WindowContext";
import {BoxUnit} from "../unit/BoxUnit";
import {SizeAttr} from "../../basic/size";
import {ColorAttr} from "../../basic/color";
import {ImageUnit} from "./ImageUnit";
import {BoxAttr} from "../../basic/compose";

export type ImageDisplayBoxProps = CustomUnitProps & {
    size: string,
    url: string,
}

export class ImageDisplayBox extends Component<ImageDisplayBoxProps> {
    render() {
        const {size, url} = this.props;
        let borderRadius = SizeAttr.pxMultiple(size, 0.06)
        let borderRadiusNum = SizeAttr.getPxNumber(borderRadius);
        if (borderRadiusNum >= 32) borderRadiusNum = 32;
        if (borderRadiusNum <= 10) borderRadiusNum = 10;
        borderRadius = borderRadiusNum + "px"

        return (
            <WindowParamContext.Consumer>
                {wpt => {
                    let wp = wpt.param;
                    return (
                        <BoxUnit
                            needHover={true}
                            sizeAttr={new SizeAttr(wp, size, size)}
                            colorAttr={new ColorAttr(wp, "", "#F9F6F640")}
                            customStyleAttr={Object.assign({
                                "border": "1px solid black",
                                "borderRadius": borderRadius
                            }, this.props.customStyleAttr)}
                        >
                            <ImageUnit
                                sizeAttr={new SizeAttr(wp, size, size)}
                                customStyleAttr={BoxAttr.getChildrenPositionObj()}
                                innerImgStyle={{"objectFit": "contain", "borderRadius": borderRadius}}
                                url={url}/>
                        </BoxUnit>
                    )
                }
                }
            </WindowParamContext.Consumer>
        )
    }
}