import { Component } from 'react'
import { ImageUnit } from '../../atomic/image/ImageUnit';
import { SpanHoverUnderlinedText } from '../../atomic/text/SpanHoverUnderlinedText';
import { BoxUnit } from '../../atomic/unit/BoxUnit';
import { RowUnit } from '../../atomic/unit/RowUnit';
import { RowAttr } from '../../basic/compose';
import { FontAttr } from '../../basic/font';
import { regularInfoSectionPcWidth, SizeAttr } from '../../basic/size';
import { NavLinkItem } from './navData';
import DefaultNavLogo from '../../../assets/TopNavInfo-min.png'
import { CustomUnitProps } from '../../atomic/unit/UnitProps';
import { WindowParam, WindowParamContext } from '../../context/WindowContext';
import { SpanHoverText } from '../../atomic/text/SpanHoverText';

export type NavUnitProps = CustomUnitProps & {
    navLogo: string,
    navLogoWidth?: string,
    navLogoHeight?: string,
    navItems: NavLinkItem[]
    navHeight?: string
    navWidth?: string
    navTopItemWidth?: string
    navFontSize?: string
    navFontFamily?: string
    suffixIconSize?: string
    menuOpenFunc?: () => void
    menuCloseFunc?: () => void
}

export class NavUnit extends Component<NavUnitProps> {
    static contextType = WindowParamContext;

    state = {
        isMenuOpen: false
    }

    render() {
        let navLogo = this.props.navLogo ? this.props.navLogo : DefaultNavLogo;
        let navLogoWidth = this.props.navLogoWidth ? this.props.navLogoWidth : "211px";
        let navLogoHeight = this.props.navLogoHeight ? this.props.navLogoHeight : "";
        let navHeight = this.props.navHeight ? this.props.navHeight : "14vh"
        let navWidth = this.props.navWidth ? this.props.navWidth : regularInfoSectionPcWidth
        let navTopItemWidth = this.props.navTopItemWidth ? this.props.navTopItemWidth : "15%"
        if (navTopItemWidth === "notFixed") {
            navTopItemWidth = ""
        }
        let navFontSize = this.props.navFontSize ? this.props.navFontSize : "1.2em";
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

                    if (!this.props.navHeight && wp.currWidth < wp.mileParam.phoneWidth) {
                        navHeight = "9.5vh";
                    }

                    let { menuOpenFunc, menuCloseFunc } = this.props;

                    return (
                        <RowUnit sizeAttr={new SizeAttr(wp, navWidth, navHeight)} fontAttr={new FontAttr(wp, navFontSize, "", navFontFamily)} customStyleAttr={navRowCustomStyle}>
                            <RowUnit customStyleAttr={{ "marginRight": "auto" }}>
                                <ImageUnit
                                    url={navLogo}
                                    sizeAttr={new SizeAttr(wp, navLogoWidth, navLogoHeight)}
                                    customStyleAttr={RowAttr.getChildrenPositionObj()}
                                />
                            </RowUnit>

                            {
                                wp.currWidth >= wp.mileParam.mediaPanelWidth && this.props.navItems.map((ni: NavLinkItem) => {
                                    return (
                                        <BoxUnit key={ni.name} sizeAttr={new SizeAttr(wp, navTopItemWidth)}>
                                            <SpanHoverUnderlinedText
                                                customStyleAttr={RowAttr.getChildrenPositionObj()}
                                                onClick={() => { window.location.href = ni.link }}
                                            >
                                                {ni.name}
                                            </SpanHoverUnderlinedText>
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