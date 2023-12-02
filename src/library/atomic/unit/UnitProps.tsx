import {ColorAttr} from "../../basic/color"
import {BoxAlignAttr, HorizontalAttr, VerticalAttr} from "../../basic/compose"
import {FontAttr} from "../../basic/font"
import {SizeAttr} from "../../basic/size"
import {StyleAttr} from "../../basic/style"
import React from "react";

/**
 * 组件过渡动画类型
 */
export enum UnitActionType {
    /**
     * 下方渐渐进入
     */
    fadeIn,
    /**
     * 下方渐渐退出
     */
    fadeOut,
    /**
     * 上下展开
     */
    expand,
    /**
     * 渐变显现
     */
    opacity
}

/**
 * 上下展开配置
 */
export type UnitExpandProps = {
    /**
     * 是否展开
     */
    isExpand: boolean,
    /**
     * 展开动画配置
     */
    transition: string
}

/**
 * 组件通用配置
 */
export type CustomUnitProps = {
    /**
     * 个性化配置
     */
    customStyleAttr?: {}
    /**
     * 元素类名
     */
    classname?: string
    /**
     * 元素引用
     */
    unitRef?: React.RefObject<unknown>
    /**
     * 过渡动画类型
     */
    unitAction?: UnitActionType
    /**
     * 过渡动画key，一般与元素key保持一致
     * 渐进渐出动画需要使用，避免重绘(re-render)时反复产生效果
     */
    unitActionKey?: string,
    /**
     * 上下展开配置，过渡动画类型为上下展开时需要配置
     */
    unitExpandProps?: UnitExpandProps,
    /**
     * 鼠标移入事件处理函数
     * @param event
     */
    onMouseEnter?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    /**
     * 鼠标移出事件处理函数
     * @param event
     */
    onMouseLeave?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    /**
     * 滑动事件
     * @param event
     */
    onTouchMove?: (event: React.TouchEvent<HTMLDivElement>) => void
    /**
     * 鼠标悬浮时是否需要改变手势
     */
    needHover?: boolean
    /**
     * 点击事件
     */
    onClick?: () => void
}

/**
 * 基础组件配置(Unit)
 */
export type BasicUnitProps = CustomUnitProps & {
    /**
     * 样式配置
     */
    styleAttr: StyleAttr
    /**
     * 子元素
     */
    children?: React.ReactNode
}

/**
 * 组合组件配置，包括BoxUnit，ColumnUnit，RowUnit
 */
type ComposeUnitProps = {
    /**
     * 大小配置
     */
    sizeAttr?: SizeAttr
    /**
     * 颜色配置
     */
    colorAttr?: ColorAttr
    /**
     * 字体配置
     */
    fontAttr?: FontAttr
    /**
     * 子元素
     */
    children?: React.ReactNode
}

/**
 * 容器组件配置
 */
export type BoxProps = CustomUnitProps & ComposeUnitProps & {
    align?: BoxAlignAttr
}

/**
 * 行组件配置
 */
export type RowProps = CustomUnitProps & ComposeUnitProps & {
    align?: VerticalAttr
}

/**
 * 列组件配置
 */
export type ColumnProps = CustomUnitProps & ComposeUnitProps & {
    align?: HorizontalAttr
}