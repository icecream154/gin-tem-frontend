import { SpanText } from "../../atomic/text/SpanText";
import { BoxUnit } from "../../atomic/unit/BoxUnit";
import { ColumnUnit } from "../../atomic/unit/ColumnUnit";
import { RowUnit } from "../../atomic/unit/RowUnit";
import { CustomUnit } from "../../atomic/unit/Unit";
import {CustomUnitProps, UnitActionType} from "../../atomic/unit/UnitProps"
import { ColorAttr } from "../../basic/color";
import { RowAttr } from "../../basic/compose";
import { FontAttr } from "../../basic/font";
import { SizeAttr } from "../../basic/size";
import { WindowParam, WindowParamContext } from "../../context/WindowContext";
import { isMobile } from "../../util/envUtil";
import { NavLinkItem } from "./navData"

export const defaultSepLineColor = "#F1F1F1";
export const defaultSepLineHeight = "1.5px";
const defaultItemSize: (wp: WindowParam) => SizeAttr = function (wp: WindowParam) {
    return new SizeAttr(wp, "100vw", "64px");
}
const defaultItemLeftMargin = "4vw";
const defaultSecondaryItemLeftMargin = "10vw";
const defaultIconLeftMargin = "4vw";

export type NavMenuItemProp = CustomUnitProps & {
    navLinkItem: NavLinkItem,
    navLevel: number,
    hoveredKey: string,
    expandSecondaryKey: string,
    hoverInFunction: (itemKey: string) => void,
    hoverOutFunction: () => void,
    itemSize?: SizeAttr,
    itemFont?: FontAttr,
    itemColor?: ColorAttr,
    itemHoverColor?: ColorAttr,
    itemLeftMargin?: string,
    itemClick?: () => void,
    sepLineHeight?: string,
    sepLineColor?: string,
    iconRightMargin?: string
}

export class NavMenuItem extends CustomUnit<NavMenuItemProp> {
    static contextType = WindowParamContext;

    render() {
        return (
            <WindowParamContext.Consumer>
                {wpt => {
                    let wp = wpt.param;

                    let { navLinkItem, navLevel, hoverInFunction, hoverOutFunction, hoveredKey, expandSecondaryKey,
                        itemSize, itemFont, itemColor, itemHoverColor,
                        itemLeftMargin, itemClick, sepLineColor, sepLineHeight, iconRightMargin } = this.props;

                    if (!sepLineColor) sepLineColor = defaultSepLineColor;
                    if (!sepLineHeight) sepLineHeight = defaultSepLineHeight;

                    if (!itemSize) itemSize = defaultItemSize(wp);
                    if (!itemLeftMargin) itemLeftMargin = defaultItemLeftMargin;
                    if (!iconRightMargin) iconRightMargin = defaultIconLeftMargin;
                    if (!itemClick) itemClick = () => { window.location.href = navLinkItem.link; };

                    return (
                        <ColumnUnit
                            key={navLinkItem.key + "_navItem_" + hoveredKey + "_" }
                            classname="hoverCursor"
                            onMouseEnter={() => { hoverInFunction(navLinkItem.key); console.log("nav item in"); }}
                            onMouseLeave={() => { hoverOutFunction(); console.log("nav item out"); }}
                            sizeAttr={new SizeAttr(wp, itemSize.width)}
                            fontAttr={itemFont}
                            colorAttr={(hoveredKey === navLinkItem.key || expandSecondaryKey === navLinkItem.key) ? itemHoverColor : itemColor}
                            onClick={itemClick}
                        >
                            <RowUnit
                                sizeAttr={itemSize}
                            >
                                <BoxUnit sizeAttr={new SizeAttr(wp, itemLeftMargin)} />
                                <SpanText
                                    customStyleAttr={RowAttr.getChildrenPositionObj()}
                                >
                                    {navLinkItem.name}
                                </SpanText>
                                {
                                    navLevel === 0 && navLinkItem.subItems.length > 0 &&
                                    <SpanText
                                        suffixIcon={expandSecondaryKey === navLinkItem.key ? "DownOutlined" : "RightOutlined"}
                                        suffixCustomStyle={{ "fontSize": "1.05em" }}
                                        customStyleAttr={
                                            Object.assign(
                                                RowAttr.getChildrenPositionObj(),
                                                { "marginLeft": "auto", "marginRight": iconRightMargin })
                                        }
                                    >
                                        {""}
                                    </SpanText>
                                }
                            </RowUnit>
                            <BoxUnit
                                sizeAttr={new SizeAttr(wp, itemSize.width, sepLineHeight)}
                                colorAttr={new ColorAttr(wp, "", sepLineColor)}
                            />
                        </ColumnUnit>
                    )
                }
                }
            </WindowParamContext.Consumer>
        )
    }
}

