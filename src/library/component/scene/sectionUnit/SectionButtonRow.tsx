import { ButtonProps, ButtonUnit } from "../../../atomic/button/Button"
import { BoxUnit } from "../../../atomic/unit/BoxUnit"
import { RowUnit } from "../../../atomic/unit/RowUnit"
import { CustomUnit } from "../../../atomic/unit/Unit"
import { ColorAttr } from "../../../basic/color"
import { RowAttr } from "../../../basic/compose"
import { SizeAttr } from "../../../basic/size"
import { WindowParam, WindowParamContext } from "../../../context/WindowContext"
import { SectionBaseProps } from "../SceneSection"

export type SectionButtonRowProps = SectionBaseProps & {
    buttons: ButtonProps[],
    buttonGap?: string
}

export class SectionButtonRow extends CustomUnit<SectionButtonRowProps> {
    static contextType = WindowParamContext;

    render() {
        let { buttons, buttonGap,
            customStyleAttr, onClick, unitAction,
            innerSectionWidth, sectionBg
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
                                buttons.map((button, idx) => {
                                    return (
                                        <RowUnit key={button.text} colorAttr={bgColorAttr} customStyleAttr={RowAttr.getChildrenPositionObj()}>
                                            <ButtonUnit {...button} />
                                            {
                                                idx !== buttons.length - 1 &&
                                                <BoxUnit colorAttr={bgColorAttr} sizeAttr={new SizeAttr(wp, buttonGap)} />
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