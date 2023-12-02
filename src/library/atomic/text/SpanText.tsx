import {
    AlignLeftOutlined,
    AppstoreOutlined, ArrowRightOutlined, AudioOutlined, AuditOutlined, BranchesOutlined,
    CalendarOutlined,
    CaretDownOutlined, CaretRightOutlined, CheckCircleOutlined, CheckCircleTwoTone, CheckOutlined, CloseCircleTwoTone,
    CloseOutlined, CloudSyncOutlined, DeleteOutlined,
    DownOutlined, ExperimentOutlined, FundProjectionScreenOutlined, GlobalOutlined, HeartFilled, HeartOutlined,
    HomeOutlined, LoadingOutlined,
    MenuOutlined,
    MinusOutlined,
    PlusOutlined, QuestionCircleFilled,
    RightOutlined,
    SearchOutlined, ShoppingCartOutlined, ShoppingOutlined, StarFilled, StarOutlined, TeamOutlined, UserOutlined
} from '@ant-design/icons'
import { Component } from 'react'
import { ColorAttr } from "../../basic/color"
import { RowAttr } from '../../basic/compose'
import { FontAttr } from "../../basic/font"
import { SizeAttr } from "../../basic/size"
import { BoxUnit } from '../unit/BoxUnit'
import { CustomUnitProps } from '../unit/UnitProps'

export type SpanTextProps = CustomUnitProps & {
    children: string
    sizeAttr?: SizeAttr
    colorAttr?: ColorAttr
    fontAttr?: FontAttr
    prefixIcon?: string
    prefixCustomStyle?: {},
    suffixIcon?: string,
    suffixCustomStyle?: {},
    innerClassname?: string
}

export class SpanText extends Component<SpanTextProps> {
    render() {
        const { sizeAttr, colorAttr, fontAttr, prefixIcon, suffixIcon,
            prefixCustomStyle, suffixCustomStyle, onClick } = this.props
        let customStyleAttr = this.props.customStyleAttr

        if (!customStyleAttr) {
            customStyleAttr = { "justifyContent": "" }
        }
        let prefixIconStyle = Object.assign(RowAttr.getChildrenPositionObj(), { "marginRight": "3.5px" }, prefixCustomStyle);
        let suffixIconStyle = Object.assign(RowAttr.getChildrenPositionObj(), { "marginLeft": "3.5px" }, suffixCustomStyle);

        return (
            <BoxUnit classname={this.props.classname} onClick={onClick} sizeAttr={sizeAttr} colorAttr={colorAttr} fontAttr={fontAttr} customStyleAttr={customStyleAttr}>
                <span className={this.props.innerClassname}>
                    {prefixIcon && getAntdIconFromName(prefixIcon, prefixIconStyle)}
                    {this.props.children}
                    {suffixIcon && getAntdIconFromName(suffixIcon, suffixIconStyle)}
                </span>
            </BoxUnit>
        )
    }
}

export function getAntdIconFromName(iconName: string, iconStyle: {} | undefined) {
    if (iconName === "CaretDownOutlined")
        return <CaretDownOutlined style={iconStyle}></CaretDownOutlined>

    if (iconName === "DownOutlined")
        return <DownOutlined style={iconStyle}></DownOutlined>

    if (iconName === "CloseOutlined")
        return <CloseOutlined style={iconStyle}></CloseOutlined>

    if (iconName === "HomeOutlined")
        return <HomeOutlined style={iconStyle}></HomeOutlined>

    if (iconName === "CalendarOutlined")
        return <CalendarOutlined style={iconStyle}></CalendarOutlined>

    if (iconName === "PlusOutlined")
        return <PlusOutlined style={iconStyle}></PlusOutlined>

    if (iconName === "MinusOutlined")
        return <MinusOutlined style={iconStyle}></MinusOutlined>

    if (iconName === "RightOutlined")
        return <RightOutlined style={iconStyle}></RightOutlined>

    if (iconName === "MenuOutlined")
        return <MenuOutlined style={iconStyle}></MenuOutlined>

    if (iconName === "SearchOutlined")
        return <SearchOutlined style={iconStyle}></SearchOutlined>

    if (iconName === "ShoppingOutlined")
        return <ShoppingOutlined style={iconStyle}></ShoppingOutlined>

    if (iconName === "UserOutlined")
        return <UserOutlined style={iconStyle}></UserOutlined>

    if (iconName === "HeartOutlined")
        return <HeartOutlined style={iconStyle}></HeartOutlined>

    if (iconName === "HeartFilled")
        return <HeartFilled style={iconStyle}></HeartFilled>

    if (iconName === "StarFilled")
        return <StarFilled style={iconStyle}></StarFilled>

    if (iconName === "StarOutlined")
        return <StarOutlined style={iconStyle}></StarOutlined>

    if (iconName === "AppstoreOutlined")
        return <AppstoreOutlined style={iconStyle}></AppstoreOutlined>

    if (iconName === "AlignLeftOutlined")
        return <AlignLeftOutlined style={iconStyle}></AlignLeftOutlined>

    if (iconName === "LoadingOutlined")
        return <LoadingOutlined style={iconStyle}></LoadingOutlined>

    if (iconName === "QuestionCircleFilled")
        return <QuestionCircleFilled style={iconStyle}></QuestionCircleFilled>

    if (iconName === "DeleteOutlined")
        return <DeleteOutlined style={iconStyle}></DeleteOutlined>

    if (iconName === "CheckOutlined")
        return <CheckOutlined style={iconStyle}></CheckOutlined>

    if (iconName === "CheckCircleOutlined")
        return <CheckCircleOutlined style={iconStyle}></CheckCircleOutlined>

    if (iconName === "ShoppingCartOutlined")
        return <ShoppingCartOutlined style={iconStyle}></ShoppingCartOutlined>

    if (iconName === "GlobalOutlined")
        return <GlobalOutlined style={iconStyle}></GlobalOutlined>

    if (iconName === "TeamOutlined")
        return <TeamOutlined style={iconStyle}></TeamOutlined>

    if (iconName === "AuditOutlined")
        return <AuditOutlined style={iconStyle}></AuditOutlined>

    if (iconName === "BranchesOutlined")
        return <BranchesOutlined style={iconStyle}></BranchesOutlined>

    if (iconName === "CloudSyncOutlined")
        return <CloudSyncOutlined style={iconStyle}></CloudSyncOutlined>

    if (iconName === "ExperimentOutlined")
        return <ExperimentOutlined style={iconStyle}></ExperimentOutlined>

    if (iconName === "FundProjectionScreenOutlined")
        return <FundProjectionScreenOutlined style={iconStyle}></FundProjectionScreenOutlined>

    if (iconName === "ArrowRightOutlined")
        return <ArrowRightOutlined style={iconStyle}></ArrowRightOutlined>

    if (iconName === "CaretRightOutlined")
        return <CaretRightOutlined style={iconStyle}></CaretRightOutlined>

    if (iconName === "CheckCircleTwoTone")
        return <CheckCircleTwoTone style={iconStyle}></CheckCircleTwoTone>

    if (iconName === "CloseCircleTwoTone")
        return <CloseCircleTwoTone style={iconStyle}></CloseCircleTwoTone>

    return "";
}