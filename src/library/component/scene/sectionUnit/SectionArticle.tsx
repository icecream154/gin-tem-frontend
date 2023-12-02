import { ImageUnit } from "../../../atomic/image/ImageUnit"
import { SpanText } from "../../../atomic/text/SpanText"
import { BoxUnit } from "../../../atomic/unit/BoxUnit"
import { ColumnUnit } from "../../../atomic/unit/ColumnUnit"
import { CustomUnit } from "../../../atomic/unit/Unit"
import { ColorAttr, transparentObj } from "../../../basic/color"
import { ColumnAttr } from "../../../basic/compose"
import { FontAttr } from "../../../basic/font"
import { basicGap, SizeAttr } from "../../../basic/size"
import { WindowParam, WindowParamContext } from "../../../context/WindowContext"
import { SectionBaseProps } from "../SceneSection"

export type SectionArticleData = {
    photo?: string,
    descriptions: {
        index: number,
        text: string,
        overrideTextFont?: FontAttr,
    }[],
    subPhotos: {
        descriptionIndex: number,
        url: string,
        overridePhotoSize?: SizeAttr
    }[]
}

export type SectionArticleDataStyleProps = {
    photoSize: SizeAttr,
    photoBottomGap?: string,
    descTextSize?: SizeAttr,
    descTextFont?: FontAttr,
    descTextColor?: ColorAttr,
    descTextBottomGap?: string,
    subPhotosSize?: SizeAttr[]
    subPhotoBottomGap?: string,
    subPhotoMaxWidth?: string,
    subPhotoMaxHeight?: string,
    textAlign?: string
}

export type SectionArticleProps = SectionBaseProps & {
    articleData: SectionArticleData,
    articleStyle: SectionArticleDataStyleProps
}

export function getSectionArticlePropsFromData(wp: WindowParam, width: string,
    articleData: SectionArticleData): SectionArticleProps {
    let res: SectionArticleProps = {
        sectionType: "SectionArticle",
        sectionSize: new SizeAttr(wp),
        innerSectionWidth: width,
        sectionBg: "transparent",
        articleData: articleData,
        articleStyle: {
            photoSize: new SizeAttr(wp),
            descTextFont: new FontAttr(wp, "1.15em", "", "microsoft yahei", "1.55em"),
        }
    };
    return res;
}


export class SectionArticle extends CustomUnit<SectionArticleProps> {
    static contextType = WindowParamContext;

    render() {
        let { articleData, articleStyle, customStyleAttr, onClick, unitAction,
            sectionType, sectionSize, innerSectionWidth, sectionBg
        } = this.props;

        let { photo, descriptions, subPhotos } = articleData;
        let { photoSize, photoBottomGap, descTextSize, descTextFont,
            descTextColor, descTextBottomGap, subPhotosSize,
            subPhotoMaxWidth, subPhotoMaxHeight, subPhotoBottomGap,
            textAlign } = articleStyle;

        if (!photoBottomGap) {
            photoBottomGap = basicGap;
        }
        if (!subPhotoBottomGap) {
            subPhotoBottomGap = basicGap;
        }
        if (!descTextBottomGap) {
            descTextBottomGap = basicGap;
        }
        if (!subPhotoMaxWidth) {
            subPhotoMaxWidth = "60vw";
        }
        if (!subPhotoMaxHeight) {
            subPhotoMaxHeight = "60vh";
        }
        let textJustifyObj: {} = { "justifyContent": "" };
        if (!textAlign) {
            textAlign = "left";
        }
        if (textAlign === "center") {
            textJustifyObj = {};
        }

        return (
            <WindowParamContext.Consumer>
                {wpt => {
                    let wp = wpt.param;
                    let getSubPhotosSize = function (subIndex: number): SizeAttr | undefined {
                        if (!subPhotosSize || subPhotosSize.length <= subIndex) {
                            return new SizeAttr(wp);
                        }
                        return subPhotosSize[subIndex];
                    }
                    return (
                        <ColumnUnit
                            unitAction={unitAction}
                            onClick={onClick}
                            sizeAttr={new SizeAttr(wp, innerSectionWidth)}
                            colorAttr={new ColorAttr(wp, "", sectionBg)}
                            customStyleAttr={customStyleAttr}>
                            {
                                photo &&
                                <ImageUnit
                                    url={photo}
                                    sizeAttr={photoSize}
                                    colorAttr={transparentObj}
                                    customStyleAttr={ColumnAttr.getChildrenPositionObj()}
                                />
                            }
                            {photo && <BoxUnit sizeAttr={new SizeAttr(wp, "", photoBottomGap)} />}

                            {
                                descriptions.map((desc) => {
                                    let descPhoto = "";
                                    let descPhotoOSize: SizeAttr | undefined = undefined;
                                    let descPhotoIndex = -1;
                                    for (let i = 0; i < subPhotos.length; i++) {
                                        let subPhoto = subPhotos[i];
                                        if (subPhoto.descriptionIndex === desc.index) {
                                            descPhoto = subPhoto.url;
                                            descPhotoOSize = subPhoto.overridePhotoSize;
                                            descPhotoIndex = i;
                                        }
                                    }

                                    let cFont = descTextFont;
                                    if (desc.overrideTextFont) {
                                        cFont = desc.overrideTextFont;
                                    }

                                    let pSize = getSubPhotosSize(descPhotoIndex);
                                    let innerImgStyle: {} = { "maxWidth": SizeAttr.changeVwToPx(wp, subPhotoMaxWidth + ""), "maxHeight": SizeAttr.changeVhToPx(wp, "", subPhotoMaxHeight + "") };
                                    if (descPhotoOSize) {
                                        pSize = descPhotoOSize;
                                        innerImgStyle = {};
                                    }

                                    return (
                                        <ColumnUnit key={desc.text}>
                                            <SpanText
                                                sizeAttr={descTextSize}
                                                fontAttr={cFont}
                                                colorAttr={descTextColor}
                                                customStyleAttr={textJustifyObj}>
                                                {desc.text}
                                            </SpanText>
                                            <BoxUnit sizeAttr={new SizeAttr(wp, "", descTextBottomGap)}></BoxUnit>

                                            {
                                                descPhoto &&
                                                <ImageUnit
                                                    url={descPhoto}
                                                    sizeAttr={pSize}
                                                    customStyleAttr={
                                                        Object.assign(ColumnAttr.getChildrenPositionObj())
                                                    }
                                                    innerImgStyle={innerImgStyle}
                                                />
                                            }
                                            {
                                                descPhoto &&
                                                <BoxUnit sizeAttr={new SizeAttr(wp, "", subPhotoBottomGap)}></BoxUnit>
                                            }
                                        </ColumnUnit>
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