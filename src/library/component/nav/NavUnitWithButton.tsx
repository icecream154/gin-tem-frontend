import { Component } from 'react'
import { ImageUnit } from '../../atomic/image/ImageUnit';
import { BoxUnit } from '../../atomic/unit/BoxUnit';
import { RowUnit } from '../../atomic/unit/RowUnit';
import { RowAttr } from '../../basic/compose';
import { FontAttr } from '../../basic/font';
import { SizeAttr } from '../../basic/size';
import { NavLinkItem } from './navData';
import DefaultNavLogo from '../../../assets/TopNavInfo-min.png'
import { NavUnitProps } from './NavUnit';
import { ButtonProps, ButtonUnit } from '../../atomic/button/Button';
import { ColorAttr, transparentObj } from '../../basic/color';
import { SpanHoverText } from '../../atomic/text/SpanHoverText';
import { WindowParam, WindowParamContext } from '../../context/WindowContext';
import { SpanText } from '../../atomic/text/SpanText';
// import { SpanHoverUnderlinedText } from '../../atomic/text/SpanHoverUnderlinedText';

export type NavUnitWithButtonProps = NavUnitProps & {
    buttons: ButtonProps[]
    buttonLeftGap?: string
    navTopItemGap?: string
    navTopItemHoverColor?: ColorAttr
    navTopItemHoverUnderlined?: boolean
}

export class NavWithButtonUnit extends Component<NavUnitWithButtonProps> {
    static contextType = WindowParamContext;

    state = {
        isMenuOpen: false
    }

    render() {
        let { menuOpenFunc, menuCloseFunc } = this.props;

        let navLogo = this.props.navLogo ? this.props.navLogo : DefaultNavLogo;
        let navLogoWidth = this.props.navLogoWidth ? this.props.navLogoWidth : "231px";
        let navLogoHeight = this.props.navLogoHeight ? this.props.navLogoHeight : "";
        let navHeight = this.props.navHeight ? this.props.navHeight : "14vh"
        let navWidth = this.props.navWidth ? this.props.navWidth : "62vw"
        let navTopItemWidth = this.props.navTopItemWidth ? this.props.navTopItemWidth : "15%"
        if (navTopItemWidth === "notFixed") {
            navTopItemWidth = ""
        }
        let navFontSize = this.props.navFontSize ? this.props.navFontSize : "1.2em"
        let navFontFamily = this.props.navFontFamily ? this.props.navFontFamily : "";
        let suffixIconSize = this.props.suffixIconSize ? this.props.suffixIconSize : "1.8em";

        let navRowCustomStyle = Object.assign({
            "justifyContent": "center",
            "marginLeft": "auto",
            "marginRight": "auto",
        }, this.props.customStyleAttr);

        return (
            <WindowParamContext.Consumer>
                {wpt => {
                    let wp = wpt.param;
                    return (
                        <RowUnit sizeAttr={new SizeAttr(wp, navWidth, navHeight)} fontAttr={new FontAttr(wp, navFontSize, "", navFontFamily)} customStyleAttr={navRowCustomStyle}>
                            <BoxUnit customStyleAttr={{ "marginRight": "auto" }}>
                                <ImageUnit
                                    url={navLogo}
                                    sizeAttr={new SizeAttr(wp, navLogoWidth, navLogoHeight)}
                                    colorAttr={transparentObj}
                                    customStyleAttr={RowAttr.getChildrenPositionObj()}
                                />
                            </BoxUnit>

                            {
                                wp.currWidth >= wp.mileParam.expandPcWidth &&
                                this.props.navItems.map((ni: NavLinkItem) => {
                                    return (
                                        <RowUnit key={ni.name} sizeAttr={new SizeAttr(wp, navTopItemWidth)}>
                                            <SpanHoverText
                                                hoverColorAttr={this.props.navTopItemHoverColor}
                                                // selected={ni.selected}
                                                suffixIcon={ni.addIcon}
                                                suffixCustomStyle={{ "fontSize": "0.8em" }}
                                                customStyleAttr={RowAttr.getChildrenPositionObj()}
                                                onClick={() => {
                                                    if (!ni.onClick) {
                                                        window.location.href = ni.link
                                                    } else {
                                                        ni.onClick();
                                                    }
                                                }}
                                            >
                                                {ni.name}
                                            </SpanHoverText>
                                            <BoxUnit sizeAttr={new SizeAttr(wp, this.props.navTopItemGap)}></BoxUnit>
                                        </RowUnit>
                                    )
                                })
                            }

                            {/* <BoxUnit sizeAttr={new SizeAttr(wp, buttonLeftGap)}></BoxUnit> */}

                            {
                                wp.currWidth >= wp.mileParam.phoneWidth &&
                                this.props.buttons.map((button: ButtonProps) => {
                                    return (
                                        <BoxUnit key={button.text} sizeAttr={new SizeAttr(wp, navTopItemWidth)}>
                                            <ButtonUnit {...button}></ButtonUnit>
                                        </BoxUnit>
                                    )
                                })
                            }

                            {
                                wp.currWidth < wp.mileParam.expandPcWidth &&
                                <SpanHoverText
                                    suffixIcon={this.state.isMenuOpen ? "CloseOutlined" : "MenuOutlined"}
                                    suffixCustomStyle={{ "fontSize": suffixIconSize }}
                                    customStyleAttr={Object.assign(RowAttr.getChildrenPositionObj(), { "marginLeft": "3vw" })}
                                    onClick={() => {
                                        if (this.state.isMenuOpen) {
                                            if (menuCloseFunc) {
                                                menuCloseFunc();
                                            }
                                            this.setState({ "isMenuOpen": false });
                                        } else {
                                            if (menuOpenFunc) {
                                                menuOpenFunc();
                                            }
                                            this.setState({ "isMenuOpen": true });
                                        }
                                    }}
                                >
                                    {""}
                                </SpanHoverText>
                            }

                        </RowUnit>
                    )
                }
                }
            </WindowParamContext.Consumer>
        )
    }
}