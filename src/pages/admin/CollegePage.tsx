import {Component} from "react";
import {WindowParamContext} from "../../library/context/WindowContext";
import {SizeAttr} from "../../library/basic/size";
import {ColumnAttr} from "../../library/basic/compose";
import {ColumnUnit} from "../../library/atomic/unit/ColumnUnit";
import {FontAttr} from "../../library/basic/font";
import {ColorAttr} from "../../library/basic/color";
import {
    addCollege,
    CollegeColumn,
    updateCollegeById,
    deleteCollegeById,
    queryCollegeByPage,
    CollegePaginationData,
    AddCollegeReq,
    UpdateCollegeByIdReq
} from "./data/College";
import {AdminNav} from "./component/AdminNav";
import {heightGap} from "../../library/atomic/unit/BoxUnit";
import {SpanText} from "../../library/atomic/text/SpanText";
import {fetchCurrType} from "./data/entities";
import {message, Table} from "antd";
import {basicHeightGap, basicWidthGap} from "./display/layout";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    SwipeableDrawer
} from "@mui/material";
import {RowUnit} from "../../library/atomic/unit/RowUnit";
import {InputBoolean, InputNumber, InputString, InputLongtext} from "./component/FilterInput";
import {ButtonUnit} from "../../library/atomic/button/Button";

export class CollegePage extends Component {
    static contextType = WindowParamContext;

    state: {
		id: number
		college_name: string
		college_description: string
		location: string
		year_established: number

        page_num: number
        page_size: number
        operate_id: number
        delete_id: number
        data: CollegePaginationData
        add_request: AddCollegeReq
        update_request: UpdateCollegeByIdReq
    } = {
		id: 0,
		college_name: "",
		college_description: "",
		location: "",
		year_established: 0,

        page_num: 1,
        page_size: 10,
        operate_id: -1,
        delete_id: -1,
        data: {
            total: 0,
            list: []
        },
        add_request: {

			college_name: "",
			college_description: "",
			location: "",
			year_established: 0,

        },
        update_request: {

			college_description: "",
			location: "",
			year_established: 0,

            id: 0
        }
    }

    queryCertainPage(pageNum: number, pageSize: number) {
        queryCollegeByPage({
			id: this.state.id,
			college_name: this.state.college_name,
			college_description: this.state.college_description,
			location: this.state.location,
			year_established: this.state.year_established,

            page_num: pageNum,
            page_size: pageSize,
        }, (success, resp) => {
            if (success && resp) {
                this.setState(prevState => (Object.assign(prevState,
                    {
                        page_num: pageNum,
                        page_size: pageSize,
                        data: resp.data
                    }
                )))
            }
        })
    }

    handleAddConfirm() {
        addCollege(this.state.add_request, (success, resp) => {
            if (success) {
                message.success("操作成功")
            } else {
                message.error("操作失败")
            }
            // 关闭删除对话框
            this.handleOperateClose()
            // 重新查询本页数据
            this.queryCertainPage(this.state.page_num, this.state.page_size)
        })
    }

    handleUpdateConfirm() {
        updateCollegeById(this.state.update_request, (success, resp) => {
            if (success) {
                message.success("操作成功")
            } else {
                message.error("操作失败")
            }
            // 关闭删除对话框
            this.handleOperateClose()
            // 重新查询本页数据
            this.queryCertainPage(this.state.page_num, this.state.page_size)
        })
    }

    handleCollegeOperate(id: number) {
        for (let i = 0; i < this.state.data.list.length; i++) {
            if (this.state.data.list[i].id === id) {
                let update_request = Object.assign(this.state.update_request, {
                    id: id,
					college_description: this.state.data.list[i].college_description,
					location: this.state.data.list[i].location,
					year_established: this.state.data.list[i].year_established,

                })
                this.setState(prevState => (Object.assign(prevState, {operate_id: id, update_request: update_request})))
            }
        }
    }

