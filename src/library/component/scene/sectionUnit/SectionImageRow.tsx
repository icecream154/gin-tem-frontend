import { ImageProps, ImageUnit } from "../../../atomic/image/ImageUnit"
import { BoxUnit } from "../../../atomic/unit/BoxUnit"
import { RowUnit } from "../../../atomic/unit/RowUnit"
import { CustomUnit } from "../../../atomic/unit/Unit"
import { ColorAttr } from "../../../basic/color"
import { RowAttr } from "../../../basic/compose"
import { SizeAttr } from "../../../basic/size"
import { WindowParam, WindowParamContext } from "../../../context/WindowContext"
import { SectionBaseProps } from "../SceneSection"

export type SectionImageRowProps = SectionBaseProps & {
    images: ImageProps[],
    imageGap?: string
}

export class SectionImageRow extends CustomUnit<SectionImageRowProps> {
    static contextType = WindowParamContext;

    render() {
        let { images, imageGap,
            customStyleAttr, onClick, unitAction,
            sectionType, sectionSize, innerSectionWidth, sectionBg
        } = this.props;



        return (
            <WindowParamContext.Consumer>
                {wpt => {
                    let wp = wpt.param;
                    let bgColorAttr = new ColorAttr(wp, "", sectionBg);
                    return (
                        <RowUnit
                            unitAction={unitAction}
                            onClick={onClick}
                            sizeAttr={new SizeAttr(wp, innerSectionWidth)}
                            colorAttr={bgColorAttr}
                            customStyleAttr={customStyleAttr}>
                            {
                                images.map((image, idx) => {
                                    return (
                                        <RowUnit colorAttr={bgColorAttr} customStyleAttr={RowAttr.getChildrenPositionObj()}>
                                            <ImageUnit {...image} />
                                            {
                                                idx !== images.length - 1 &&
                                                <BoxUnit colorAttr={bgColorAttr} sizeAttr={new SizeAttr(wp, imageGap)} />
                                            }
                                        </RowUnit>
                                    )
                                })
                            }
                        </RowUnit>
                    )
                }
                }
            </WindowParamContext.Consumer>
        )
    }
}