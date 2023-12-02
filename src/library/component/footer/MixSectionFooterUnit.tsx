import { ImageUnit } from "../../atomic/image/ImageUnit"
import { SpanHoverText } from "../../atomic/text/SpanHoverText"
import { SpanText } from "../../atomic/text/SpanText"
import { BoxUnit } from "../../atomic/unit/BoxUnit"
import { ColumnUnit } from "../../atomic/unit/ColumnUnit"
import { RowUnit } from "../../atomic/unit/RowUnit"
import { CustomUnit } from "../../atomic/unit/Unit"
import { CustomUnitProps } from "../../atomic/unit/UnitProps"
import { ColorAttr } from "../../basic/color"
import { BoxAttr, ColumnAttr } from "../../basic/compose"
import { FontAttr } from "../../basic/font"
import { basicGap, miniGap, minMiniGap, SizeAttr } from "../../basic/size"
import { WindowParam, WindowParamContext } from "../../context/WindowContext"
import { NavLinkItem } from "../nav/navData"
import { CopyRightWithLinksSection, CopyrightWithLinksSectionProps } from "./section/CopyrightWithLinksSection"

export type FooterAboutInfo = {
    title: string,
    description: string,
}

export type FooterLinkInfo = {
    title: string,
    outsideLinks: NavLinkItem[]
}

export type FooterContactInfo = {
    title: string,
    qrCodes: {
        qrImg: string,
        qrTitle: string
    }[],
    contactInfos: string[]
}

export type MixSectionFooterStyleProps = {
    bgColor: string,
    titleFont?: FontAttr,
    infoFont?: FontAttr,
    titleTextColor?: string,
    infoTextColor?: string,
    linkHoverTextColor?: string
}

export type MixSectionFooterInfo = CustomUnitProps & {
    aboutInfo: FooterAboutInfo,
    linkInfo: FooterLinkInfo,
    contactInfo: FooterContactInfo,
    sectionProps: MixSectionFooterStyleProps,
    copyrightProps: CopyrightWithLinksSectionProps
}

export class MixSectionFooterUnit extends CustomUnit<MixSectionFooterInfo> {
    static contextType = WindowParamContext;

