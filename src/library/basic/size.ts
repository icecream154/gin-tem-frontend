import {BaseAttr} from "./baseAttr";
import {WindowParam} from "../context/WindowContext";

const defaultWidth = ""
const defaultHeight = ""

export const minMiniGap = "0.8vh";
export const miniGap = "1.85vh";
export const maxMiniGap = "2.25vh";
export const basicGap = "3.5vh";
export const doubleBasicGap = "7vh";
export const threeBasicGap = "10.5vh";
export const fourBasicGap = "14vh";

export const regularInfoSectionPcWidth = "62vw expand 88vw";
export const textInfoSectionPcWidth = "56vw expand 88vw";

/**
 * 宽高配置类
 */
export class SizeAttr extends BaseAttr {
    width: string
    height: string

    constructor(param: WindowParam, width?: string, height?: string) {
        super(param);
        this.width = width ? width : defaultWidth
        this.height = height ? height : defaultHeight
    }

    getComposeObj(): {} {
        let tWdith = SizeAttr.changeVwToPx(this.param, this.width);
        let tHeight = SizeAttr.changeVhToPx(this.param, this.width, this.height);
        let widthObj = this.width ? {"width": tWdith} : {};
        let heightObj = this.height ? {"height": tHeight} : {};
        return Object.assign({}, widthObj, heightObj);
    }

    static getPxNumber(pxStr: string): number {
        try {
            let resPx: number = +(pxStr.substring(0, pxStr.length - 2));
            return resPx;
        } catch (err) {
            return 0;
        }
    }

    static parseVwToPx(param: WindowParam, vwStr: string): string {
        if (!vwStr.endsWith("vw")) return vwStr;

        try {
            let vwNumber: number = +(vwStr.substring(0, vwStr.length - 2));
            return (SizeAttr.getCurrentWorkingWidth(param) / 100.0 * vwNumber) + "px";
        } catch (err) {
            return vwStr;
        }
    }

    static addVhAndPx = function (vhStr: string, pxStr: string): string {
        if (!vhStr.endsWith("vh") || !pxStr.endsWith("px")) {
            return vhStr;
        }

        try {
            let resPx: number = +(pxStr.substring(0, pxStr.length - 2));
            let vhNumber: number = +(vhStr.substring(0, vhStr.length - 2));
            return (resPx + window.innerHeight / 100.0 * vhNumber) + "px";
        } catch (err) {
            return vhStr;
        }
    }

    public static changeVwToPx = function (param: WindowParam, vwStr: string): string {
        if (vwStr.endsWith("px")) return vwStr;

        let avaWidth = SizeAttr.getCurrentWorkingWidth(param);

        let vwStrArr = vwStr.split(" ");
        if (vwStrArr.length === 3) {
            try {
                let vwNormalPx = SizeAttr.parseVwToPx(param, vwStrArr[0]);
                let vwExpandPx = SizeAttr.parseVwToPx(param, vwStrArr[2]);
                let vwNormalNumber = SizeAttr.getPxNumber(vwNormalPx);
                let vwExpandNumber = SizeAttr.getPxNumber(vwExpandPx);

                // expand 在 mediaPanelWidth 与 pcWidth 之间线性渐变
                // expandP 在 phoneWidth 与 mediaPanelWidth 之间线性渐变
                let expandMile = vwStrArr[1] === "expand" ?
                    param.mileParam.mediaPanelWidth : param.mileParam.phoneWidth
                let normalMile = vwStrArr[1] === "expand" ?
                    param.mileParam.expandPcWidth : param.mileParam.mediaPanelWidth

                let vwNumber = vwNormalNumber;
                if (avaWidth < expandMile) {
                    vwNumber = vwExpandNumber;
                } else if (avaWidth < normalMile) {
                    vwNumber = vwExpandNumber -
                        ((avaWidth - expandMile) / (normalMile - expandMile)) *
                        (vwExpandNumber - vwNormalNumber)
                }

                if (vwStrArr[1] === "expandP") {
                    console.log(vwStrArr);
                    console.log(vwNumber + "px");
                }

                return vwNumber + "px";
            } catch (err) {
                return vwStr;
            }
        }

        if (vwStr.endsWith("vh")) {
            return SizeAttr.changeVhToPx(param, "", vwStr);
        }
        return SizeAttr.parseVwToPx(param, vwStr);
    }

