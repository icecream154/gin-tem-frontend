import {ColumnUnit} from "../../../library/atomic/unit/ColumnUnit";
import {ColorAttr} from "../../../library/basic/color";
import {heightGap} from "../../../library/atomic/unit/BoxUnit";
import {SpanText} from "../../../library/atomic/text/SpanText";
import {FontAttr} from "../../../library/basic/font";
import {project} from "../data/project";
import {SizeAttr} from "../../../library/basic/size";
import {RowUnit} from "../../../library/atomic/unit/RowUnit";
import {allEntities} from "../data/entities";
import {ButtonUnit} from "../../../library/atomic/button/Button";
import {WindowParam} from "../../../library/context/WindowContext";
import {basicHeightGap, basicWidthGap} from "../display/layout";

export function AdminNav(wp: WindowParam) {
    return (
        <ColumnUnit>
            {/*页面标题*/}
            <ColumnUnit colorAttr={new ColorAttr(wp, "", "#F4F5F9")}>
                {heightGap(wp, basicHeightGap)}
                <SpanText customStyleAttr={{"marginLeft": basicWidthGap, "justifyContent": ""}}
                          fontAttr={new FontAttr(wp, "2em", "600")}>
                    {project.description}
                </SpanText>
                {heightGap(wp, basicHeightGap)}
            </ColumnUnit>

            {/*管理选择*/}
            <ColumnUnit colorAttr={new ColorAttr(wp, "", "white")}>
                {heightGap(wp, SizeAttr.pxMultiple(basicHeightGap, 1.5))}
                <SpanText customStyleAttr={{"marginLeft": basicWidthGap, "justifyContent": ""}}
                          fontAttr={new FontAttr(wp, "1.25em", "500")}>
                    管理项目
                </SpanText>
                {heightGap(wp, SizeAttr.pxMultiple(basicHeightGap, 1.5))}
                <RowUnit customStyleAttr={{"flexWrap": "wrap", "marginLeft": basicWidthGap}}>
                    {
                        allEntities.map((entity, idx) => {
                            return <ButtonUnit
                                text={entity.description}
                                innerGap={SizeAttr.pxMultiple(basicWidthGap, 0.75)}
                                onClick={() => { window.location.href = entity.adminUrl; }}
                                borderRadius={"6px"}
                                fontAttr={new FontAttr(wp, "1.08em")}
                                colorAttr={new ColorAttr(wp, "", "#EEEEEE88")}
                                hoverColorAttr={new ColorAttr(wp, "", "#EEEEEEEE")}
                                buttonSize={new SizeAttr(wp, "", "44px")}
                                customStyleAttr={{"marginRight": basicWidthGap}}
                            />
                        })
                    }
                </RowUnit>
                {heightGap(wp, SizeAttr.pxMultiple(basicHeightGap, 1.5))}
            </ColumnUnit>
        </ColumnUnit>
    )
}