import {WindowParam} from "../context/WindowContext"
import {BaseAttr} from "./baseAttr"

/**
 * @file 文字配置与相关常用组合
 */

/**
 * 默认文字大小配置
 */
const defaultFontSize = ""

/**
 * 默认文字粗细配置
 */
const defaultFontWeight = ""

/**
 * 默认文字字体配置
 */
const defaultFontFamily = ""

/**
 * 默认文字行间距配置
 */
const defaultLineHeight = ""

/**
 * 介绍文本字体配置
 */
export const descFontFamily: string = '"Kaiti SC", Helvetica, Tahoma, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "MicrosoftYaHei", "WenQuanYi Micro Hei", sans-serif';

/**
 * 商城字体配置
 */
export const shoppingFontFamily: string = '"Noto Sans SC", Helvetica, Arial, "PingFang SC", 苹方-简, "Heiti SC", 黑体-简, "Microsoft YaHei", 微软雅黑, sans-serif';

/**
 * 生产服务字体配置
 */
export const manufactureFontFamily: string = '"Tahoma", "Noto Sans SC", Helvetica, Arial, "PingFang SC", 苹方-简, "Heiti SC", 黑体-简, "Microsoft YaHei", 微软雅黑, sans-serif';

// export const descFontFamily :string = '"Kaiti SC","Microsoft YaHei","微软雅黑",STXihei,"华文细黑", sans-serif';

/**
 * 字体配置类
 */
export class FontAttr extends BaseAttr {
    /**
     * 文字大小
     */
    fontSize: string
    /**
     * 文字粗细
     */
    fontWeight: string
    /**
     * 文字字体
     */
    fontFamily: string
    /**
     * 文字行间距
     */
    lineHeight: string

    constructor(param: WindowParam, fontSize?: string, fontWeight?: string, fontFamily?: string, lineHeight?: string) {
        super(param);
        this.fontSize = fontSize ? fontSize : defaultFontSize;
        this.fontWeight = fontWeight ? fontWeight : defaultFontWeight;
        this.fontFamily = fontFamily ? fontFamily : defaultFontFamily;
        this.lineHeight = lineHeight ? lineHeight : defaultLineHeight;
    }

    getComposeObj(): {} {
        return {
            "fontFamily": this.fontFamily,
            "fontWeight": this.fontWeight,
            "fontSize": FontAttr.getDecayFontSize(this.param, this.fontSize),
            "lineHeight": this.lineHeight
        }
    }

    static getDecayFontSize = function (wp: WindowParam, oriFontSize: string): string {
        let fontSize = oriFontSize;
        let fontSizeArr = fontSize.split(" ");
        if (fontSizeArr.length > 1) {
            let fontEmNumber = FontAttr.getEmNumber(fontSizeArr[0]);
            // 当前仅支持decay特性，mediaPanelWidth 衰减至 phoneWidth , 1.0衰减至0.88
            if (fontSizeArr[1] === "decay") {

                let defaultDecayRate = 0.88;
                if (fontSizeArr.length >= 3) {
                    defaultDecayRate = Number(fontSizeArr[2]);
                }

                if (wp.currWidth <= wp.mileParam.phoneWidth) {
                    fontSize = (fontEmNumber * defaultDecayRate) + "em";
                } else if (wp.currWidth <= wp.mileParam.mediaPanelWidth) {
                    fontSize = (fontEmNumber * (1 - (1 - defaultDecayRate) * ((wp.mileParam.mediaPanelWidth - wp.currWidth) / (wp.mileParam.mediaPanelWidth - wp.mileParam.phoneWidth)))) + "em";
                } else {
                    fontSize = fontSizeArr[0];
                }
            }

            if (fontSizeArr[1] === "decayD") {

                let defaultDecayRate = 0.88;
                if (fontSizeArr.length >= 3) {
                    defaultDecayRate = Number(fontSizeArr[2]);
                }

                if (wp.currWidth <= wp.mileParam.phoneWidth) {
                    fontSize = (fontEmNumber * defaultDecayRate) + "em";
                } else if (wp.currWidth <= wp.mileParam.expandPcWidth) {
                    fontSize = (fontEmNumber * (1 - (1 - defaultDecayRate) * ((wp.mileParam.expandPcWidth - wp.currWidth) / (wp.mileParam.expandPcWidth - wp.mileParam.phoneWidth)))) + "em";
                } else {
                    fontSize = fontSizeArr[0];
                }
            }
        }
        return fontSize;
    }

    static getEmNumber = function (emStr: string): number {
        if (!emStr.endsWith("em")) {
            return -1;
        }

        try {
            let fStr = emStr.substring(0, emStr.length - 2);
            let emNumber: number = Number(fStr);
            return emNumber;
        } catch (err) {
            return -1;
        }
    }
}