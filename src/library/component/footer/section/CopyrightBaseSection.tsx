import {SpanHoverText} from "../../../atomic/text/SpanHoverText"
import {SpanText} from "../../../atomic/text/SpanText"
import {BoxUnit} from "../../../atomic/unit/BoxUnit"
import {RowUnit} from "../../../atomic/unit/RowUnit"
import {CustomUnit} from "../../../atomic/unit/Unit"
import {CustomUnitProps} from "../../../atomic/unit/UnitProps"
import {ColorAttr} from "../../../basic/color"
import {RowAttr} from "../../../basic/compose"
import {FontAttr} from "../../../basic/font"
import {SizeAttr} from "../../../basic/size"
import PoliceIcon from "../../../../assets/common/police_icon.png"
import {ImageUnit} from "../../../atomic/image/ImageUnit"
import {WindowParamContext} from "../../../context/WindowContext"
import {ColumnUnit} from "../../../atomic/unit/ColumnUnit"
import {EnvironmentOutlined} from "@ant-design/icons";

export type CopyrightSectionBaseProps = CustomUnitProps & {
    sectionSize: SizeAttr,
    position?: string,
    positionFont?: FontAttr,
    positionColor?: ColorAttr,
    cpText: string,
    icpText: string,
    icpLink: string,
    policeText: string,
    policeLink: string,
    textGap?: string,
    sectionColor?: ColorAttr,
    sectionFont?: FontAttr,
    cpFont?: FontAttr,
    cpColor?: ColorAttr,
    cpSpanCustomObj?: {},
    icpFont?: FontAttr,
    icpColor?: ColorAttr,
    icpHoverFont?: FontAttr,
    icpHoverColor?: ColorAttr,
    policeFont?: FontAttr,
    policeColor?: ColorAttr,
    policeIconSize?: string,
    policeHoverFont?: FontAttr,
    policeHoverColor?: ColorAttr,
    lineGap?: string,
    mediumMillStone?: number,
}

export class CopyrightBaseSection extends CustomUnit<CopyrightSectionBaseProps> {
    static contextType = WindowParamContext;

