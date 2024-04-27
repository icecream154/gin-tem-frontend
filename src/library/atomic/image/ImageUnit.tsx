import { Component } from 'react'
import { ColorAttr } from '../../basic/color'
import { SizeAttr } from "../../basic/size"
import { BoxUnit } from '../unit/BoxUnit'
import { CustomUnitProps } from '../unit/UnitProps'

export type ImageHoverAction = "enlarge"

export type ImageProps = CustomUnitProps & {
    url: string
    sizeAttr?: SizeAttr,
    colorAttr?: ColorAttr,
    hoverAction?: ImageHoverAction,
    innerImgStyle?: {}
}

export class ImageUnit extends Component<ImageProps> {
    state = {
        hover: false
    }
    handleMouseEnter = () => {
        this.setState({ hover: true });
    };

    handleMouseLeave = () => {
        this.setState({ hover: false });
    };

    render() {
        const { url, sizeAttr, colorAttr, hoverAction, innerImgStyle, onClick } = this.props;
        let customStyleAttr = this.props.customStyleAttr;
        let imgStyle = Object.assign({ "width": "100%", "height": "100%" }, innerImgStyle);
        let imgClassName = "";
        if (onClick) {
            imgClassName = "hoverCursor";
        }
        if (hoverAction === "enlarge") {
            imgClassName = "hoverCursor-img-" + hoverAction;
            customStyleAttr = Object.assign({ "overflow": "hidden" }, customStyleAttr);
            if (this.state.hover) {
                imgClassName += "-enlarged";
            }
        }
        return (
            <BoxUnit classname={this.props.classname} onClick={onClick} colorAttr={colorAttr}
                     sizeAttr={sizeAttr} customStyleAttr={customStyleAttr} >
                <img
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                    className={imgClassName}
                    src={url}
                    alt=""
                    style={imgStyle}></img>
            </BoxUnit>
        )
    }
}