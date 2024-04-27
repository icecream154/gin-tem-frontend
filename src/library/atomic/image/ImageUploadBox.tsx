import {CustomUnitProps} from "../unit/UnitProps";
import {Component} from "react";
import {ColumnUnit} from "../unit/ColumnUnit";
import {WindowParam, WindowParamContext} from "../../context/WindowContext";
import {BoxUnit, sepLineHorizontal} from "../unit/BoxUnit";
import {SizeAttr} from "../../basic/size";
import {ColorAttr} from "../../basic/color";
import addIcon from "../../../assets/component/addIcon.svg"
import fileIcon from "../../../assets/component/fileIcon.svg";
import uploadSuccessIcon from "../../../assets/component/upload/uploadSuccessIcon.svg";
import uploadFailIcon from "../../../assets/component/upload/uploadFailIcon.svg";
import uploadLoading from "../../../assets/component/upload/uploadLoading.svg";
import uploadResetDark from "../../../assets/component/upload/uploadResetDark.svg";
import uploadResetLight from "../../../assets/component/upload/uploadResetLight.svg";
import {ImageUnit} from "./ImageUnit";
import {BoxAttr, ColumnAttr, RowAttr} from "../../basic/compose";
import {v4 as uuidv4} from "uuid";
import {fetchOssSts, uploadFileToOss} from "../../util/ossUtil";
import {RowUnit} from "../unit/RowUnit";
import {SpanText} from "../text/SpanText";
import {FontAttr} from "../../basic/font";


export type UploadFileType = "image" | "docs" | "image&docs" | "video" | "any"

export type ImageUploadBoxSize = "large" | "medium"

export type ImageUploadBoxProps = CustomUnitProps & {
    size: ImageUploadBoxSize,
    fileType?: UploadFileType,
    imageIndex?: number,
    currentValue: string,
    valueUpdate: (newVal: string, valueIndex?: number) => void,
}

type UploadProgressStatus = "waiting" | "uploading" | "success" | "fail"

export class ImageUploadBox extends Component<ImageUploadBoxProps> {
    state: {
        currentUrl?: string,
        currentFile?: File,
        currentFileUuid: string,
        progress: number,
        progressStatus: UploadProgressStatus,
    } = {
        currentUrl: this.props.currentValue,
        currentFile: undefined,
        currentFileUuid: "",
        progress: this.props.currentValue !== "" ? 1 : 0,
        progressStatus: this.props.currentValue !== "" ? "success" : "waiting"
    }