    render() {
        return (
            <WindowParamContext.Consumer>
                {wpt => {
                    let wp = wpt.param;
                    let { aboutInfo, linkInfo, contactInfo, sectionProps, copyrightProps,
                        customStyleAttr, onClick } = this.props;

                    let { bgColor, titleFont, infoFont, titleTextColor, infoTextColor, linkHoverTextColor } = sectionProps;
                    if (!titleFont) {
                        titleFont = new FontAttr(wp, "1.25em", "600");
                    }
                    if (!titleTextColor) {
                        titleTextColor = "white";
                    }
                    if (!infoTextColor) {
                        infoTextColor = "white";
                    }
                    if (!linkHoverTextColor) {
                        linkHoverTextColor = "white";
                    }

                    let qrCodeImgSize = "12vh";
                    let labelGap = "0.6vh";

                    let mediumColumnObj = {};
                    let mediumRowObj = {};
                    let footerInfoSectionHeight = "42vh";
                    let aboutInfoSectionWidth = "36%";

                    let aboutInfoSectionCusObj = {};
                    let linkInfoSectionCusObj: {} = { "marginLeft": "auto", "marginRight": "auto" };
                    let contactInfoSectionCusObj = {};

                    if (wp.currWidth < wp.mileParam.mediaPanelWidth) {
                        mediumColumnObj = { "flexDirection": "column" };
                        mediumRowObj = { "flexDirection": "row" };
                        footerInfoSectionHeight = "";
                        aboutInfoSectionWidth = "";

                        aboutInfoSectionCusObj = { "marginTop": "4vh", "marginBottom": "4vh" };
                        linkInfoSectionCusObj = { "marginBottom": "4vh" };
                        contactInfoSectionCusObj = linkInfoSectionCusObj;
                    }

                    return (
                        <ColumnUnit
                            sizeAttr={new SizeAttr(wp, "100vw")}
                            colorAttr={new ColorAttr(wp, "", bgColor)}
                            customStyleAttr={customStyleAttr}
                            onClick={onClick}
                        >
                            <RowUnit
                                sizeAttr={new SizeAttr(wp, copyrightProps.sectionSize.width, footerInfoSectionHeight)}
                                colorAttr={new ColorAttr(wp, "", bgColor)}
                                customStyleAttr={ColumnAttr.getChildrenPositionObj()}
                            >
                                <RowUnit colorAttr={new ColorAttr(wp, "", bgColor)}
                                    customStyleAttr={
                                        Object.assign(
                                            BoxAttr.getChildrenPositionObj(), mediumColumnObj
                                        )
                                    }>
                                    {/* aboutInfoSection */}
                                    <ColumnUnit
                                        sizeAttr={new SizeAttr(wp, aboutInfoSectionWidth)}
                                        colorAttr={new ColorAttr(wp, "", bgColor)}
                                        customStyleAttr={aboutInfoSectionCusObj}>
                                        <SpanText
                                            fontAttr={titleFont}
                                            colorAttr={new ColorAttr(wp, titleTextColor, bgColor)}
                                            customStyleAttr={{ "justifyContent": "" }}>
                                            {aboutInfo.title}
                                        </SpanText>
                                        <BoxUnit colorAttr={new ColorAttr(wp, "", bgColor)}
                                            sizeAttr={new SizeAttr(wp, "", miniGap)} />
                                        <SpanText
                                            fontAttr={infoFont}
                                            colorAttr={new ColorAttr(wp, infoTextColor, bgColor)}
                                            customStyleAttr={{ "justifyContent": "" }}>
                                            {aboutInfo.description}
                                        </SpanText>
                                    </ColumnUnit>

                                    {/* linkSection */}
                                    <ColumnUnit
                                        customStyleAttr={linkInfoSectionCusObj}
                                        colorAttr={new ColorAttr(wp, "", bgColor)}>
                                        <SpanText
                                            fontAttr={titleFont}
                                            colorAttr={new ColorAttr(wp, titleTextColor, bgColor)}
                                            customStyleAttr={{ "justifyContent": "" }}>
                                            {linkInfo.title}
                                        </SpanText>
                                        <BoxUnit colorAttr={new ColorAttr(wp, "", bgColor)}
                                            sizeAttr={new SizeAttr(wp, "", miniGap)} />
                                        <ColumnUnit customStyleAttr={mediumRowObj}>
                                            {
                                                linkInfo.outsideLinks.map((olink) => {
                                                    return (<SpanHoverText
                                                        key={olink.name}
                                                        fontAttr={infoFont}
                                                        colorAttr={new ColorAttr(wp, infoTextColor, bgColor)}
                                                        hoverColorAttr={new ColorAttr(wp, linkHoverTextColor, bgColor)}
                                                        onClick={() => {
                                                            if (olink.link) {
                                                                window.location.href = olink.link;
                                                            }
                                                        }}
                                                        customStyleAttr={{ "justifyContent": "", "marginRight": labelGap, "marginBottom": labelGap }}>
                                                        {olink.name}
                                                    </SpanHoverText>)
                                                })
                                            }
                                        </ColumnUnit>
                                    </ColumnUnit>

                                    {/* contactSection */}
                                    <ColumnUnit
                                        colorAttr={new ColorAttr(wp, "", bgColor)}
                                        customStyleAttr={contactInfoSectionCusObj}
                                    >
                                        <SpanText
                                            fontAttr={titleFont}
                                            colorAttr={new ColorAttr(wp, titleTextColor, bgColor)}
                                            customStyleAttr={{ "justifyContent": "" }}>
                                            {contactInfo.title}
                                        </SpanText>


                                        {/* qrCodes */}
                                        {
                                            wp.currWidth >= wp.mileParam.expandPcWidth &&
                                            <BoxUnit colorAttr={new ColorAttr(wp, "", bgColor)}
                                                sizeAttr={new SizeAttr(wp, "", miniGap)} />
                                        }
                                        {
                                            wp.currWidth >= wp.mileParam.expandPcWidth &&
                                            <RowUnit colorAttr={new ColorAttr(wp, "", bgColor)}>
                                                {
                                                    contactInfo.qrCodes.map((qrCode) => {
                                                        return (
                                                            <ColumnUnit
                                                                key={qrCode.qrTitle}
                                                                sizeAttr={new SizeAttr(wp, qrCodeImgSize, "")}
                                                                colorAttr={new ColorAttr(wp, "", bgColor)}
                                                                fontAttr={new FontAttr(wp, "0.81em")}
                                                                customStyleAttr={{ "marginRight": basicGap }}
                                                            >
                                                                <ImageUnit
                                                                    colorAttr={new ColorAttr(wp, "", bgColor)}
                                                                    url={qrCode.qrImg}
                                                                    sizeAttr={new SizeAttr(wp, qrCodeImgSize, qrCodeImgSize)}
                                                                />
                                                                <BoxUnit colorAttr={new ColorAttr(wp, "", bgColor)}
                                                                    sizeAttr={new SizeAttr(wp, "", minMiniGap)} />
                                                                <SpanText
                                                                    fontAttr={infoFont}
                                                                    colorAttr={new ColorAttr(wp, infoTextColor, bgColor)}
                                                                    customStyleAttr={ColumnAttr.getChildrenPositionObj()}
                                                                >
                                                                    {qrCode.qrTitle}
                                                                </SpanText>
                                                            </ColumnUnit>
                                                        )
                                                    })
                                                }
                                            </RowUnit>
                                        }

                                        <BoxUnit colorAttr={new ColorAttr(wp, "", bgColor)}
                                            sizeAttr={new SizeAttr(wp, "", miniGap)} />
                                        {
                                            contactInfo.contactInfos.map((olink) => {
                                                return (<SpanText
                                                    key={olink}
                                                    fontAttr={infoFont}
                                                    colorAttr={new ColorAttr(wp, infoTextColor, bgColor)}
                                                    customStyleAttr={{ "justifyContent": "", "marginBottom": labelGap }}>
                                                    {olink}
                                                </SpanText>)
                                            })
                                        }
                                    </ColumnUnit>
                                </RowUnit>
                            </RowUnit>

                            <BoxUnit sizeAttr={new SizeAttr(wp, "100vw", "1px")}
                                colorAttr={new ColorAttr(wp, "", "gray")} />

                            {/* CopyRightWithLinksSection */}
                            <BoxUnit sizeAttr={new SizeAttr(wp, "", "2.5vh")}
                                colorAttr={new ColorAttr(wp, "", copyrightProps.bgColor)}></BoxUnit>
                            <CopyRightWithLinksSection {...copyrightProps} />
                            <BoxUnit sizeAttr={new SizeAttr(wp, "", "2.5vh")}
                                colorAttr={new ColorAttr(wp, "", copyrightProps.bgColor)}></BoxUnit>

                        </ColumnUnit>
                    )
                }
                }
            </WindowParamContext.Consumer>
        )

    }
}

