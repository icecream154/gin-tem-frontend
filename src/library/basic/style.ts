import {ColorAttr} from "./color";
import {BoxAttr, ComposeAttr} from "./compose";
import {FontAttr} from "./font";
import {SizeAttr} from "./size";
import {BaseAttr} from "./baseAttr";
import {WindowParam} from "../context/WindowContext";

/**
 * 样式配置类
 */
export class StyleAttr extends BaseAttr {
    composeAttr: ComposeAttr
    fontAttr: FontAttr
    colorAttr: ColorAttr
    sizeAttr: SizeAttr

    constructor(param: WindowParam, composeAttr?: ComposeAttr, fontAttr?: FontAttr, colorAttr?: ColorAttr, sizeAttr?: SizeAttr) {
        super(param);
        this.composeAttr = composeAttr ? composeAttr : new BoxAttr(param);
        this.fontAttr = fontAttr ? fontAttr : new FontAttr(param);
        this.colorAttr = colorAttr ? colorAttr : new ColorAttr(param);
        this.sizeAttr = sizeAttr ? sizeAttr : new SizeAttr(param);
    }

    getComposeObj(): {} {
        return Object.assign(this.composeAttr.getComposeObj(), this.fontAttr.getComposeObj(),
            this.colorAttr.getComposeObj(), this.sizeAttr.getComposeObj());
    }

    static setStyleAttr = function (d: StyleAttr, sizeAttr: SizeAttr | undefined, colorAttr: ColorAttr | undefined, fontAttr: FontAttr | undefined) {
        if (sizeAttr !== undefined) {
            d.sizeAttr = sizeAttr;
        }
        if (colorAttr !== undefined) {
            d.colorAttr = colorAttr;
        }
        if (fontAttr !== undefined) {
            d.fontAttr = fontAttr;
        }
        return d;
    }

}