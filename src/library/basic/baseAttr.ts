import {WindowParam} from "../context/WindowContext";

/**
 * 配置抽象类
 */
export abstract class BaseAttr {
    /**
     * 全局配置
     */
    param: WindowParam;

    protected constructor(wp: WindowParam) {
        this.param = wp;
    };

    /**
     * 获取配置对应的css样式对象
     */
    abstract getComposeObj(): {};
}

/**
 * 根据优先级选择配置，均未设置时使用该类型的默认配置
 * @param wp 全局配置
 * @param attr1 第一配置
 * @param attr2 第二配置
 * @param defaultObj 默认配置
 */
export function fetchAttr<T extends BaseAttr>(wp: WindowParam, attr1: T | undefined, attr2: T | undefined, defaultObj: {
    new(wp: WindowParam): T;
}): T {
    if (attr1) {
        return attr1;
    }
    if (attr2) {
        return attr2;
    }
    return new defaultObj(wp);
}