    render() {
        let fileType = this.props.fileType ? this.props.fileType : "image"

        let w = "200px";
        let iconWidth = SizeAttr.pxMultiple(w, 0.07237);
        let h = SizeAttr.pxMultiple(w, 0.75);

        let iw = SizeAttr.pxMultiple(w, 0.97);
        let ih = SizeAttr.pxMultiple(h, 0.95);

        // 上传图片样式
        let imageBox = function (component: ImageUploadBox, wp: WindowParam, uuid: string) {
            return (
                <BoxUnit
                    needHover={true}
                    sizeAttr={new SizeAttr(wp, w, h)}
                    colorAttr={new ColorAttr(wp, "", "#F9F6F640")}
                    customStyleAttr={{"border": "1px solid #3084DB", "borderRadius": "12px", "position": "relative"}}
                    onClick={() => {
                        if (component.state.progressStatus == "waiting" || component.state.progressStatus == "success") {
                            let inputElement = document.getElementById(uuid)
                            if (inputElement != null) {
                                inputElement.click()
                            }
                        }
                    }}
                >
                    {/* 当前未选择任何文件*/}
                    {
                        component.state.currentFile == undefined &&
                        <BoxUnit customStyleAttr={{"position": "absolute"}} sizeAttr={new SizeAttr(wp, w, h)}>
                            <ImageUnit customStyleAttr={BoxAttr.getChildrenPositionObj()}
                                       url={addIcon} sizeAttr={new SizeAttr(wp, iconWidth, iconWidth)}/>
                        </BoxUnit>
                    }
                    {
                        component.state.currentFile == undefined && component.state.currentUrl &&
                        <BoxUnit customStyleAttr={{"position": "absolute"}} sizeAttr={new SizeAttr(wp, w, h)}>
                            <ImageUnit
                                sizeAttr={new SizeAttr(wp, iw, ih)}
                                customStyleAttr={BoxAttr.getChildrenPositionObj()}
                                innerImgStyle={{
                                    // "objectFit": "contain",
                                    "borderRadius": "12px"
                                }}
                                url={component.state.currentUrl}/>
                        </BoxUnit>
                    }
                    {
                        component.state.currentFile &&
                        // component.state.progressStatus != "uploading" &&
                        <BoxUnit customStyleAttr={{"position": "absolute"}} sizeAttr={new SizeAttr(wp, w, h)}>
                            <ImageUnit
                                sizeAttr={new SizeAttr(wp, iw, ih)}
                                customStyleAttr={BoxAttr.getChildrenPositionObj()}
                                innerImgStyle={{
                                    // "objectFit": "contain",
                                    "borderRadius": "12px"
                                }}
                                url={URL.createObjectURL(component.state.currentFile)}/>
                        </BoxUnit>
                    }
                    {/* 进度条与状态显示 */}
                    {
                        <BoxUnit key={uuid + "_" + component.state.progressStatus + "_" + component.state.progress}
                                 colorAttr={new ColorAttr(wp, "",
                                     component.state.progressStatus == "waiting" ? "#00000000" : "#00000000")}
                                 customStyleAttr={{
                                     "borderRadius": "12px", "position": "relative", "top": 0, "zIndex": 999,
                                     "display": ""
                                 }}
                                 sizeAttr={new SizeAttr(wp, w, h)}>
                            {
                                // 仅上传中显示绿色进度条
                                component.state.progressStatus == "uploading" &&
                                <BoxUnit customStyleAttr={{"position": "absolute"}}
                                         sizeAttr={new SizeAttr(wp, w, h)}>
                                    <ColumnUnit
                                        customStyleAttr={BoxAttr.getChildrenPositionObj()}>
                                        <ImageUnit sizeAttr={new SizeAttr(wp, SizeAttr.pxMultiple(w, 0.16))}
                                                   customStyleAttr={Object.assign(ColumnAttr.getChildrenPositionObj(),
                                                       {"marginBottom": "16px"})}
                                                   url={uploadLoading}/>
                                        <RowUnit sizeAttr={new SizeAttr(wp, SizeAttr.pxMultiple(w, 0.77))}
                                                 customStyleAttr={ColumnAttr.getChildrenPositionObj()}>
                                            {sepLineHorizontal(wp, "6px", "#55F01E",
                                                SizeAttr.pxMultiple(w, 0.77 * component.state.progress))}
                                        </RowUnit>
                                    </ColumnUnit>
                                </BoxUnit>
                            }
                            {
                                // 上传结果角标
                                (component.state.progressStatus == "success" ||
                                    component.state.progressStatus == "fail") &&
                                <ImageUnit sizeAttr={new SizeAttr(wp, "16px", "16px")}
                                           customStyleAttr={{
                                               "position": "absolute", "end": 0,
                                               "marginRight": "auto", "marginLeft": component.props.size == "large" ? SizeAttr.pxMultiple(w, 0.92) : SizeAttr.pxMultiple(w, 0.88),
                                               "marginBottom": "auto", "marginTop": component.props.size == "large" ? SizeAttr.pxMultiple(h, 0.88) : SizeAttr.pxMultiple(h, 0.86)
                                           }}
                                           url={component.state.progressStatus == "success" ? uploadSuccessIcon : uploadFailIcon}/>
                            }
                            {
                                // 文件重置角标
                                (component.state.currentFile || component.state.currentUrl) &&
                                <ImageUnit
                                    onClick={() => {
                                        component.setState(prevState => (Object.assign(prevState, {
                                            "currentFile": undefined,
                                            "currentUrl": "",
                                            "currentFileUuid": "",
                                            "progressStatus": "waiting",
                                            "progress": 0
                                        })))
                                    }}
                                    stopClickPropagation={true}
                                    sizeAttr={new SizeAttr(wp, "16px", "16px")}
                                    customStyleAttr={{
                                        "position": "absolute", "end": 0,
                                        "marginRight": "auto", "marginLeft": component.props.size == "large" ? SizeAttr.pxMultiple(w, 0.92) : SizeAttr.pxMultiple(w, 0.88),
                                        "marginBottom": "auto", "marginTop": SizeAttr.pxMultiple(h, 0.06)
                                    }}
                                    url={uploadResetLight}/>
                            }
                        </BoxUnit>
                    }
                </BoxUnit>
            )
        }

        // 上传文件样式
        let fileBox = function (component: ImageUploadBox, wp: WindowParam, uuid: string) {
            return (
                <ColumnUnit
                    key={uuid + "_" + component.state.progressStatus + "_" + component.state.progress}
                    needHover={true}
                    sizeAttr={new SizeAttr(wp, w)}
                    colorAttr={new ColorAttr(wp, "", "#F9F6F640")}
                    customStyleAttr={{"border": "1px solid #151516"}}
                    onClick={() => {
                        if (component.state.progressStatus != "waiting") return
                        let inputElement = document.getElementById(uuid)
                        if (inputElement != null) {
                            inputElement.click()
                        }
                    }}
                >
                    {/* 当前未选择任何文件*/}
                    {
                        component.state.currentFile == undefined &&
                        <BoxUnit customStyleAttr={BoxAttr.getChildrenPositionObj()}>
                            <RowUnit customStyleAttr={{"marginTop": "12px", "marginBottom": "12px"}}>
                                <ImageUnit customStyleAttr={BoxAttr.getChildrenPositionObj()}
                                           url={addIcon} sizeAttr={new SizeAttr(wp, "14px", "14px")}/>
                                <SpanText fontAttr={new FontAttr(wp, "1.1em")}
                                          customStyleAttr={Object.assign(RowAttr.getChildrenPositionObj(), {
                                              "marginLeft": "12px"
                                          })}>
                                    Upload file
                                </SpanText>
                            </RowUnit>
                        </BoxUnit>
                    }
                    {/* 进度条与状态显示 */}
                    {
                        component.state.currentFile &&
                        <ColumnUnit colorAttr={new ColorAttr(wp, "",
                            component.state.progressStatus == "waiting" ? "#00000000" : "#00000000")}
                            // customStyleAttr={{"position": "absolute", "top": 0, "zIndex": 999}}
                                    sizeAttr={new SizeAttr(wp, w)}>
                            <RowUnit customStyleAttr={{
                                "marginTop": "12px", "marginBottom": "12px",
                                "marginLeft": "18px", "marginRight": "18px"
                            }}
                                     sizeAttr={new SizeAttr(wp, "", "24px")}>
                                <ImageUnit url={fileIcon} sizeAttr={new SizeAttr(wp, "16px", "16px")}/>
                                <SpanText fontAttr={new FontAttr(wp, "1em")}
                                          customStyleAttr={{"marginLeft": "18px"}}>
                                    {"File: " + component.state.currentFile.name}
                                </SpanText>
                                <ImageUnit
                                    onClick={() => {
                                        component.setState(prevState => (Object.assign(prevState, {
                                            "currentFile": undefined,
                                            "currentFileUuid": "",
                                            "progressStatus": "waiting",
                                            "progress": 0
                                        })))
                                    }}
                                    stopClickPropagation={true}
                                    sizeAttr={new SizeAttr(wp, "16px", "16px")}
                                    customStyleAttr={{"marginLeft": "auto"}}
                                    url={uploadResetDark}/>
                            </RowUnit>

                            {
                                // 仅上传中显示绿色进度条
                                component.state.progressStatus == "uploading" &&
                                <RowUnit customStyleAttr={{
                                    "marginTop": "12px", "marginBottom": "12px",
                                    "marginLeft": "18px", "marginRight": "18px"
                                }}
                                         sizeAttr={new SizeAttr(wp)}>
                                    <SpanText fontAttr={new FontAttr(wp, "1em")}
                                              customStyleAttr={Object.assign(RowAttr.getChildrenPositionObj(), {"marginRight": "18px"})}>
                                        {"Uploading..."}
                                    </SpanText>
                                    <RowUnit sizeAttr={new SizeAttr(wp, SizeAttr.pxMultiple(w, 0.67))}
                                             customStyleAttr={RowAttr.getChildrenPositionObj()}>
                                        {sepLineHorizontal(wp, "6px", "#55F01E",
                                            SizeAttr.pxMultiple(w, 0.67 * component.state.progress))}
                                    </RowUnit>
                                    <SpanText fontAttr={new FontAttr(wp, "1em")}
                                              customStyleAttr={Object.assign(RowAttr.getChildrenPositionObj(), {"marginLeft": "18px"})}>
                                        {(Math.floor(component.state.progress * 100)) + "%"}
                                    </SpanText>
                                </RowUnit>
                            }
                            {
                                // 上传结果角标
                                (component.state.progressStatus == "success" ||
                                    component.state.progressStatus == "fail") &&
                                <RowUnit customStyleAttr={{
                                    "marginTop": "12px", "marginBottom": "12px",
                                    "marginLeft": "18px", "marginRight": "18px"
                                }}
                                         sizeAttr={new SizeAttr(wp, "")}>
                                    <SpanText fontAttr={new FontAttr(wp, "1em")}
                                              customStyleAttr={RowAttr.getChildrenPositionObj()}>
                                        {"Upload " + component.state.progressStatus}
                                    </SpanText>
                                    <ImageUnit sizeAttr={new SizeAttr(wp, "16px", "16px")}
                                               customStyleAttr={{
                                                   "marginLeft": "auto", "marginRight": "0px",
                                                   "marginTop": "auto", "marginBottom": "auto"
                                               }}
                                               url={component.state.progressStatus == "success" ? uploadSuccessIcon : uploadFailIcon}/>
                                </RowUnit>
                            }
                        </ColumnUnit>
                    }
                </ColumnUnit>
            )
        }

        return (
            <WindowParamContext.Consumer>
                {wpt => {
                    let wp = wpt.param;
                    let uuid = uuidv4()
                    return (
                        <ColumnUnit>
                            {/* 不实际显示的input dom对象*/}
                            <input id={uuid} onChange={(event) => {
                                if (event.target.files && event.target.files.length > 0) {
                                    const file = event.target.files[0];
                                    // 使用uuid生成一个全局唯一的字符串
                                    const fileUuid = uuidv4();
                                    fetchOssSts((success, ossStsToken) => {
                                        if (success && ossStsToken != undefined) {
                                            console.log("ossStsToken Success: " + ossStsToken.AccessKeyId)
                                            // sts token 获取成功后，设置当前要上传的文件
                                            this.setState(prevState => (Object.assign(prevState, {
                                                "currentFile": file,
                                                "currentFileUuid": fileUuid,
                                                "progressStatus": "uploading",
                                                "progress": 0
                                            })))
                                            uploadFileToOss(file, fileUuid, ossStsToken,
                                                (uniqueId, fileUrl, progress, uploadResult) => {
                                                    if (uniqueId == this.state.currentFileUuid) {
                                                        // 确保为当前选择的文件上传回调
                                                        this.setState(prevState => (Object.assign(prevState, {
                                                            "progress": progress,
                                                            "progressStatus": progress == 1 ? (uploadResult ? "success" : "fail") : "uploading"
                                                        })))
                                                        if (progress == 1 && uploadResult && this.props.valueUpdate) {
                                                            this.props.valueUpdate(fileUrl, this.props.imageIndex)
                                                        }
                                                    }
                                                })
                                        }
                                    })
                                }
                            }}
                                   type={"file"} style={{"width": "0", "height": "0", "display": "none"}}/>

                            {fileType == "image" && imageBox(this, wp, uuid)}
                            {(fileType == "docs" || fileType == "image&docs" || fileType == "any") &&
                                fileBox(this, wp, uuid)}

                        </ColumnUnit>
                    )
                }
                }
            </WindowParamContext.Consumer>
        )
    }
}