import {Component} from "react";
import {WindowParamContext} from "../../library/context/WindowContext";
import {SizeAttr} from "../../library/basic/size";
import {ColumnAttr} from "../../library/basic/compose";
import {ColumnUnit} from "../../library/atomic/unit/ColumnUnit";
import {FontAttr} from "../../library/basic/font";
import {ColorAttr} from "../../library/basic/color";
import {
    addBankAccount,
    AddBankAccountReq,
    BankAccountColumn,
    BankAccountPaginationData,
    deleteBankAccountById,
    queryBankAccountByPage, updateBankAccountById,
    UpdateBankAccountByIdReq
} from "./data/BankAccount";
import {AdminNav} from "./component/AdminNav";
import {heightGap} from "../../library/atomic/unit/BoxUnit";
import {SpanText} from "../../library/atomic/text/SpanText";
import {fetchCurrEntity} from "./data/entities";
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
import {InputBoolean, InputNumber, InputString} from "./component/FilterInput";
import {ButtonUnit} from "../../library/atomic/button/Button";

export class BankAccountPage extends Component {
    static contextType = WindowParamContext;

    state: {
        id: number
        username: string
        disabled: boolean
        page_num: number
        page_size: number
        operate_id: number
        delete_id: number
        data: BankAccountPaginationData
        add_request: AddBankAccountReq
        update_request: UpdateBankAccountByIdReq
    } = {
        id: 0,
        username: "",
        disabled: false,
        page_num: 1,
        page_size: 10,
        operate_id: -1,
        delete_id: -1,
        data: {
            total: 0,
            list: []
        },
        add_request: {
            username: "",
            money: 0,
            disabled: false
        },
        update_request: {
            username: "",
            money: 0,
            id: 0
        }
    }

    queryCertainPage(pageNum: number, pageSize: number) {
        queryBankAccountByPage({
            id: this.state.id,
            username: this.state.username,
            disabled: this.state.disabled,
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
        addBankAccount(this.state.add_request, (success, resp) => {
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
        updateBankAccountById(this.state.update_request, (success, resp) => {
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

    handleEntityOperate(id: number) {
        for (let i = 0; i < this.state.data.list.length; i++) {
            if (this.state.data.list[i].id === id) {
                let update_request = Object.assign(this.state.update_request, {
                    id: id,
                    username: this.state.data.list[i].username,
                    money: this.state.data.list[i].money,
                })
                this.setState(prevState => (Object.assign(prevState, {operate_id: id, update_request: update_request})))
            }
        }
    }

    handleOperateClose() {
        this.setState(prevState => (Object.assign(prevState, {operate_id: -1})))
    }

    handleEntityDelete(id: number) {
        this.setState(prevState => (Object.assign(prevState, {delete_id: id})))
    }

    handleDeleteConfirm() {
        deleteBankAccountById({id: this.state.delete_id}, (success, resp) => {
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
                                    {InputString("用户名", this.state.add_request.username, (v) => {
                                        let add_request = Object.assign(this.state.add_request, {username: v})
                                        this.setState(prevState => (Object.assign(prevState, {add_request: add_request})))
                                    })}
                                    {InputNumber("金额", this.state.add_request.money, (v) => {
                                        let add_request = Object.assign(this.state.add_request, {money: v})
                                        this.setState(prevState => (Object.assign(prevState, {add_request: add_request})))
                                    })}
                                    {InputBoolean("是否禁用", this.state.add_request.disabled, (v) => {
                                        let add_request = Object.assign(this.state.add_request, {disabled: v})
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
                                    {InputString("用户名", this.state.update_request.username, (v) => {
                                        let update_request = Object.assign(this.state.update_request, {username: v})
                                        this.setState(prevState => (Object.assign(prevState, {update_request: update_request})))
                                    })}
                                    {InputNumber("金额", this.state.update_request.money, (v) => {
                                        let update_request = Object.assign(this.state.update_request, {money: v})
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
                                    {fetchCurrEntity().description}
                                </SpanText>
                                {heightGap(wp, basicHeightGap)}

                                {/*过滤字段*/}
                                <RowUnit customStyleAttr={{"flexWrap": "wrap", "marginLeft": basicWidthGap}}>
                                    {InputNumber("ID", this.state.id, (v) => {
                                        this.setState(prevState => (Object.assign(prevState, {id: v})))
                                    })}
                                    {InputString("用户名", this.state.username, (v) => {
                                        this.setState(prevState => (Object.assign(prevState, {username: v})))
                                    })}
                                    {InputBoolean("是否禁用", this.state.disabled, (v) => {
                                        this.setState(prevState => (Object.assign(prevState, {disabled: v})))
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
                                    columns={BankAccountColumn((id: number) => {
                                        this.handleEntityOperate(id)
                                    }, (id: number) => {
                                        this.handleEntityDelete(id)
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