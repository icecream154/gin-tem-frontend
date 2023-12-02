import { CloseOutlined } from '@ant-design/icons';
import { Component } from 'react'
import { SpanHoverText } from '../../atomic/text/SpanHoverText';
import { SpanText } from '../../atomic/text/SpanText';
import { BoxUnit } from '../../atomic/unit/BoxUnit';
import { ColumnUnit } from '../../atomic/unit/ColumnUnit';
import { RowUnit } from '../../atomic/unit/RowUnit';
import { CustomUnitProps, UnitActionType } from '../../atomic/unit/UnitProps';
import { ColorAttr } from '../../basic/color';
import { ColumnAttr } from '../../basic/compose';
import { FontAttr } from '../../basic/font';
import { maxMiniGap, miniGap, SizeAttr } from '../../basic/size';
import { WindowParamContext } from '../../context/WindowContext';
import { NavLinkItem } from './navData';

export type NavMutiLevelCardProp = CustomUnitProps & {
    navLinkItem: NavLinkItem,
    cardSize: SizeAttr,
    infoSectionWidth: string,
    infoSectionGapHeight?: string,
    introductionSectionWidth?: string,
    columnWidth?: string,
    columnTopMargin?: string,
    columnGapWidth?: string,
    titleFontAttr?: FontAttr,
    titleColorAttr?: ColorAttr,
    descriptionFontAttr?: FontAttr,
    descriptionColorAttr?: ColorAttr,
    itemTitleDisplay?: boolean,
    itemTitleFontAttr?: FontAttr,
    itemTitleColorAttr?: ColorAttr,
    itemFontAttr?: FontAttr,
    itemColorAttr?: ColorAttr,
    itemHoverColorAttr?: ColorAttr,
    closeClick?: () => void,
    closeFontAttr?: FontAttr,
    closeColorAttr?: ColorAttr,
    unitAction?: UnitActionType
}

export class NavMutiLevelCard extends Component<NavMutiLevelCardProp> {
    static contextType = WindowParamContext;

    render() {
        return (
            <WindowParamContext.Consumer>
                {wpt => {
                    let wp = wpt.param;
                    let { navLinkItem, cardSize, infoSectionWidth, infoSectionGapHeight, introductionSectionWidth,
                        columnWidth, columnTopMargin, columnGapWidth, titleFontAttr, titleColorAttr, descriptionFontAttr, descriptionColorAttr,
                        itemTitleDisplay, itemTitleFontAttr, itemTitleColorAttr, itemFontAttr, itemColorAttr, itemHoverColorAttr,
                        closeClick, closeFontAttr, closeColorAttr, unitAction, customStyleAttr, onClick } = this.props;

                    if (itemTitleDisplay === undefined) {
                        itemTitleDisplay = true;
                    }

                    // 默认分配最左支持5个子项
                    if (!infoSectionGapHeight) {
                        infoSectionGapHeight = "16%";
                    }
                    if (!introductionSectionWidth) {
                        introductionSectionWidth = "19%";
                    }
                    if (!columnWidth) {
                        columnWidth = "";
                    }
                    if (!columnGapWidth) {
                        columnGapWidth = "8.5%";
                    }
                    if (!titleFontAttr) {
                        titleFontAttr = new FontAttr(wp, "1.55em", "600");
                    }
                    if (!descriptionFontAttr) {
                        descriptionFontAttr = new FontAttr(wp, "1.25em");
                    }
                    if (!itemTitleFontAttr) {
                        itemTitleFontAttr = new FontAttr(wp, "1.1em", "500");
                    }
                    if (!closeFontAttr) {
                        titleFontAttr = new FontAttr(wp, "1.55em", "600");
                    }
                    let emptyJustifyObj = { "justifyContent": "" };
                    return (
                        <ColumnUnit unitAction={unitAction} sizeAttr={cardSize} customStyleAttr={customStyleAttr} onClick={onClick}>
                            <BoxUnit sizeAttr={new SizeAttr(wp, "", infoSectionGapHeight)}></BoxUnit>
                            <RowUnit sizeAttr={new SizeAttr(wp, infoSectionWidth, "")} customStyleAttr={ColumnAttr.getChildrenPositionObj()}>
                                {/* introduction */}
                                <ColumnUnit sizeAttr={new SizeAttr(wp, introductionSectionWidth)}>
                                    <SpanText fontAttr={titleFontAttr} colorAttr={titleColorAttr} customStyleAttr={emptyJustifyObj}>
                                        {navLinkItem.name}
                                    </SpanText>
                                    <BoxUnit sizeAttr={new SizeAttr(wp, "", miniGap)}></BoxUnit>
                                    {
                                        navLinkItem.description &&
                                        <SpanText fontAttr={descriptionFontAttr} colorAttr={descriptionColorAttr} customStyleAttr={emptyJustifyObj}>
                                            {navLinkItem.description ? navLinkItem.description : ""}
                                        </SpanText>
                                    }
                                </ColumnUnit>
                                <BoxUnit sizeAttr={new SizeAttr(wp, columnGapWidth)}></BoxUnit>

                                {/* subItems */}
                                {
                                    navLinkItem.subItems.map((subItem, idx) => {
                                        let rightMargin = columnGapWidth;
                                        if (idx === navLinkItem.subItems.length - 1) {
                                            rightMargin = "auto";
                                        }

                                        return (
                                            <ColumnUnit
                                                sizeAttr={new SizeAttr(wp, columnWidth)}
                                                customStyleAttr={{ "marginRight": rightMargin, "marginTop": columnTopMargin }}>
                                                {
                                                    itemTitleDisplay &&
                                                    <SpanHoverText
                                                        fontAttr={itemTitleFontAttr}
                                                        colorAttr={itemTitleColorAttr}
                                                        hoverColorAttr={itemHoverColorAttr}
                                                        customStyleAttr={emptyJustifyObj}>
                                                        {subItem.name}
                                                    </SpanHoverText>
                                                }
                                                {
                                                    itemTitleDisplay &&
                                                    <BoxUnit sizeAttr={new SizeAttr(wp, "", maxMiniGap)}></BoxUnit>
                                                }
                                                {
                                                    subItem.subItems.map((item) => {
                                                        return (
                                                            <SpanHoverText
                                                                fontAttr={itemFontAttr}
                                                                colorAttr={itemColorAttr}
                                                                hoverColorAttr={itemHoverColorAttr}
                                                                onClick={() => { window.location.href = item.link }}
                                                                customStyleAttr={Object.assign(emptyJustifyObj, { "marginBottom": miniGap })}
                                                            >
                                                                {item.name}
                                                            </SpanHoverText>
                                                        )
                                                    })
                                                }
                                            </ColumnUnit>
                                        )
                                    })
                                }

                                {
                                    closeClick &&
                                    <ColumnUnit
                                        needHover={true}
                                        onClick={closeClick}
                                        customStyleAttr={{ "justifyContent": "" }}
                                        fontAttr={closeFontAttr}
                                        colorAttr={closeColorAttr}>
                                        <CloseOutlined />
                                    </ColumnUnit>
                                }

                            </RowUnit>
                        </ColumnUnit>
                    )
                }
                }
            </WindowParamContext.Consumer>
        )
    }
}