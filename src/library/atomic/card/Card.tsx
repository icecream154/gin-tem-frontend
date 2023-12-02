import {Component, ReactNode} from 'react'
import {ColorAttr} from '../../basic/color'
import {ColumnAttr, VerticalAttr} from '../../basic/compose'
import {FontAttr} from '../../basic/font'
import {doubleBasicGap, SizeAttr} from "../../basic/size"
import {WindowParam, WindowParamContext} from '../../context/WindowContext'
import {arrayFetch, splitArrayIntoGroups} from '../../util/arrayUtil'
import {ImageHoverAction, ImageUnit} from '../image/ImageUnit'
import {SpanText} from '../text/SpanText'
import {BoxUnit} from '../unit/BoxUnit'
import {ColumnUnit} from '../unit/ColumnUnit'
import {RowUnit} from '../unit/RowUnit'
import {CustomUnitProps} from '../unit/UnitProps'
import {SpanHoverText} from "../text/SpanHoverText";

export type CardProps = CustomUnitProps & {
    url: string
    title: string
    subTitle?: string
    cardSizeAttr: SizeAttr
    imgSizeAttr: SizeAttr
    titleFontAttr?: FontAttr
    subTitleFontAttr?: FontAttr
    titleColorAttr?: ColorAttr
    subTitleColorAttr?: ColorAttr
    titleCusObj?: {},
    subTitleCusObj?: {},
    imgCusObj?: {},
    textList?: string[],
    textFontList?: FontAttr[],
    textColorList?: ColorAttr[],
    textCusObjs?: {}[],
    textColCusObj?: {},
    cardTextAlign?: VerticalAttr,
    hoverAction?: ImageHoverAction,
    appendNode?: ReactNode,
    bottomNode?: ReactNode
}

export class CardUnit extends Component<CardProps> {
    static contextType = WindowParamContext;

    render() {
        let wp = this.context as WindowParam;

        let {
            url,
            title,
            subTitle,
            cardSizeAttr,
            imgSizeAttr,
            titleColorAttr,
            subTitleColorAttr,
            titleCusObj,
            subTitleCusObj,
            imgCusObj,
            textList,
            textFontList,
            textColorList,
            textCusObjs,
            textColCusObj,
            cardTextAlign,
            customStyleAttr,
            onClick,
            hoverAction,
            appendNode,
            bottomNode
        } = this.props;
        let {titleFontAttr, subTitleFontAttr} = this.props
        if (!titleFontAttr) {
            titleFontAttr = new FontAttr(wp, "1.4em", "500")
        }
        if (!subTitleFontAttr) {
            subTitleFontAttr = new FontAttr(wp, "1em")
        }
        if (!cardTextAlign) cardTextAlign = "center";
        let cardVerticalAlign = cardTextAlign === "center" ? {"marginTop": "auto", "marginBottom": "auto"} : {};

        return (
            <ColumnUnit classname={this.props.classname} sizeAttr={cardSizeAttr} customStyleAttr={customStyleAttr}>
                {appendNode && appendNode}
                {
                    url &&
                    <ImageUnit
                        onClick={onClick}
                        url={url}
                        hoverAction={hoverAction}
                        sizeAttr={imgSizeAttr}
                        customStyleAttr={Object.assign(cardTextAlign === "center" ? {"marginBottom": "auto"} : {}, imgCusObj)}
                    />
                }
                <ColumnUnit customStyleAttr={textColCusObj}>
                    {
                        title &&
                        <SpanText fontAttr={titleFontAttr} colorAttr={titleColorAttr}
                                  customStyleAttr={Object.assign(cardVerticalAlign, titleCusObj)}>
                            {title}
                        </SpanText>
                    }
                    {
                        subTitle &&
                        <SpanText fontAttr={subTitleFontAttr} colorAttr={subTitleColorAttr}
                                  customStyleAttr={Object.assign(cardVerticalAlign, subTitleCusObj)}>
                            {subTitle}
                        </SpanText>
                    }
                    {
                        textList &&
                        <ColumnUnit>
                            {
                                textList.map((t, idx) => {
                                    return (
                                        <SpanText
                                            fontAttr={arrayFetch(textFontList, idx)}
                                            colorAttr={arrayFetch(textColorList, idx)}
                                            customStyleAttr={arrayFetch(textCusObjs, idx)}
                                        >
                                            {t}
                                        </SpanText>
                                    )
                                })
                            }
                        </ColumnUnit>
                    }
                </ColumnUnit>
                {bottomNode && bottomNode}
            </ColumnUnit>
        )
    }
}

