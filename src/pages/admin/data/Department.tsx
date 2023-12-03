import {ColumnsType} from "antd/es/table";
import {Space} from "antd";

const DEPARTMENT_BASE_SERVER_URL = "http://localhost:29998/askomo"

export type DepartmentData = {
	id: number
	department_name: string
	department_description: string
	college_name: string
	year_established: number
}

export function DepartmentColumn(
    operateFunc: (id: number) => void,
    deleteFunc: (id: number) => void
): ColumnsType<DepartmentData> {
    return [
		{
			title: "ID",
			dataIndex:"id",
			key: "id",
		},
		{
			title: "院系名称",
			dataIndex:"department_name",
			key: "department_name",
		},
		{
			title: "院系介绍与描述",
			dataIndex:"department_description",
			key: "department_description",
		},
		{
			title: "所属大学名称",
			dataIndex:"college_name",
			key: "college_name",
		},
		{
			title: "院系成立时间",
			dataIndex:"year_established",
			key: "year_established",
		},

        {
            title: '操作',
            dataIndex: '',
            key: 'x',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => { operateFunc(record.id) }}>更新</a>
                    <a onClick={() => { deleteFunc(record.id) }}>删除</a>
                </Space>
            ),
        },
    ]
}

export type DepartmentPaginationData = {
    total: number
    list: DepartmentData[]
}

export type DepartmentPaginationResp = {
    code: number
    msg: string
    data: DepartmentPaginationData
}

export type DepartmentListResp = {
    code: number
    msg: string
    data: DepartmentData[]
}

export type DepartmentResp = {
    code: number
    msg: string
    data: DepartmentData
}

export type DepartmentOpResp = {
    code: number
    msg: string
    data: string
}

export type AddDepartmentReq = {
	department_name: string
	department_description: string
	college_name: string
	year_established: number
}

export function addDepartment(req: AddDepartmentReq, callback: (success: boolean, resp?: DepartmentOpResp) => void) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
    };

    fetch(DEPARTMENT_BASE_SERVER_URL + "/addDepartment", options)
        .then(response => response.json())
        .then(res => {
            try {
                let resp = res as DepartmentOpResp;
                callback(resp.code === 200, resp);
            } catch (e) {
                callback(false, undefined);
            }
        })
}

export type UpdateDepartmentByIdReq = {
	department_description: string
	year_established: number
	id: number
}

export function updateDepartmentById(req: UpdateDepartmentByIdReq, callback: (success: boolean, resp?: DepartmentOpResp) => void) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
    };

    fetch(DEPARTMENT_BASE_SERVER_URL + "/updateDepartmentById", options)
        .then(response => response.json())
        .then(res => {
            try {
                let resp = res as DepartmentOpResp;
                callback(resp.code === 200, resp);
            } catch (e) {
                callback(false, undefined);
            }
        })
}

export type DeleteDepartmentByIdReq = {
	id: number
}

export function deleteDepartmentById(req: DeleteDepartmentByIdReq, callback: (success: boolean, resp?: DepartmentOpResp) => void) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
    };

    fetch(DEPARTMENT_BASE_SERVER_URL + "/deleteDepartmentById", options)
        .then(response => response.json())
        .then(res => {
            try {
                let resp = res as DepartmentOpResp;
                callback(resp.code === 200, resp);
            } catch (e) {
                callback(false, undefined);
            }
        })
}

export type QueryDepartmentByPageReq = {
	id: number
	department_name: string
	department_description: string
	college_name: string
	year_established: number
	page_num: number
	page_size: number
}

export function queryDepartmentByPage(req: QueryDepartmentByPageReq, callback: (success: boolean, resp?: DepartmentPaginationResp) => void) {
    fetch(DEPARTMENT_BASE_SERVER_URL + "/queryDepartmentByPage" + "?page_num=" + req.page_num + "&page_size=" + req.page_size + "&" + "id=" + req.id + "&" + "department_name=" + req.department_name + "&" + "department_description=" + req.department_description + "&" + "college_name=" + req.college_name + "&" + "year_established=" + req.year_established)
        .then(response => response.json())
        .then(res => {
            try {
                let resp = res as DepartmentPaginationResp;
                callback(resp.code === 200, resp);
            } catch (e) {
                callback(false, undefined);
            }
        })
}