    public static changeVhToPx = function (param: WindowParam, vwStr: string, vhStr: string): string {
        if (vhStr.endsWith("px")) return vhStr;

        let avaHeight = SizeAttr.getCurrentWorkingHeight(param);
        let avaWidth = SizeAttr.getCurrentWorkingWidth(param);

        let vhStrArr = vhStr.split(" ");
        if (vhStrArr.length === 3) {
            // 当前仅处理 expand
            // 在 mediaPanelWidth 与 pcWidth 之间线性渐变
            if (vhStrArr[1] === "expand") {
                try {
                    let vhNormalNumber: number = +(vhStrArr[0].substring(0, vhStrArr[0].length - 2));
                    let vhExpandNumber: number = +(vhStrArr[2].substring(0, vhStrArr[2].length - 2));

                    let vhNumber = vhNormalNumber;
                    if (avaWidth < param.mileParam.mediaPanelWidth) {
                        vhNumber = vhExpandNumber;
                    } else if (avaWidth < param.mileParam.expandPcWidth) {
                        vhNumber = vhExpandNumber -
                            ((avaWidth - param.mileParam.mediaPanelWidth) / (param.mileParam.expandPcWidth - param.mileParam.mediaPanelWidth)) *
                            (vhExpandNumber - vhNormalNumber)
                    }

                    return (avaHeight / 100.0 * vhNumber) + "px";
                } catch (err) {
                    return vhStr;
                }
            }

            // 在 phoneWidth 与 pcWidth 之间线性渐变
            if (vhStrArr[1] === "expandP") {
                try {
                    let vhNormalNumber: number = +(vhStrArr[0].substring(0, vhStrArr[0].length - 2));
                    let vhExpandNumber: number = +(vhStrArr[2].substring(0, vhStrArr[2].length - 2));

                    let vhNumber = vhNormalNumber;
                    if (avaWidth < param.mileParam.phoneWidth) {
                        vhNumber = vhExpandNumber;
                    } else if (avaWidth < param.mileParam.mediaPanelWidth) {
                        vhNumber = vhExpandNumber -
                            ((avaWidth - param.mileParam.phoneWidth) / (param.mileParam.mediaPanelWidth - param.mileParam.phoneWidth)) *
                            (vhExpandNumber - vhNormalNumber)
                    }

                    return (avaHeight / 100.0 * vhNumber) + "px";
                } catch (err) {
                    return vhStr;
                }
            }
        }

        // 比例
        if (vhStr.endsWith("ratio")) {
            try {
                let vwPx = SizeAttr.changeVwToPx(param, vwStr);
                let vwPxNumber: number = +(vwPx.substring(0, vwPx.length - 2));
                let vhRNumber: number = Number(vhStr.substring(0, vhStr.length - 5));
                return (vwPxNumber * vhRNumber) + "px";
            } catch (err) {
                return vhStr;
            }
        }

        if (vhStr.endsWith("vw")) {
            return SizeAttr.changeVwToPx(param, vwStr);
        }
        if (!vhStr.endsWith("vh")) {
            return vhStr;
        }

        try {
            let vhNumber: number = +(vhStr.substring(0, vhStr.length - 2));
            return (avaHeight / 100.0 * vhNumber) + "px";
        } catch (err) {
            return vhStr;
        }
    }

    private static getCurrentWorkingWidth(param: WindowParam): number {
        let avaWidth = param.currWidth;
        if (!avaWidth) {
            avaWidth = window.innerWidth;
        }
        if (param.mileParam && avaWidth < param.mileParam.minPhoneWidth) {
            avaWidth = param.mileParam.minPhoneWidth;
        }
        return avaWidth;
    }

    private static getCurrentWorkingHeight(param: WindowParam): number {
        let avaHeight = param.currHeight;
        if (!avaHeight) {
            avaHeight = window.innerHeight;
        }
        if (param.mileParam && avaHeight < param.mileParam.minPhoneHeight) {
            avaHeight = param.mileParam.minPhoneHeight;
        }
        return avaHeight;
    }

    public static pxMinus(px1: string, px2: string): string {
        try {
            let px1Number: number = +(px1.substring(0, px1.length - 2));
            let px2Number: number = +(px2.substring(0, px2.length - 2));
            return (px1Number - px2Number) + "px";
        } catch (err) {
            return px1;
        }
    }

    public static pxPlus(px1: string, px2: string): string {
        try {
            let px1Number: number = +(px1.substring(0, px1.length - 2));
            let px2Number: number = +(px2.substring(0, px2.length - 2));
            return (px1Number + px2Number) + "px";
        } catch (err) {
            return px1;
        }
    }

    public static pxDivide(px1: string, d: number): string {
        try {
            let px1Number: number = +(px1.substring(0, px1.length - 2));
            return (px1Number / d) + "px";
        } catch (err) {
            return px1;
        }
    }

    public static pxMultiple(px1: string, r: number): string {
        try {
            let px1Number: number = +(px1.substring(0, px1.length - 2));
            return (px1Number * r) + "px";
        } catch (err) {
            return px1;
        }
    }
}