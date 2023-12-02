import { SpanText } from "../../../atomic/text/SpanText"
import { BoxUnit } from "../../../atomic/unit/BoxUnit"
import { ColumnUnit } from "../../../atomic/unit/ColumnUnit"
import { CustomUnit } from "../../../atomic/unit/Unit"
import { ColorAttr } from "../../../basic/color"
import { ColumnAttr } from "../../../basic/compose"
import { FontAttr } from "../../../basic/font"
import { basicGap, SizeAttr } from "../../../basic/size"
import { WindowParam, WindowParamContext } from "../../../context/WindowContext"
import { SectionBaseProps } from "../SceneSection"

export type SectionTitleAndSubTitleProps = SectionBaseProps & {
    titles: string[],
    titleFont?: FontAttr,
    titleColor?: string,
    firstTitleAddSize?: string,
    subTitles: string[],
    subTitleFont?: FontAttr,
    subTitleColor?: string,
    titleInnerGap?: string,
    subTitleInnerGap?: string,
    titleAndSubTitleGap?: string
    subTitleBottomGap?: string
    textAlign?: string
}

export class SectionTitleAndSubTitle extends CustomUnit<SectionTitleAndSubTitleProps> {
    static contextType = WindowParamContext;

    render() {
        return (
            <WindowParamContext.Consumer>
                {wpt => {
                    let wp = wpt.param;
                    let { titles, titleFont, titleColor, firstTitleAddSize,
                        subTitles, subTitleFont, subTitleColor,
                        titleInnerGap, subTitleInnerGap, titleAndSubTitleGap, subTitleBottomGap, textAlign,
                        customStyleAttr, onClick, unitAction,
                        sectionType, sectionSize, innerSectionWidth, sectionBg
                    } = this.props;

                    if (!titleFont) {
                        titleFont = new FontAttr(wp, "2.6em", "600");
                    }
                    if (!firstTitleAddSize) {
                        firstTitleAddSize = "1em";
                    }
                    if (!subTitleFont) {
                        subTitleFont = new FontAttr(wp, "1.6em", "500");
                    }
                    if (!titleInnerGap) {
                        titleInnerGap = "0.12vh";
                    }
                    if (!titleAndSubTitleGap) {
                        titleAndSubTitleGap = "1.74vh";
                    }
                    if (!subTitleInnerGap) {
                        subTitleInnerGap = "0.56vh";
                    }
                    if (!subTitleBottomGap) {
                        subTitleBottomGap = basicGap;
                    }

                    let bgColorAttr = new ColorAttr(wp, "", sectionBg);
                    let titleColorAttrObj = new ColorAttr(wp, titleColor, sectionBg);
                    let subTitleColorAttrObj = new ColorAttr(wp, subTitleColor, sectionBg);

                    let sCusObj: {} = { justifyContent: "" };
                    if (textAlign === "center") {
                        sCusObj = ColumnAttr.getChildrenPositionObj();
                    }

                    return (
                        <ColumnUnit
                            unitAction={unitAction}
                            onClick={onClick}
                            sizeAttr={new SizeAttr(wp, innerSectionWidth)}
                            colorAttr={bgColorAttr}
                            customStyleAttr={customStyleAttr}>
                            {
                                titles.map((title, idx) => {
                                    return (
                                        <ColumnUnit
                                            fontAttr={idx === 0 ? new FontAttr(wp, firstTitleAddSize) : new FontAttr(wp,)}
                                            colorAttr={bgColorAttr} customStyleAttr={sCusObj}>
                                            <SpanText fontAttr={titleFont} colorAttr={titleColorAttrObj} customStyleAttr={sCusObj}>
                                                {title}
                                            </SpanText>
                                            <BoxUnit colorAttr={bgColorAttr} sizeAttr={new SizeAttr(wp, "", titleInnerGap)} />
                                        </ColumnUnit>
                                    )
                                })
                            }
                            <BoxUnit colorAttr={bgColorAttr} sizeAttr={new SizeAttr(wp, "", titleAndSubTitleGap)} />
                            {
                                subTitles.map((subTitle) => {
                                    return (
                                        <ColumnUnit colorAttr={bgColorAttr} customStyleAttr={sCusObj}>
                                            <SpanText fontAttr={subTitleFont} colorAttr={subTitleColorAttrObj}>
                                                {subTitle}
                                            </SpanText>
                                            <BoxUnit colorAttr={bgColorAttr} sizeAttr={new SizeAttr(wp, "", subTitleInnerGap)} />
                                        </ColumnUnit>
                                    )
                                })
                            }
                            {
                                subTitles &&
                                <BoxUnit colorAttr={bgColorAttr} sizeAttr={new SizeAttr(wp, "", subTitleBottomGap)} />
                            }
                        </ColumnUnit>
                    )
                }
                }
            </WindowParamContext.Consumer>
        )
    }
}