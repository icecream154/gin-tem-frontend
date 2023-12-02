import { Component } from 'react'
import { SpanHoverText } from '../../../atomic/text/SpanHoverText';
import { SpanText } from '../../../atomic/text/SpanText';
import { ColumnUnit } from '../../../atomic/unit/ColumnUnit';
import { RowUnit } from '../../../atomic/unit/RowUnit';
import { CustomUnitProps } from '../../../atomic/unit/UnitProps';
import { ColorAttr } from '../../../basic/color';
import { ColumnAttr, RowAttr } from '../../../basic/compose';
import { SizeAttr } from '../../../basic/size';
import { WindowParam, WindowParamContext } from '../../../context/WindowContext';
import { NavLinkItem } from '../../nav/navData';
import { CopyrightBaseSection } from './CopyrightBaseSection';

export type CopyrightWithLinksSectionProps = CustomUnitProps & {
    sectionSize: SizeAttr,
    positionText?: string,
    cpText: string,
    icpText: string,
    icpLink: string,
    policeText: string,
    policeLink: string,
    links: NavLinkItem[],
    linkHoverColor?: string,
    linkWidthGap?: string,
    bgColor?: string,
    textColor?: string,
    offColor?: string,
    offHoverColor?: string
}

export class CopyRightWithLinksSection extends Component<CopyrightWithLinksSectionProps> {
    static contextType = WindowParamContext;

    render() {
        let { sectionSize, positionText, cpText, icpText, icpLink, policeText, policeLink, links,
            linkHoverColor, linkWidthGap, bgColor, textColor, offColor,
            offHoverColor, customStyleAttr, onClick } = this.props;

        if (!bgColor) {
            bgColor = "#0D3056";
        }
        if (!textColor) {
            textColor = "white";
        }
        if (!linkHoverColor) {
            linkHoverColor = textColor;
        }
        if (!linkWidthGap) {
            linkWidthGap = "15px";
        }

        if (!offColor) {
            offColor = "white";
        }
        if (!offHoverColor) {
            offHoverColor = "white";
        }

        let linkItemCustomAttr = Object.assign(
            RowAttr.getChildrenPositionObj(), { "marginRight": linkWidthGap }
        );

        return (
            <WindowParamContext.Consumer>
                {wpt => {
                    let wp = wpt.param;

                    let cpLineMarginObj = { "marginBottom": "1.5vh" };

                    return (
                        <ColumnUnit
                            sizeAttr={new SizeAttr(wp, "100vw", sectionSize.height)}
                            colorAttr={new ColorAttr(wp, textColor, bgColor)}
                            customStyleAttr={customStyleAttr}
                            onClick={onClick}
                        >
                            <ColumnUnit
                                sizeAttr={new SizeAttr(wp, sectionSize.width, "100%")}
                                colorAttr={new ColorAttr(wp, textColor, bgColor)}
                                customStyleAttr={ColumnAttr.getChildrenPositionObj()}>
                                {
                                    links &&
                                    <RowUnit
                                        sizeAttr={new SizeAttr(wp, "100%")}
                                        colorAttr={new ColorAttr(wp, textColor, bgColor)}
                                        customStyleAttr={cpLineMarginObj}
                                    >
                                        <SpanText
                                            colorAttr={new ColorAttr(wp, textColor, bgColor)}
                                            customStyleAttr={linkItemCustomAttr}
                                        >
                                            相关链接：
                                        </SpanText>
                                        {
                                            links.map((li) => {
                                                return (
                                                    <SpanHoverText
                                                        key={li.name}
                                                        colorAttr={new ColorAttr(wp, textColor, bgColor)}
                                                        hoverColorAttr={new ColorAttr(wp, linkHoverColor, bgColor)}
                                                        customStyleAttr={linkItemCustomAttr}
                                                        onClick={() => {
                                                            if (li.link) {
                                                                window.location.href = li.link;
                                                            }
                                                        }}
                                                    >
                                                        {li.name}
                                                    </SpanHoverText>
                                                )
                                            })
                                        }
                                    </RowUnit>
                                }

                                <CopyrightBaseSection
                                    sectionSize={new SizeAttr(wp, sectionSize.width)}
                                    position={positionText}
                                    cpText={cpText}
                                    icpText={icpText}
                                    icpLink={icpLink}
                                    policeText={policeText}
                                    policeLink={policeLink}
                                    positionColor={new ColorAttr(wp, textColor, bgColor)}
                                    cpColor={new ColorAttr(wp, textColor, bgColor)}
                                    sectionColor={new ColorAttr(wp, textColor, bgColor)}
                                    icpColor={new ColorAttr(wp, offColor, bgColor)}
                                    policeColor={new ColorAttr(wp, offColor, bgColor)}
                                    icpHoverColor={new ColorAttr(wp, offHoverColor, bgColor)}
                                    policeHoverColor={new ColorAttr(wp, offHoverColor, bgColor)}
                                />
                            </ColumnUnit>
                        </ColumnUnit>
                    )
                }
                }
            </WindowParamContext.Consumer>
        )
    }
}