export type CardGridProps = CustomUnitProps & {
    gridSize: SizeAttr
    pcCards: CardProps[]
    pcCardSize?: SizeAttr
    pcImgSize?: SizeAttr
    pcGap: string
    pcRowGap?: string
    pcLineCount: number
    mediumCardSize: SizeAttr
    mediumImgSize: SizeAttr
    mediumGap: string
    mediumRowGap?: string
    mediumMileParam?: number
    mediumLineCount: number
    mediaPanelCardSize: SizeAttr
    mediaPanelImgSize: SizeAttr
    mediaPanelGap: string
    mediaPanelRowGap?: string
    mediaPanelMileParam?: number
    mediaPanelLineCount: number
    phoneCardSize: SizeAttr
    phoneImgSize: SizeAttr
    phoneGap: string
    phoneRowGap?: string
    phoneMileParam?: number
    phoneLineCount: number
}

export class CardGridUnit extends Component<CardGridProps> {
    static contextType = WindowParamContext;

    render() {
        return (
            <WindowParamContext.Consumer>
                {wpt => {
                    let wp = wpt.param;

                    let {
                        gridSize,
                        pcCards, pcCardSize, pcImgSize,
                        pcGap, pcRowGap, pcLineCount,
                        mediumCardSize, mediumImgSize,
                        mediumGap, mediumRowGap, mediumMileParam, mediumLineCount,
                        mediaPanelCardSize, mediaPanelImgSize,
                        mediaPanelGap, mediaPanelRowGap, mediaPanelMileParam, mediaPanelLineCount,
                        phoneCardSize, phoneImgSize, phoneGap,
                        phoneRowGap, phoneMileParam, phoneLineCount,
                        customStyleAttr, onClick,
                        unitAction, unitActionKey
                    } = this.props;

                    if (!pcCards) {
                        return <BoxUnit/>
                    }

                    let cLineCount = pcLineCount;
                    let cSize = pcCards[0].cardSizeAttr;
                    if (pcCardSize) {
                        cSize = pcCardSize;
                    }
                    let cImgSize = pcCards[0].imgSizeAttr;
                    if (pcImgSize) {
                        cImgSize = pcImgSize;
                    }
                    let cGap = pcGap;
                    let cRowGap = pcRowGap;
                    if (!cRowGap) {
                        cRowGap = doubleBasicGap;
                    }

                    let cMediumMile = mediumMileParam ? mediumMileParam : wp.mileParam.expandPcWidth;
                    let cMediaMile = mediaPanelMileParam ? mediaPanelMileParam : wp.mileParam.mediaPanelWidth;
                    let cPhoneMile = phoneMileParam ? phoneMileParam : wp.mileParam.phoneWidth;

                    // 根据可视宽度响应
                    if (wp.currWidth < cPhoneMile) {
                        cLineCount = phoneLineCount;
                        cSize = phoneCardSize;
                        cImgSize = phoneImgSize;
                        cGap = phoneGap;
                        if (phoneRowGap) {
                            cRowGap = phoneRowGap;
                        }
                    } else if (wp.currWidth < cMediaMile) {
                        cLineCount = mediaPanelLineCount;
                        cSize = mediaPanelCardSize;
                        cImgSize = mediaPanelImgSize;
                        cGap = mediaPanelGap;
                        if (mediaPanelRowGap) {
                            cRowGap = mediaPanelRowGap;
                        }
                    } else if (wp.currWidth < cMediumMile) {
                        cLineCount = mediumLineCount;
                        cSize = mediumCardSize;
                        cImgSize = mediumImgSize;
                        cGap = mediumGap;
                        if (mediumRowGap) {
                            cRowGap = mediumRowGap;
                        }
                    }

                    let lineCards = splitArrayIntoGroups(pcCards, cLineCount);

                    return (
                        <ColumnUnit
                            sizeAttr={gridSize}
                            customStyleAttr={customStyleAttr}
                            onClick={onClick}
                            unitAction={unitAction}
                            unitActionKey={unitActionKey}
                        >
                            {
                                lineCards.map((lineCard, idx) => {
                                    let rowUnitCus = ColumnAttr.getChildrenPositionObj();
                                    if (idx !== lineCards.length - 1) {
                                        rowUnitCus = Object.assign(rowUnitCus, {"marginBottom": cRowGap});
                                    }

                                    while (lineCard.length < cLineCount) {
                                        lineCard.push({
                                            url: "",
                                            title: "",
                                            cardSizeAttr: cSize,
                                            imgSizeAttr: cImgSize
                                        });
                                    }

                                    return (
                                        <RowUnit sizeAttr={new SizeAttr(wp)} customStyleAttr={rowUnitCus}>
                                            {
                                                lineCard.map((card, cidx) => {
                                                    let cardCp = card;
                                                    cardCp.cardSizeAttr = cSize;
                                                    cardCp.imgSizeAttr = cImgSize;

                                                    return (
                                                        <RowUnit>
                                                            <CardUnit {...cardCp} />
                                                            {
                                                                cidx !== lineCard.length - 1 &&
                                                                <BoxUnit sizeAttr={new SizeAttr(wp, cGap)}/>
                                                            }

                                                        </RowUnit>
                                                    )
                                                })
                                            }
                                        </RowUnit>
                                    )
                                })
                            }
                        </ColumnUnit>
                    )
                }
                }
            </WindowParamContext.Consumer>
        )
    }
}