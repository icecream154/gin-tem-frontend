import {CalendarOutlined, CaretDownOutlined, CloseOutlined, DownOutlined, HomeOutlined} from '@ant-design/icons'
import {Component} from 'react'
import {fetchAttr} from '../../basic/baseAttr'
import {ColorAttr} from "../../basic/color"
import {BoxAttr, RowAttr} from '../../basic/compose'
import {FontAttr} from "../../basic/font"
import {SizeAttr} from "../../basic/size"
import {StyleAttr} from '../../basic/style'
import {WindowParam, WindowParamContext} from '../../context/WindowContext'
import {BoxUnit} from '../unit/BoxUnit'
import {getAntdIconFromName, SpanTextProps} from './SpanText'

export type SpanHoverTextProps = SpanTextProps & {
    selected?: boolean
    hoverSizeAttr?: SizeAttr
    hoverColorAttr?: ColorAttr
    hoverFontAttr?: FontAttr
    innerSpanCusObj?: {}
}

export class SpanHoverText extends Component<SpanHoverTextProps> {
    static contextType = WindowParamContext;

    state = {
        hover: false,
        sizeAttr: this.props.selected ? fetchAttr((this.context as WindowParam), this.props.hoverSizeAttr, this.props.sizeAttr, SizeAttr) : this.props.sizeAttr,
        colorAttr: this.props.selected ? fetchAttr((this.context as WindowParam), this.props.hoverColorAttr, this.props.colorAttr, ColorAttr) : this.props.colorAttr,
        fontAttr: this.props.selected ? fetchAttr((this.context as WindowParam), this.props.hoverFontAttr, this.props.fontAttr, FontAttr) : this.props.fontAttr,
        customStyleAttr: this.props.customStyleAttr,
    }

    handleMouseEnter = () => {
        let inState = {
            hover: true,
            sizeAttr: fetchAttr((this.context as WindowParam), this.props.hoverSizeAttr, this.props.sizeAttr, SizeAttr),
            colorAttr: fetchAttr((this.context as WindowParam), this.props.hoverColorAttr, this.props.colorAttr, ColorAttr),
            fontAttr: fetchAttr((this.context as WindowParam), this.props.hoverFontAttr, this.props.fontAttr, FontAttr),
            customStyleAttr: Object.assign({"cursor": "pointer"}, this.props.customStyleAttr),
        };
        this.setState(inState);
    }
    handleMouseLeave = () => {
        if (!this.props.selected) {
            this.setState({
                hover: false,
                sizeAttr: this.props.sizeAttr,
                colorAttr: this.props.colorAttr,
                fontAttr: this.props.fontAttr,
                customStyleAttr: this.props.customStyleAttr,
            })
        } else {
            this.setState({
                hover: true,
                sizeAttr: fetchAttr((this.context as WindowParam), this.props.hoverSizeAttr, this.props.sizeAttr, SizeAttr),
                colorAttr: fetchAttr((this.context as WindowParam), this.props.hoverColorAttr, this.props.colorAttr, ColorAttr),
                fontAttr: fetchAttr((this.context as WindowParam), this.props.hoverFontAttr, this.props.fontAttr, FontAttr),
                customStyleAttr: this.props.customStyleAttr,
            })
        }
    }

    render() {
        return (
            <WindowParamContext.Consumer>
                {wpt => {
                    let wp = wpt.param;
                    let styleAttr = new StyleAttr(wp, undefined, this.state.fontAttr, this.state.colorAttr, this.state.sizeAttr);
                    let {customStyleAttr} = this.props;
                    if (!customStyleAttr) {
                        customStyleAttr = {"justifyContent": ""}
                    }
                    let prefixIconStyle = Object.assign(RowAttr.getChildrenPositionObj(),
                        {"marginRight": "3.5px"}, this.props.prefixCustomStyle);
                    let suffixIconStyle = Object.assign(RowAttr.getChildrenPositionObj(),
                        {"marginLeft": "3.5px"}, this.props.suffixCustomStyle);

                    return (
                        <BoxUnit classname={this.props.classname} colorAttr={this.state.colorAttr}
                                 onClick={this.props.onClick} customStyleAttr={customStyleAttr}>
                            <div
                                style={styleAttr.getComposeObj()}
                                 className="hoverCursor" onMouseEnter={this.handleMouseEnter}
                                 onMouseLeave={this.handleMouseLeave}>
                                <span style={Object.assign(BoxAttr.getChildrenPositionObj(), this.props.innerSpanCusObj)}>
                                    {this.props.prefixIcon && getAntdIconFromName(this.props.prefixIcon, prefixIconStyle)}
                                    {this.props.children}
                                    {this.props.suffixIcon && getAntdIconFromName(this.props.suffixIcon, suffixIconStyle)}
                                </span>
                            </div>
                        </BoxUnit>
                    )
                }
                }
            </WindowParamContext.Consumer>
        )
    }
}

