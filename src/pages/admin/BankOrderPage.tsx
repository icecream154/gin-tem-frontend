import {Component} from "react";
import {WindowParamContext} from "../../library/context/WindowContext";
import {SizeAttr} from "../../library/basic/size";
import {ColumnAttr} from "../../library/basic/compose";
import {ColumnUnit} from "../../library/atomic/unit/ColumnUnit";
import {FontAttr} from "../../library/basic/font";
import {ColorAttr} from "../../library/basic/color";
import {AdminNav} from "./component/AdminNav";
import {BankOrderData} from "./data/BankOrder";
import {heightGap} from "../../library/atomic/unit/BoxUnit";
import {SpanText} from "../../library/atomic/text/SpanText";
import {fetchCurrEntity} from "./data/entities";
import {basicHeightGap, basicWidthGap} from "./display/layout";

export class BankOrderPage extends Component {
    static contextType = WindowParamContext;

    state: {
        tableData: BankOrderData[]
    } = {
        tableData: []
    }

    componentDidMount() {

    }

    render() {
        return (
            <WindowParamContext.Consumer>
                {wpt => {
                    let wp = wpt.param;

                    return (
                        <ColumnUnit fontAttr={new FontAttr(wp, "0.88em")}
                                    sizeAttr={new SizeAttr(wp)}
                                    colorAttr={new ColorAttr(wp, "", "#F4F5F977")}
                                    customStyleAttr={Object.assign(ColumnAttr.getChildrenPositionObj(), {
                                        "minHeight": "100vh"
                                    })}>
                            {AdminNav(wp)}

                            {/*数据板块*/}
                            <ColumnUnit>
                                {heightGap(wp, basicHeightGap)}
                                <SpanText customStyleAttr={{"marginLeft": basicWidthGap, "justifyContent": ""}}
                                          fontAttr={new FontAttr(wp, "2em", "600")}>
                                    {fetchCurrEntity().description}
                                </SpanText>
                                {heightGap(wp, basicHeightGap)}
                            </ColumnUnit>

                        </ColumnUnit>
                    )
                }
                }
            </WindowParamContext.Consumer>
        )
    }
}