export type NavMenuProp = CustomUnitProps & {
    navLinkItems: NavLinkItem[],
    navLevel?: number,
    itemSize?: SizeAttr,
    itemFont?: FontAttr,
    itemColor?: ColorAttr,
    itemHoverColor?: ColorAttr,
    itemLeftMargin?: string,
    secondaryLeftMargin?: string,
}

export class NavMenu extends CustomUnit<NavMenuProp> {
    static contextType = WindowParamContext;

    state = {
        hoveredKey: "",
        expandSecondaryKey: ""
    }

    render() {
        return (
            <WindowParamContext.Consumer>
                {wpt => {
                    let wp = wpt.param;
                    let { navLinkItems, navLevel, itemSize, itemFont, itemColor,
                        itemHoverColor, itemLeftMargin, secondaryLeftMargin } = this.props;
                    if (!navLevel) {
                        navLevel = 0;
                    }
                    if (!itemLeftMargin) itemLeftMargin = defaultItemLeftMargin;
                    if (!secondaryLeftMargin) secondaryLeftMargin = defaultSecondaryItemLeftMargin;

                    return (
                        <ColumnUnit>
                            {
                                navLinkItems.map((navLinkItem) => {
                                    return (
                                        <ColumnUnit>
                                            <NavMenuItem
                                                navLinkItem={navLinkItem}
                                                navLevel={navLevel ? navLevel : 0}
                                                hoveredKey={this.state.hoveredKey}
                                                expandSecondaryKey={this.state.expandSecondaryKey}
                                                itemLeftMargin={itemLeftMargin}
                                                hoverInFunction={(itemKey: string) => {
                                                    if (isMobile()) {
                                                        if (navLinkItem.subItems.length === 0 || navLevel != 0) {
                                                            window.location.href = navLinkItem.link;
                                                        } else {
                                                            this.setState({ "hoveredKey": itemKey, "expandSecondaryKey": itemKey });
                                                        }
                                                    } else {
                                                        this.setState({ "hoveredKey": itemKey, "expandSecondaryKey": this.state.expandSecondaryKey });
                                                    }
                                                }}
                                                itemClick={() => {
                                                    if (navLinkItem.subItems.length === 0 || navLevel != 0) {
                                                        window.location.href = navLinkItem.link;
                                                    } else if (!isMobile()) {
                                                        if (this.state.expandSecondaryKey !== navLinkItem.key) {
                                                            this.setState({ "hoveredKey": navLinkItem.key, "expandSecondaryKey": navLinkItem.key });
                                                        } else {
                                                            this.setState({ "hoveredKey": navLinkItem.key, "expandSecondaryKey": "" });
                                                        }
                                                    } else {
                                                        this.setState({ "hoveredKey": "", "expandSecondaryKey": "" });
                                                    }
                                                }}
                                                hoverOutFunction={() => { this.setState({ "hoveredKey": "", "expandSecondaryKey": this.state.expandSecondaryKey }) }}
                                                itemSize={itemSize}
                                                itemFont={itemFont}
                                                itemColor={itemColor}
                                                itemHoverColor={itemHoverColor}
                                            />
                                            {
                                                navLevel === 0 &&
                                                <ColumnUnit
                                                    unitAction={UnitActionType.expand}
                                                    unitActionKey={"nav-sub-menu-" + navLinkItem.key}
                                                    unitExpandProps={{ "isExpand": navLinkItem.key === this.state.expandSecondaryKey, "transition": ".3s" }}
                                                >
                                                    <NavMenu
                                                        navLinkItems={navLinkItem.subItems}
                                                        navLevel={1}
                                                        itemSize={itemSize}
                                                        itemFont={itemFont}
                                                        itemColor={itemColor}
                                                        itemHoverColor={itemHoverColor}
                                                        itemLeftMargin={secondaryLeftMargin}
                                                    />
                                                </ColumnUnit>
                                            }
                                        </ColumnUnit>
                                    )
                                })
                            }
                        </ColumnUnit>
                    )
                }
                }
            </WindowParamContext.Consumer>
        )
    }
}