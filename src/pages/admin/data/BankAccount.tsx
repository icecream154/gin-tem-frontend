import {ColumnsType} from "antd/es/table";
import {Space} from "antd";

const BANK_ACCOUNT_BASE_SERVER_URL = "http://localhost:29999/bank-service"

export type BankAccountData = {
    id: number
    username: string
    money: number
    disabled: boolean
    created_at: string
}

export function BankAccountColumn(
    operateFunc: (id: number) => void,
    deleteFunc: (id: number) => void
): ColumnsType<BankAccountData> {
    return [
        {
            title: "primary key",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "帐户名称",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "帐户余额",
            dataIndex: "money",
            key: "money",
        },
        {
            title: "帐户是否可用",
            dataIndex: "disabled",
            key: "disabled",
            render: (disabled) => <span style={{"fontSize": "1.4em"}}>{disabled ? "√" : "×"}</span>,
        },
        {
            title: "帐户创建时间",
            dataIndex: "created_at",
            key: "created_at",
        },

        {
            title: '操作',
            dataIndex: '',
            key: 'x',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => {
                        operateFunc(record.id)
                    }}>更新</a>
                    <a onClick={() => {
                        deleteFunc(record.id)
                    }}>删除</a>
                </Space>
            ),
        },
    ]
}

export type BankAccountPaginationData = {
    total: number
    list: BankAccountData[]
}

export type BankAccountPaginationResp = {
    code: number
    msg: string
    data: BankAccountPaginationData
}

export type BankAccountListResp = {
    code: number
    msg: string
    data: BankAccountData[]
}

export type BankAccountResp = {
    code: number
    msg: string
    data: BankAccountData
}

export type BankAccountOpResp = {
    code: number
    msg: string
    data: string
}

export type AddBankAccountReq = {
    username: string
    money: number
    disabled: boolean
}

export function addBankAccount(req: AddBankAccountReq, callback: (success: boolean, resp?: BankAccountOpResp) => void) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
    };

    fetch(BANK_ACCOUNT_BASE_SERVER_URL + "/addBankAccount", options)
        .then(response => response.json())
        .then(res => {
            try {
                let resp = res as BankAccountOpResp;
                callback(resp.code === 200, resp);
            } catch (e) {
                callback(false, undefined);
            }
        })
}

export type UpdateBankAccountByIdReq = {
    username: string
    money: number
    id: number
}

export function updateBankAccountById(req: UpdateBankAccountByIdReq, callback: (success: boolean, resp?: BankAccountOpResp) => void) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
    };

    fetch(BANK_ACCOUNT_BASE_SERVER_URL + "/updateBankAccountById", options)
        .then(response => response.json())
        .then(res => {
            try {
                let resp = res as BankAccountOpResp;
                callback(resp.code === 200, resp);
            } catch (e) {
                callback(false, undefined);
            }
        })
}

export type DeleteBankAccountByIdReq = {
    id: number
}

export function deleteBankAccountById(req: DeleteBankAccountByIdReq, callback: (success: boolean, resp?: BankAccountOpResp) => void) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
    };

    fetch(BANK_ACCOUNT_BASE_SERVER_URL + "/deleteBankAccountById", options)
        .then(response => response.json())
        .then(res => {
            try {
                let resp = res as BankAccountOpResp;
                callback(resp.code === 200, resp);
            } catch (e) {
                callback(false, undefined);
            }
        })
}

export type QueryBankAccountByIdReq = {
    id: number
}

export function queryBankAccountById(req: QueryBankAccountByIdReq, callback: (success: boolean, resp?: BankAccountResp) => void) {
    fetch(BANK_ACCOUNT_BASE_SERVER_URL + "/queryBankAccountById" + "?" + "id=" + req.id)
        .then(response => response.json())
        .then(res => {
            try {
                let resp = res as BankAccountResp;
                callback(resp.code === 200, resp);
            } catch (e) {
                callback(false, undefined);
            }
        })
}

export type QueryByPageReq = {
    id: number
    username: string
    disabled: boolean
    page_num: number
    page_size: number
}

export function queryByPage(req: QueryByPageReq, callback: (success: boolean, resp?: BankAccountPaginationResp) => void) {
    fetch(BANK_ACCOUNT_BASE_SERVER_URL + "/queryByPage" + "?page_num=" + req.page_num + "&page_size=" + req.page_size + "&" + "id=" + req.id + "&" + "username=" + req.username + "&" + "disabled=" + req.disabled)
        .then(response => response.json())
        .then(res => {
            try {
                let resp = res as BankAccountPaginationResp;
                callback(resp.code === 200, resp);
            } catch (e) {
                callback(false, undefined);
            }
        })
}

export type QueryBankAccountByPageReq = {
    id: number
    username: string
    disabled: boolean
    page_num: number
    page_size: number
}

export function queryBankAccountByPage(req: QueryBankAccountByPageReq, callback: (success: boolean, resp?: BankAccountPaginationResp) => void) {
    fetch(BANK_ACCOUNT_BASE_SERVER_URL + "/queryBankAccountByPage" + "?page_num=" + req.page_num + "&page_size=" + req.page_size + "&" + "id=" + req.id + "&" + "username=" + req.username + "&" + "disabled=" + req.disabled)
        .then(response => response.json())
        .then(res => {
            try {
                let resp = res as BankAccountPaginationResp;
                callback(resp.code === 200, resp);
            } catch (e) {
                callback(false, undefined);
            }
        })
}

