import {WindowParam} from "../context/WindowContext"
import {BaseAttr} from "./baseAttr"

/**
 * @file 颜色配置与相关常用组合
 */

/**
 * 默认字体颜色
 */
const defaultFontColor = ""
/**
 * 默认元素背景
 */
const defaultBackground = ""

/**
 * 颜色配置类
 */
export class ColorAttr extends BaseAttr {
    /**
     * 字体颜色
     */
    fontColor: string
    /**
     * 元素背景
     */
    background: string

    constructor(param: WindowParam, fontColor?: string, background?: string) {
        super(param);
        this.fontColor = fontColor ? fontColor : defaultFontColor
        this.background = background ? background : defaultBackground
    }

    getComposeObj(): {} {
        let res = {};
        if (this.fontColor) {
            res = Object.assign(res, {"color": this.fontColor});
        }
        if (this.background) {
            res = Object.assign(res, {"background": this.background});
        }
        return res;
    }
}

/**
 * 透明颜色配置，用于构建位置间距的组件
 */
export const transparentObj = new ColorAttr(new WindowParam(), "", "transparent");