    handleOperateClose() {
        this.setState(prevState => (Object.assign(prevState, {operate_id: -1})))
    }

    handleCollegeDelete(id: number) {
        this.setState(prevState => (Object.assign(prevState, {delete_id: id})))
    }

    handleDeleteConfirm() {
        deleteCollegeById({id: this.state.delete_id}, (success, resp) => {
            if (success) {
                message.success("操作成功")
            } else {
                message.error("操作失败")
            }
            // 关闭删除对话框
            this.handleDeleteClose()
            // 重新查询本页数据
            this.queryCertainPage(this.state.page_num, this.state.page_size)
        })
    }

    handleDeleteClose() {
        this.setState(prevState => (Object.assign(prevState, {delete_id: -1})))
    }

    componentDidMount() {
        this.queryCertainPage(1, 10)
    }

    render() {
        return (
            <WindowParamContext.Consumer>
                {wpt => {
                    let wp = wpt.param;

                    return (
                        <ColumnUnit fontAttr={new FontAttr(wp, "0.88em")}
                                    sizeAttr={new SizeAttr(wp)}
                                    colorAttr={new ColorAttr(wp, "", "#F4F5F977")}
                                    customStyleAttr={Object.assign(ColumnAttr.getChildrenPositionObj(), {
                                        "minHeight": "100vh"
                                    })}>
                            {AdminNav(wp)}

                            {/*删除 Dialog*/}
                            <Dialog
                                open={this.state.delete_id > 0}
                                onClose={() => {
                                    this.handleDeleteClose()
                                }}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"是否确认删除该记录？"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        ID: {this.state.delete_id}
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => {
                                        this.handleDeleteClose()
                                    }}>取消</Button>
                                    <Button onClick={() => {
                                        this.handleDeleteConfirm()
                                    }} autoFocus>
                                        确认
                                    </Button>
                                </DialogActions>
                            </Dialog>

                            {/*新增 Dialog*/}
                            <SwipeableDrawer
                                anchor={"right"}
                                open={this.state.operate_id === 0}
                                onClose={() => {
                                    this.handleOperateClose()
                                }}
                                onOpen={() => {
                                }}
                            >
                                <ColumnUnit>
									{InputString("大学名称", this.state.add_request.college_name, (v) => {
									    let add_request = Object.assign(this.state.add_request, {college_name: v})
									    this.setState(prevState => (Object.assign(prevState, {add_request: add_request})))
									})}
									{InputLongtext("学校介绍与描述", this.state.add_request.college_description, (v) => {
									    let add_request = Object.assign(this.state.add_request, {college_description: v})
									    this.setState(prevState => (Object.assign(prevState, {add_request: add_request})))
									})}
									{InputString("学校地点", this.state.add_request.location, (v) => {
									    let add_request = Object.assign(this.state.add_request, {location: v})
									    this.setState(prevState => (Object.assign(prevState, {add_request: add_request})))
									})}
									{InputNumber("建校时间", this.state.add_request.year_established, (v) => {
									    let add_request = Object.assign(this.state.add_request, {year_established: v})
									    this.setState(prevState => (Object.assign(prevState, {add_request: add_request})))
									})}

                                    <ButtonUnit borderRadius={"6px"} colorAttr={new ColorAttr(wp, "", "white")}
                                                hoverColorAttr={new ColorAttr(wp, "", "white")}
                                                text={"新增"} buttonSize={new SizeAttr(wp, "66px")} onClick={() => {
                                        this.handleAddConfirm()
                                    }}/>
                                </ColumnUnit>
                            </SwipeableDrawer>

                            {/*更新 Dialog*/}
                            <SwipeableDrawer
                                anchor={"right"}
                                open={this.state.operate_id > 0}
                                onClose={() => {
                                    this.handleOperateClose()
                                }}
                                onOpen={() => {
                                }}
                            >
                                <ColumnUnit>
									{InputLongtext("学校介绍与描述", this.state.update_request.college_description, (v) => {
									    let update_request = Object.assign(this.state.update_request, {college_description: v})
									    this.setState(prevState => (Object.assign(prevState, {update_request: update_request})))
									})}
									{InputString("学校地点", this.state.update_request.location, (v) => {
									    let update_request = Object.assign(this.state.update_request, {location: v})
									    this.setState(prevState => (Object.assign(prevState, {update_request: update_request})))
									})}
									{InputNumber("建校时间", this.state.update_request.year_established, (v) => {
									    let update_request = Object.assign(this.state.update_request, {year_established: v})
									    this.setState(prevState => (Object.assign(prevState, {update_request: update_request})))
									})}

                                    <ButtonUnit borderRadius={"6px"} colorAttr={new ColorAttr(wp, "", "white")}
                                                hoverColorAttr={new ColorAttr(wp, "", "white")}
                                                text={"更新"} buttonSize={new SizeAttr(wp, "66px")} onClick={() => {
                                        this.handleUpdateConfirm()
                                    }}/>
                                </ColumnUnit>
                            </SwipeableDrawer>

                            {/*数据板块*/}
                            <ColumnUnit>
                                {heightGap(wp, basicHeightGap)}
                                <SpanText customStyleAttr={{"marginLeft": basicWidthGap, "justifyContent": ""}}
                                          fontAttr={new FontAttr(wp, "1.4em", "600")}>
                                    {fetchCurrType().description}
                                </SpanText>
                                {heightGap(wp, basicHeightGap)}

                                {/*过滤字段*/}
                                <RowUnit customStyleAttr={{"flexWrap": "wrap", "marginLeft": basicWidthGap}}>
									{InputNumber("ID", this.state.id, (v) => {
									    this.setState(prevState => (Object.assign(prevState, {id: v})))
									})}
									
									{InputString("大学名称", this.state.college_name, (v) => {
									    this.setState(prevState => (Object.assign(prevState, {college_name: v})))
									})}
									
									{InputLongtext("学校介绍与描述", this.state.college_description, (v) => {
									    this.setState(prevState => (Object.assign(prevState, {college_description: v})))
									})}
									
									{InputString("学校地点", this.state.location, (v) => {
									    this.setState(prevState => (Object.assign(prevState, {location: v})))
									})}
									
									{InputNumber("建校时间", this.state.year_established, (v) => {
									    this.setState(prevState => (Object.assign(prevState, {year_established: v})))
									})}
									

                                    <ButtonUnit borderRadius={"6px"} colorAttr={new ColorAttr(wp, "", "white")}
                                                hoverColorAttr={new ColorAttr(wp, "", "white")}
                                                text={"查询"} buttonSize={new SizeAttr(wp, "66px")} onClick={() => {
                                        this.queryCertainPage(this.state.page_num, this.state.page_size)
                                    }}/>
                                    <ButtonUnit borderRadius={"6px"} colorAttr={new ColorAttr(wp, "", "white")}
                                                hoverColorAttr={new ColorAttr(wp, "", "white")}
                                                text={"新增"} buttonSize={new SizeAttr(wp, "66px")} onClick={() => {
                                        this.setState(prevState => (Object.assign(prevState, {operate_id: 0})))
                                    }}/>
                                </RowUnit>

                                {heightGap(wp, basicHeightGap)}
                                <Table
                                    pagination={{
                                        current: this.state.page_num,
                                        onChange: (page, pageSize) => {
                                            this.queryCertainPage(page, pageSize)
                                        },
                                        total: this.state.data.total,
                                    }}
                                    bordered={true}
                                    columns={CollegeColumn((id: number) => {
                                        this.handleCollegeOperate(id)
                                    }, (id: number) => {
                                        this.handleCollegeDelete(id)
                                    })}
                                    dataSource={this.state.data.list}
                                />

                            </ColumnUnit>
                        </ColumnUnit>
                    )
                }
                }
            </WindowParamContext.Consumer>
        )
    }
}