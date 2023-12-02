import {ColumnsType} from "antd/es/table";
import {Space} from "antd";

const BANK_ORDER_BASE_SERVER_URL = "http://localhost:29999/bank-service"

export type BankOrderData = {
	id: number
	from_account: string
	to_account: string
	money: number
	created_at: string
}

export function bankOrderColumn(): ColumnsType<BankOrderData> {
    return [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '发起方账户',
            dataIndex: 'from_account',
            key: 'from_account',
        },
        {
            title: '接收方账户',
            dataIndex: 'to_account',
            key: 'to_account',
        },
        {
            title: '账户金额',
            dataIndex: 'money',
            key: 'money',
        },
        {
            title: '转账时间',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: '操作',
            dataIndex: '',
            key: 'x',
            render: (_, record) => (
                <Space size="middle">
                    <a>更新</a>
                    <a>删除</a>
                </Space>
            ),
        },
    ]
}

export type BankOrderPaginationData = {
    total: number
    list: BankOrderData[]
}

export type BankOrderPaginationResp = {
    code: number
    msg: string
    data: BankOrderPaginationData
}

export type BankOrderListResp = {
    code: number
    msg: string
    data: BankOrderData[]
}

export type BankOrderResp = {
    code: number
    msg: string
    data: BankOrderData
}

export type BankOrderOpResp = {
    code: number
    msg: string
    data: string
}
export type SubmitTransferReq = {
	from_account: string
	to_account: string
	money: number
}

export function submitTransfer(req: SubmitTransferReq, callback: (success: boolean, resp?: BankOrderOpResp) => void) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
    };

    fetch(BANK_ORDER_BASE_SERVER_URL + "/submitTransfer", options)
        .then(response => response.json())
        .then(res => {
            try {
                let resp = res as BankOrderOpResp;
                callback(resp.code === 200, resp);
            } catch (e) {
                callback(false, undefined);
            }
        })
}

export type DeleteTransferByIdReq = {
	id: number
}

export function deleteTransferById(req: DeleteTransferByIdReq, callback: (success: boolean, resp?: BankOrderOpResp) => void) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
    };

    fetch(BANK_ORDER_BASE_SERVER_URL + "/deleteTransferById", options)
        .then(response => response.json())
        .then(res => {
            try {
                let resp = res as BankOrderOpResp;
                callback(resp.code === 200, resp);
            } catch (e) {
                callback(false, undefined);
            }
        })
}

export type QueryTransferByIdReq = {
	id: number
}

export function queryTransferById(req: QueryTransferByIdReq, callback: (success: boolean, resp?: BankOrderResp) => void) {
    fetch(BANK_ORDER_BASE_SERVER_URL + "/queryTransferById" + "?" + "id=" + req.id)
        .then(response => response.json())
        .then(res => {
            try {
                let resp = res as BankOrderResp;
                callback(resp.code === 200, resp);
            } catch (e) {
                callback(false, undefined);
            }
        })
}

export type QueryTransferBySubmitReq = {
	from_account: string
	page_num: number
	page_size: number
}

export function queryTransferBySubmit(req: QueryTransferBySubmitReq, callback: (success: boolean, resp?: BankOrderPaginationResp) => void) {
    fetch(BANK_ORDER_BASE_SERVER_URL + "/queryTransferBySubmit" + "?page_num=" + req.page_num + "&page_size=" + req.page_size + "&" + "from_account=" + req.from_account)
        .then(response => response.json())
        .then(res => {
            try {
                let resp = res as BankOrderPaginationResp;
                callback(resp.code === 200, resp);
            } catch (e) {
                callback(false, undefined);
            }
        })
}

export type QueryAllTransferByPageReq = {
	page_num: number
	page_size: number
}

export function queryAllTransferByPage(req: QueryAllTransferByPageReq, callback: (success: boolean, resp?: BankOrderPaginationResp) => void) {
    fetch(BANK_ORDER_BASE_SERVER_URL + "/queryAllTransferByPage" + "?page_num=" + req.page_num + "&page_size=" + req.page_size)
        .then(response => response.json())
        .then(res => {
            try {
                let resp = res as BankOrderPaginationResp;
                callback(resp.code === 200, resp);
            } catch (e) {
                callback(false, undefined);
            }
        })
}

