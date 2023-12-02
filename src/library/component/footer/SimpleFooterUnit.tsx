import {InstagramOutlined, QqOutlined, TwitterOutlined, WechatOutlined, WeiboOutlined} from '@ant-design/icons';
import {Component} from 'react'
import {SpanText} from '../../atomic/text/SpanText';
import {BoxUnit} from '../../atomic/unit/BoxUnit';
import {RowUnit} from '../../atomic/unit/RowUnit';
import {BoxAttr, RowAttr} from '../../basic/compose';
import {FontAttr} from '../../basic/font';
import {regularInfoSectionPcWidth, SizeAttr} from '../../basic/size';
import {WindowParam, WindowParamContext} from '../../context/WindowContext';

export type SimpleFooterUnitProps = {
    email: string
    footerHeight?: string
    footerWidth?: string
    footerTopItemWidth?: string
    footerFontSize?: string
}

export class SimpleFooterUnit extends Component<SimpleFooterUnitProps> {
    static contextType = WindowParamContext;

    render() {
        let footerHeight = this.props.footerHeight ? this.props.footerHeight : "14vh"
        let footerWidth = this.props.footerWidth ? this.props.footerWidth : regularInfoSectionPcWidth
        let footerFontSize = this.props.footerFontSize ? this.props.footerFontSize : "1.2em"
        let iconFontSize = "1.65em"

        return (
            <WindowParamContext.Consumer>
                {wpt => {
                    let wp = wpt.param;

                    let rowUnitCus = {
                        "justifyContent": "center",
                        "marginLeft": "auto",
                        "marginRight": "auto"
                    };
                    let iconWidth = "50%";
                    let mailWidth = "25%";
                    let mailUnitCus: {} = {"fontStyle": "italic", "textDecoration": "underline", "marginRight": "auto"};
                    if (wp.currWidth < wp.mileParam.phoneWidth) {
                        rowUnitCus = Object.assign(rowUnitCus, {"flexDirection": "column"});
                        iconWidth = "80%";
                        mailWidth = "100%";
                        mailUnitCus = {
                            "fontStyle": "italic",
                            "textDecoration": "underline",
                            "marginLeft": "auto",
                            "marginRight": "auto"
                        };
                    }

                    return (
                        <RowUnit sizeAttr={new SizeAttr(wp, footerWidth, footerHeight)}
                                 fontAttr={new FontAttr(wp, footerFontSize)} customStyleAttr={
                            rowUnitCus
                        }>
                            <RowUnit sizeAttr={new SizeAttr(wp, iconWidth)}
                                     customStyleAttr={BoxAttr.getChildrenPositionObj()}>
                                <BoxUnit fontAttr={new FontAttr(wp, iconFontSize)}
                                         customStyleAttr={{"marginLeft": "auto", "marginRight": "auto"}}>
                                    <WechatOutlined/>
                                </BoxUnit>
                                <BoxUnit fontAttr={new FontAttr(wp, iconFontSize)}
                                         customStyleAttr={{"marginLeft": "auto", "marginRight": "auto"}}>
                                    <QqOutlined/>
                                </BoxUnit>
                                <BoxUnit fontAttr={new FontAttr(wp, iconFontSize)}
                                         customStyleAttr={{"marginLeft": "auto", "marginRight": "auto"}}>
                                    <WeiboOutlined/>
                                </BoxUnit>
                                <BoxUnit fontAttr={new FontAttr(wp, iconFontSize)}
                                         customStyleAttr={{"marginLeft": "auto", "marginRight": "auto"}}>
                                    <TwitterOutlined/>
                                </BoxUnit>
                                <BoxUnit fontAttr={new FontAttr(wp, iconFontSize)}
                                         customStyleAttr={{"marginLeft": "auto"}}>
                                    <InstagramOutlined/>
                                </BoxUnit>
                            </RowUnit>

                            {/* <BoxUnit sizeAttr={new SizeAttr(wp, "5%")} /> */}

                            <RowUnit sizeAttr={new SizeAttr(wp, mailWidth)}
                                     customStyleAttr={BoxAttr.getChildrenPositionObj()}>
                                <SpanText fontAttr={new FontAttr(wp, "1.4em")} customStyleAttr={
                                    mailUnitCus
                                }>
                                    {this.props.email}
                                </SpanText>
                            </RowUnit>
                        </RowUnit>
                    )
                }
                }
            </WindowParamContext.Consumer>
        )
    }
}