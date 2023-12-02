import {StyleAttr} from '../../basic/style';
import {WindowParam, WindowParamContext} from '../../context/WindowContext';
import {FadeInUnit} from './FadeInUnit';
import {FadeOnlyOutUnit} from './FadeOnlyOutUnix';
import {CustomUnit, Unit} from './Unit';
import {BoxProps, UnitActionType} from './UnitProps';
import {OpacityInUnit} from "./OpacityInUnit";
import {SizeAttr} from "../../basic/size";
import {ColorAttr} from "../../basic/color";
import {defaultSepLineColor} from "../../component/nav/NavMenu";

export class BoxUnit extends CustomUnit<BoxProps> {
    static contextType = WindowParamContext;

    render() {
        const {sizeAttr, colorAttr, fontAttr, unitAction} = this.props

        return (
            <WindowParamContext.Consumer>
                {wpt => {
                    let wp = wpt.param;
                    let bStyle = StyleAttr.setStyleAttr(new StyleAttr(wp), sizeAttr, colorAttr, fontAttr);
                    if (unitAction === UnitActionType.fadeIn) {
                        return (
                            <FadeInUnit
                                classname={this.props.classname}
                                unitRef={this.props.unitRef}
                                needHover={this.props.needHover}
                                unitActionKey={this.props.unitActionKey}
                                onMouseEnter={this.props.onMouseEnter}
                                onMouseLeave={this.props.onMouseLeave}
                                onTouchMove={this.props.onTouchMove}
                                onClick={this.props.onClick}
                                styleAttr={bStyle}
                                customStyleAttr={this.props.customStyleAttr}>
                                {this.props.children}
                            </FadeInUnit>
                        )
                    }
                    if (unitAction === UnitActionType.fadeOut) {
                        return (
                            <FadeOnlyOutUnit
                                classname={this.props.classname}
                                unitRef={this.props.unitRef}
                                needHover={this.props.needHover}
                                unitActionKey={this.props.unitActionKey}
                                onMouseEnter={this.props.onMouseEnter}
                                onMouseLeave={this.props.onMouseLeave}
                                onTouchMove={this.props.onTouchMove}
                                onClick={this.props.onClick}
                                styleAttr={bStyle}
                                customStyleAttr={this.props.customStyleAttr}>
                                {this.props.children}
                            </FadeOnlyOutUnit>
                        )
                    }
                    if (unitAction === UnitActionType.opacity) {
                        return (
                            <OpacityInUnit
                                classname={this.props.classname}
                                unitRef={this.props.unitRef}
                                needHover={this.props.needHover}
                                unitActionKey={this.props.unitActionKey}
                                onMouseEnter={this.props.onMouseEnter}
                                onMouseLeave={this.props.onMouseLeave}
                                onTouchMove={this.props.onTouchMove}
                                onClick={this.props.onClick}
                                styleAttr={bStyle}
                                customStyleAttr={this.props.customStyleAttr}>
                                {this.props.children}
                            </OpacityInUnit>
                        )
                    }

                    if (unitAction === UnitActionType.expand && this.props.unitExpandProps) {
                        let {isExpand, transition} = this.props.unitExpandProps;
                        return (
                            <div
                                key={this.props.unitActionKey}
                                style={{
                                    "display": "grid",
                                    "transition": transition,
                                    "overflow": "hidden",
                                    "gridTemplateRows": isExpand ? "1fr" : "0fr"
                                }}
                            >
                                <div style={{"minHeight": "0px"}}>
                                    <BoxUnit
                                        classname={this.props.classname}
                                        needHover={this.props.needHover}
                                        onMouseEnter={this.props.onMouseEnter}
                                        onMouseLeave={this.props.onMouseLeave}
                                        onClick={this.props.onClick}
                                        customStyleAttr={this.props.customStyleAttr}>
                                        {this.props.children}
                                    </BoxUnit>
                                </div>
                            </div>
                        )
                    }

                    return (
                        <Unit
                            classname={this.props.classname}
                            unitRef={this.props.unitRef}
                            needHover={this.props.needHover}
                            onMouseEnter={this.props.onMouseEnter}
                            onMouseLeave={this.props.onMouseLeave}
                            onTouchMove={this.props.onTouchMove}
                            onClick={this.props.onClick}
                            styleAttr={bStyle}
                            customStyleAttr={this.props.customStyleAttr}>
                            {this.props.children}
                        </Unit>
                    )
                }
                }
            </WindowParamContext.Consumer>
        )
    }
}

export function widthGap(wp: WindowParam, width: string) {
    return (<BoxUnit sizeAttr={new SizeAttr(wp, width)}/>)
}

export function heightGap(wp: WindowParam, height: string) {
    return (<BoxUnit sizeAttr={new SizeAttr(wp, "", height)}/>)
}

export function sepLineHorizontal(wp: WindowParam, height: string, color?: string, width?: string, cusObj?: {}) {
    let cc = color ? color : defaultSepLineColor;
    return (<BoxUnit customStyleAttr={cusObj}
                     colorAttr={new ColorAttr(wp, "", cc)} sizeAttr={new SizeAttr(wp, width, height)}/>)
}

export function sepLineVertical(wp: WindowParam, width: string, color?: string, height?: string, cusObj?: {}) {
    let cc = color ? color : defaultSepLineColor;
    return (<BoxUnit customStyleAttr={cusObj}
                     colorAttr={new ColorAttr(wp, "", cc)} sizeAttr={new SizeAttr(wp, width, height)}/>)
}