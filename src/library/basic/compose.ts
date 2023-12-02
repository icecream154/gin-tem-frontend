import {WindowParam} from "../context/WindowContext"
import {BaseAttr} from "./baseAttr"

/**
 * @file 布局配置
 */

/**
 * 布局类型：容器，行，列，展开容器
 */
type ComposeType = "box" | "row" | "column" | "grid"

/**
 * 垂直排列方式：顶部，居中，底部
 */
export type VerticalAttr = "top" | "center" | "bottom"

/**
 * 水平排列方式：靠左，居中，靠右
 */
export type HorizontalAttr = "left" | "center" | "right"

/**
 * 容器排列方式
 */
export type BoxAlignAttr = Exclude<`${VerticalAttr}-${HorizontalAttr}`, "center-center">
    | "center"

/**
 * 布局配置类
 */
export abstract class ComposeAttr extends BaseAttr {
    type: ComposeType
    align: string

    protected constructor(param: WindowParam, type: ComposeType, align: string) {
        super(param);
        this.type = type;
        this.align = align;
    }

    abstract getChildrenPositionObj(): {};
}

export class GridAttr extends ComposeAttr {
    align: string

    constructor(param: WindowParam, align?: string) {
        let cAlign = align ? align : "";
        super(param, "grid", cAlign);
        this.align = cAlign;
    }

    getComposeObj(): {} {
        return {"display": "grid"}
    }

    getChildrenPositionObj(): {} {
        return GridAttr.getChildrenPositionObj();
    }

    static getChildrenPositionObj = function () {
        return {}
    }
}

export class BoxAttr extends ComposeAttr {
    align: BoxAlignAttr

    constructor(param: WindowParam, align?: BoxAlignAttr) {
        let cAlign = align ? align : "center";
        super(param, "box", cAlign);
        this.align = cAlign;
    }

    getComposeObj(): {} {
        // TODO: support align config, only center for box default
        return {"display": "flex", "justifyContent": "center"}
    }

    getChildrenPositionObj(): {} {
        return BoxAttr.getChildrenPositionObj();
    }

    static getChildrenPositionObj = function () {
        // TODO: support align config, only center for box default
        return {"marginTop": "auto", "marginBottom": "auto", "marginRight": "auto", "marginLeft": "auto"}
    }
}

export class RowAttr extends ComposeAttr {
    align: VerticalAttr

    constructor(param: WindowParam, align?: VerticalAttr) {
        let cAlign = align ? align : "center";
        super(param, "row", cAlign);
        this.align = cAlign;
    }

    getComposeObj(): {} {
        return {"display": "flex", "flexDirection": "row"}
    }

    getChildrenPositionObj(): {} {
        return RowAttr.getChildrenPositionObj(this.align);
    }

    static getChildrenPositionObj = function (align?: VerticalAttr) {
        let ca = align ? align : "center";
        switch (ca) {
            case "top":
                return {"marginTop": 0, "marginBottom": "auto"}
            case "center":
                return {"marginTop": "auto", "marginBottom": "auto"}
            case "bottom":
                return {"marginTop": "auto", "marginBottom": 0}
            default:
                return {}
        }
    }
}

export class ColumnAttr extends ComposeAttr {
    align: HorizontalAttr

    constructor(param: WindowParam, align?: HorizontalAttr) {
        let cAlign = align ? align : "center";
        super(param, "column", cAlign);
        this.align = cAlign;
    }

    getComposeObj(): {} {
        return {"display": "flex", "flexDirection": "column"}
    }

    getChildrenPositionObj(): {} {
        return ColumnAttr.getChildrenPositionObj(this.align);
    }

    static getChildrenPositionObj = function (align?: HorizontalAttr) {
        let ca = align ? align : "center";
        switch (ca) {
            case "left":
                return {"marginLeft": 0, "marginRight": "auto"}
            case "center":
                return {"marginLeft": "auto", "marginRight": "auto"}
            case "right":
                return {"marginLeft": "auto", "marginRight": 0}
            default:
                return {}
        }
    }
}

