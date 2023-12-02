import { ColorAttr } from '../../basic/color';
import { BoxAttr, RowAttr } from '../../basic/compose';
import { FontAttr } from '../../basic/font';
import { SizeAttr } from '../../basic/size';
import { WindowParam, WindowParamContext } from '../../context/WindowContext';
import { getAntdIconFromName } from '../text/SpanText';
import { BoxUnit } from '../unit/BoxUnit';
import { CustomUnit } from '../unit/Unit';
import { CustomUnitProps } from '../unit/UnitProps';

/**
 * 按钮形状
 * round: 圆弧形
 * rect: 方形
 * rectReplica: 方形，含内边框
 */
export type ButtonShape = "round" | "rect" | "rectReplica"

/**
 * 常规按钮最小宽度
 */
export const buttonCommonMinWidth = "158px";

/**
 * 小按钮最小宽度
 */
export const buttonSmallerMinWidth = "98px";

/**
 * 按钮组件
 */
export type ButtonProps = CustomUnitProps & {
    /**
     * 按钮id，为空时使用按钮文字作为id
     */
    idx?: string,
    /**
     * 按钮文字
     */
    text: string,
    /**
     * 前缀icon
     */
    prefixIcon?: string
    /**
     * 前缀icon个性配置
     */
    prefixCustomStyle?: {},
    /**
     * 后缀icon
     */
    suffixIcon?: string,
    /**
     * 后缀icon个性配置
     */
    suffixCustomStyle?: {},
    /**
     * 按钮大小
     */
    buttonSize: SizeAttr
    /**
     * 按钮形状
     */
    buttonShape?: ButtonShape
    /**
     * 按钮圆弧半径
     */
    borderRadius?: string
    /**
     * 按钮边框配置
     */
    border?: string
    /**
     * 按钮文字左右间距
     */
    innerGap?: string
    /**
     * 按钮文字配置
     */
    fontAttr?: FontAttr
    /**
     * 按钮颜色配置
     */
    colorAttr?: ColorAttr
    /**
     * 悬浮文字配置
     */
    hoverFontAttr?: FontAttr
    /**
     * 悬浮文字配置
     */
    hoverColorAttr?: ColorAttr
    /**
     * 悬浮按钮边框配置
     */
    hoverBorder?: string
}

export class ButtonUnit extends CustomUnit<ButtonProps> {
    static contextType = WindowParamContext;

    state = {
        hover: false,
        version: 0
    }
    handleMouseEnter = () => {
        this.setState({ hover: true, version: this.state.version + 1 });
    };

    handleMouseLeave = () => {
        this.setState({ hover: false, version: this.state.version + 1 });
    };

    render() {
        let { idx, text, buttonSize,
            buttonShape, border, innerGap,
            fontAttr, colorAttr,
            hoverFontAttr, hoverColorAttr, hoverBorder,
            prefixIcon, prefixCustomStyle,
            suffixIcon, suffixCustomStyle,
            customStyleAttr, onClick } = this.props;

        // 设置默认按钮形状与按钮id
        if (!buttonShape) buttonShape = "round";
        if (!hoverBorder) hoverBorder = border;
        if (!idx) idx = text;

        // 是否悬浮
        let cFontAttr = fontAttr;
        let cColorAttr = colorAttr;
        let cBorder = border;
        if (this.state.hover) {
            cFontAttr = hoverFontAttr;
            cColorAttr = hoverColorAttr;
            cBorder = hoverBorder;
        }

        // 该div用于处理鼠标悬浮事件
        let mouseBoxStyleObj = {
            "background": "trasparent",
            "display": "flex",
            "width": "100%",
            "height": "100%"
        };
        // 该div用于实际渲染按钮ui
        let shapeObj = {
            "borderRadius": this.props.borderRadius
        }
        let innerBoxStyleObj = Object.assign({
            "display": "flex",
            "flexdirection": "row",
            "width": "100%",
            "height": "100%",
            "border": cBorder,
        }, shapeObj, cColorAttr?.getComposeObj())

        let innerSpanStyleObj = {
            "justifyContent": "center",
            "display": "flex",
            "flexdirection": "row",
        };

        return (
            <WindowParamContext.Consumer>
                {wpt => {
                    let wp = wpt.param;

                    let buttonWidthPx = SizeAttr.changeVwToPx(wp, buttonSize.width);

                    return (
                        <BoxUnit
                            classname={this.props.classname}
                            key={idx}
                            sizeAttr={buttonSize}
                            fontAttr={cFontAttr}
                            colorAttr={cColorAttr}
                            customStyleAttr={Object.assign({}, customStyleAttr, { "background": "transparent" })}
                            onClick={onClick}
                        >
                            <div className='hoverCursor'
                                style={mouseBoxStyleObj}
                                onMouseEnter={this.handleMouseEnter}
                                onMouseLeave={this.handleMouseLeave}
                            >
                                <div style={innerBoxStyleObj}>
                                    <span style={Object.assign({"width" : buttonSize.width,
                                        "paddingLeft": innerGap, "paddingRight": innerGap},
                                        BoxAttr.getChildrenPositionObj(), innerSpanStyleObj)}>
                                        {prefixIcon && getAntdIconFromName(prefixIcon, prefixCustomStyle)}
                                        {text}
                                        {suffixIcon && getAntdIconFromName(suffixIcon, suffixCustomStyle)}
                                    </span>
                                </div>
                            </div>
                        </BoxUnit>
                    )
                }
                }
            </WindowParamContext.Consumer>
        )
    }
}

export const knowMoreButtonObj = function (wp: WindowParam, text: string, customStyleAttr: {},
    count: string, onClick?: () => void): ButtonProps {
    return {
        idx: text + count,
        text: text,
        buttonSize: new SizeAttr(wp, "6.2vw", "4vh expand 3.6vh"),
        borderRadius: "0.8vh",
        buttonShape: "rect",
        // innerGap: "1vw",
        fontAttr: new FontAttr(wp, "1.05em", "500"),
        colorAttr: new ColorAttr(wp, "white", "#43AE4D"),
        hoverColorAttr: new ColorAttr(wp, "#43AE4D", "#43AE4D22"),
        customStyleAttr: Object.assign(
            RowAttr.getChildrenPositionObj(),
            { "minWidth": buttonSmallerMinWidth },
            customStyleAttr
        ),
        onClick: onClick
    }
}