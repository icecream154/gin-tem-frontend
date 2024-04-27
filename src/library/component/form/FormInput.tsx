import {WindowParam} from "../../../library/context/WindowContext";
import {ColumnUnit} from "../../../library/atomic/unit/ColumnUnit";
import {SizeAttr} from "../../../library/basic/size";
import {SpanText} from "../../../library/atomic/text/SpanText";
import {FontAttr} from "../../../library/basic/font";
import {heightGap, widthGap} from "../../../library/atomic/unit/BoxUnit";
import React from "react";
import {RowUnit} from "../../../library/atomic/unit/RowUnit";
import {ImageUploadBox, UploadFileType} from "../../atomic/image/ImageUploadBox";

export const FormInputHorizontalGap = "6vw"

export type FormInputType = "singleImgUpdate" | "singleDocUpdate" | "singleImgOrDocUpdate" |
    "multiImgUpdate"

/**
 *
 * @param wp
 * @param inputType
 * @param title
 * @param currentValue
 * @param valueUpdate
 * @param titleGap
 * @constructor
 */
export function FormInput(wp: WindowParam, inputType: FormInputType, title: string, currentValue: string = "",
                          valueUpdate: (newVal: string, valueIndex?: number) => void = () => {},
                          titleGap: string = "12px") {
    // let formInputHorizontalGapPx = SizeAttr.changeVwToPx(wp, FormInputHorizontalGap);
    // let sectionWidthPx = SizeAttr.changeVwToPx(wp, "100vw");
    // let inputWidth = SizeAttr.pxDivide(SizeAttr.pxMinus(sectionWidthPx, formInputHorizontalGapPx), 2);
    let uploadType: UploadFileType = "image"
    if (inputType == "singleDocUpdate") uploadType = "docs"
    if (inputType == "singleImgOrDocUpdate") uploadType = "image&docs"

    // 多图上传更新
    let multiImgs: string[] = []
    if (inputType == "multiImgUpdate") {
        try {
            multiImgs = JSON.parse(currentValue)
        } catch (e) {
            multiImgs = []
        }
    }

    return (
        <ColumnUnit sizeAttr={new SizeAttr(wp, "")}>
            <SpanText fontAttr={new FontAttr(wp, "1.25em", "500")}>
                {title}
            </SpanText>
            {heightGap(wp, titleGap)}
            {
                (inputType == "singleImgUpdate" || inputType == "singleDocUpdate" || inputType == "singleImgOrDocUpdate") &&
                <RowUnit>
                    <ImageUploadBox currentValue={currentValue} valueUpdate={valueUpdate} size={"large"} fileType={uploadType}/>
                </RowUnit>
            }
            {
                inputType == "multiImgUpdate" &&
                <RowUnit>
                    {
                        multiImgs.map(((imgUrl, idx) => {
                            return (
                                <RowUnit>
                                    <ImageUploadBox currentValue={imgUrl} valueUpdate={(newVal, valueIndex) => {
                                        let newMultiImgs = multiImgs
                                        if (valueIndex !== undefined) {
                                            newMultiImgs[valueIndex] = newVal
                                            valueUpdate(JSON.stringify(newMultiImgs))
                                        }
                                    }} imageIndex={idx}
                                                    size={"medium"}/>
                                    {idx != multiImgs.length - 1 && widthGap(wp, "24px")}
                                </RowUnit>
                            )
                        }))
                    }

                </RowUnit>
            }
        </ColumnUnit>
    )
}