import { BoxUnit } from "../../atomic/unit/BoxUnit"
import { ColumnUnit } from "../../atomic/unit/ColumnUnit"
import { RowUnit } from "../../atomic/unit/RowUnit"
import { CustomUnit } from "../../atomic/unit/Unit"
import { CustomUnitProps } from "../../atomic/unit/UnitProps"
import { ColorAttr } from "../../basic/color"
import { RowAttr } from "../../basic/compose"
import { SizeAttr } from "../../basic/size"
import { WindowParam, WindowParamContext } from "../../context/WindowContext"
import { SectionGeneric } from "./sectionUnit/SectionGeneric"

export type SectionType = "SectionButtonRow" | "SectionImageRow" | "SectionTitleAndSubTitle"
    | "SectionColumnCompose" | "SectionRowCompose" | "SectionArticle"

export type SectionBaseProps = CustomUnitProps & {
    sectionType: SectionType,
    sectionSize: SizeAttr,
    innerSectionWidth: string,
    sectionBg: string
}

export type SectionComposeProps = SectionBaseProps & {
    subSections: SectionBaseProps[]
}


export class SectionColumnCompose extends CustomUnit<SectionComposeProps> {
    static contextType = WindowParamContext;

    render() {
        let wp = this.context as WindowParam;
        let { customStyleAttr, onClick, unitAction,
            sectionType, sectionSize, innerSectionWidth, sectionBg, subSections
        } = this.props;

        let bgColorAttr = new ColorAttr(wp, "", sectionBg);
        let transparentColorAttr = new ColorAttr(wp, "", "transparent");

        return (
            <BoxUnit sizeAttr={sectionSize} unitAction={unitAction}
                colorAttr={bgColorAttr}
                customStyleAttr={customStyleAttr} onClick={onClick}>
                <ColumnUnit
                    sizeAttr={new SizeAttr(wp, innerSectionWidth)}
                    colorAttr={transparentColorAttr} customStyleAttr={RowAttr.getChildrenPositionObj()}>
                    {
                        subSections.map((sectionProps) => {
                            return (
                                <SectionGeneric {...sectionProps} />
                            )
                        })
                    }
                </ColumnUnit>
            </BoxUnit>
        )
    }
}

export class SectionRowCompose extends CustomUnit<SectionComposeProps> {
    render() {
        let { customStyleAttr, onClick, unitAction,
            sectionType, sectionSize, innerSectionWidth, sectionBg, subSections
        } = this.props;

        return (
            <WindowParamContext.Consumer>
                {wpt => {
                    let wp = wpt.param;
                    let bgColorAttr = new ColorAttr(wp, "", sectionBg);
                    let transparentColorAttr = new ColorAttr(wp, "", "transparent");
                    return (
                        <BoxUnit sizeAttr={sectionSize} unitAction={unitAction}
                            colorAttr={bgColorAttr}
                            customStyleAttr={customStyleAttr} onClick={onClick}>

                            <RowUnit
                                sizeAttr={new SizeAttr(wp, innerSectionWidth)}
                                colorAttr={transparentColorAttr} customStyleAttr={RowAttr.getChildrenPositionObj()}>
                                {
                                    subSections.map((sectionProps) => {
                                        return (
                                            <SectionGeneric {...sectionProps} />
                                        )
                                    })
                                }
                            </RowUnit>
                        </BoxUnit>
                    )
                }
                }
            </WindowParamContext.Consumer>
        )
    }
}