    render() {
        let {
            sectionSize, position, positionFont, positionColor, cpText,
            icpText, icpLink, policeText, policeLink, textGap,
            sectionColor, sectionFont, cpFont, cpSpanCustomObj,
            cpColor, icpFont, icpColor, icpHoverFont,
            icpHoverColor, policeFont, policeColor, policeIconSize,
            policeHoverFont, policeHoverColor, lineGap,
            mediumMillStone, customStyleAttr, onClick
        } = this.props;

        if (!textGap) textGap = "3%";
        if (!policeIconSize) policeIconSize = "18px";
        if (!lineGap) lineGap = "1.5vh";
        let cpLineMarginObj = {"marginBottom": lineGap};
        let cpLineMarginWithRowObj = Object.assign(RowAttr.getChildrenPositionObj(), cpLineMarginObj);
        let icpTextObj: {} = cpLineMarginWithRowObj;

        return (
            <WindowParamContext.Consumer>
                {wpt => {
                    let wp = wpt.param;

                    if (!mediumMillStone) mediumMillStone = (wp.mileParam.mediaPanelWidth + wp.mileParam.expandPcWidth) / 2;
                    let mediumSmaller = wp.currWidth < mediumMillStone;
                    let phoneSmaller = wp.currWidth < wp.mileParam.phoneWidth;

                    let leftAlignSpanObj = Object.assign({"justifyContent": ""}, RowAttr.getChildrenPositionObj());
                    let icpAndPoliceRowCusObj = {};
                    if (wp.currWidth < wp.mileParam.phoneWidth) {
                        icpAndPoliceRowCusObj = {"flexDirection": "column"};
                        icpTextObj = Object.assign({"justifyContent": ""}, cpLineMarginObj);
                    }

                    let icpAndPoliceRow = function () {
                        return (
                            <RowUnit sizeAttr={new SizeAttr(wp)} customStyleAttr={icpAndPoliceRowCusObj}>
                                <SpanHoverText
                                    colorAttr={icpColor}
                                    fontAttr={icpFont}
                                    hoverColorAttr={icpHoverColor}
                                    hoverFontAttr={icpHoverFont}
                                    onClick={() => {
                                        if (icpLink) {
                                            window.location.href = icpLink;
                                        }
                                    }}
                                    customStyleAttr={icpTextObj}
                                >
                                    {icpText}
                                </SpanHoverText>
                                <BoxUnit colorAttr={sectionColor} sizeAttr={new SizeAttr(wp, textGap)}></BoxUnit>

                                {
                                    policeText &&
                                    <RowUnit customStyleAttr={cpLineMarginWithRowObj}>
                                        <ImageUnit customStyleAttr={RowAttr.getChildrenPositionObj()}
                                                   colorAttr={sectionColor} url={PoliceIcon}
                                                   sizeAttr={new SizeAttr(wp, "", policeIconSize)}/>
                                        <BoxUnit colorAttr={sectionColor} sizeAttr={new SizeAttr(wp, "3px")}></BoxUnit>
                                        <SpanHoverText
                                            colorAttr={policeColor}
                                            fontAttr={policeFont}
                                            hoverColorAttr={policeHoverColor}
                                            hoverFontAttr={policeHoverFont}
                                            onClick={() => {
                                                if (icpLink) {
                                                    window.location.href = policeLink;
                                                }
                                            }}
                                            customStyleAttr={RowAttr.getChildrenPositionObj()}
                                        >
                                            {policeText}
                                        </SpanHoverText>
                                    </RowUnit>
                                }

                            </RowUnit>
                        )
                    };

                    let cpRow = function () {
                        return (
                            <RowUnit sizeAttr={new SizeAttr(wp)}
                                     customStyleAttr={phoneSmaller ? {"flexDirection": "column"} : {}}
                            >
                                {/*服务地区，如中国大陆*/}
                                {
                                    position &&
                                    <RowUnit
                                        colorAttr={positionColor}
                                        fontAttr={positionFont}
                                        customStyleAttr={RowAttr.getChildrenPositionObj()}
                                    >
                                        <EnvironmentOutlined
                                            style={Object.assign(RowAttr.getChildrenPositionObj(), {"fontSize": "0.95em"})}/>
                                        <BoxUnit sizeAttr={new SizeAttr(wp, "4px")}/>
                                        <SpanText
                                            colorAttr={positionColor}
                                            customStyleAttr={leftAlignSpanObj}
                                        >
                                            {position}
                                        </SpanText>
                                    </RowUnit>
                                }
                                {
                                    position &&
                                    <BoxUnit colorAttr={sectionColor}
                                             sizeAttr={new SizeAttr(wp, textGap, lineGap)}/>
                                }

                                {/*公司信息，如Cloudyhub.Inc*/}
                                <SpanText
                                    colorAttr={cpColor}
                                    fontAttr={cpFont}
                                    customStyleAttr={Object.assign(leftAlignSpanObj, cpSpanCustomObj)}
                                >
                                    {cpText}
                                </SpanText>

                                {
                                    !phoneSmaller &&
                                    <BoxUnit colorAttr={sectionColor}
                                             sizeAttr={new SizeAttr(wp, textGap, lineGap)}/>
                                }
                            </RowUnit>
                        )
                    }

                    if (mediumSmaller) {
                        return (
                            <ColumnUnit sizeAttr={sectionSize} colorAttr={sectionColor}
                                        fontAttr={sectionFont} customStyleAttr={customStyleAttr} onClick={onClick}>
                                {cpRow()}
                                <BoxUnit colorAttr={sectionColor}
                                         sizeAttr={new SizeAttr(wp, textGap, lineGap)}/>
                                {icpAndPoliceRow()}
                            </ColumnUnit>
                        )
                    }

                    return (
                        <RowUnit sizeAttr={sectionSize} colorAttr={sectionColor}
                                 fontAttr={sectionFont} customStyleAttr={customStyleAttr} onClick={onClick}>
                            {/*服务地区，如中国大陆*/}
                            {
                                position &&
                                <RowUnit
                                    colorAttr={positionColor}
                                    fontAttr={positionFont}
                                    customStyleAttr={RowAttr.getChildrenPositionObj()}
                                >
                                    <EnvironmentOutlined
                                        style={Object.assign(RowAttr.getChildrenPositionObj(), {"fontSize": "0.95em"})}/>
                                    <BoxUnit sizeAttr={new SizeAttr(wp, "4px")}/>
                                    <SpanText
                                        colorAttr={positionColor}
                                        customStyleAttr={leftAlignSpanObj}
                                    >
                                        {position}
                                    </SpanText>
                                </RowUnit>
                            }
                            {
                                position &&
                                <BoxUnit colorAttr={sectionColor}
                                         sizeAttr={new SizeAttr(wp, textGap, lineGap)}/>
                            }

                            {/*公司信息，如Cloudyhub.Inc*/}
                            <SpanText
                                colorAttr={cpColor}
                                fontAttr={cpFont}
                                customStyleAttr={Object.assign(leftAlignSpanObj, cpSpanCustomObj)}
                            >
                                {cpText}
                            </SpanText>

                            <BoxUnit colorAttr={sectionColor}
                                     sizeAttr={new SizeAttr(wp, textGap, lineGap)}/>

                            <SpanHoverText
                                colorAttr={icpColor}
                                fontAttr={icpFont}
                                hoverColorAttr={icpHoverColor}
                                hoverFontAttr={icpHoverFont}
                                onClick={() => {
                                    if (icpLink) {
                                        window.location.href = icpLink;
                                    }
                                }}
                                customStyleAttr={RowAttr.getChildrenPositionObj()}
                            >
                                {icpText}
                            </SpanHoverText>
                            <BoxUnit colorAttr={sectionColor} sizeAttr={new SizeAttr(wp, textGap)}></BoxUnit>

                            {
                                policeText &&
                                <RowUnit customStyleAttr={RowAttr.getChildrenPositionObj()}>
                                    <ImageUnit customStyleAttr={RowAttr.getChildrenPositionObj()}
                                               colorAttr={sectionColor} url={PoliceIcon}
                                               sizeAttr={new SizeAttr(wp, "", policeIconSize)}/>
                                    <BoxUnit colorAttr={sectionColor} sizeAttr={new SizeAttr(wp, "3px")}></BoxUnit>
                                    <SpanHoverText
                                        colorAttr={policeColor}
                                        fontAttr={policeFont}
                                        hoverColorAttr={policeHoverColor}
                                        hoverFontAttr={policeHoverFont}
                                        onClick={() => {
                                            if (policeLink) {
                                                window.location.href = policeLink;
                                            }
                                        }}
                                        customStyleAttr={RowAttr.getChildrenPositionObj()}
                                    >
                                        {policeText}
                                    </SpanHoverText>
                                </RowUnit>
                            }
                        </RowUnit>
                    )
                }
                }
            </WindowParamContext.Consumer>
        )
    }
}