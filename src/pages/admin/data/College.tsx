import {ColumnsType} from "antd/es/table";
import {Space} from "antd";

const COLLEGE_BASE_SERVER_URL = "http://localhost:29998/askomo"

export type CollegeData = {
	id: number
	college_name: string
	college_description: string
	location: string
	year_established: number
}

export function CollegeColumn(
    operateFunc: (id: number) => void,
    deleteFunc: (id: number) => void
): ColumnsType<CollegeData> {
    return [
		{
			title: "ID",
			dataIndex:"id",
			key: "id",
		},
		{
			title: "大学名称",
			dataIndex:"college_name",
			key: "college_name",
		},
		{
			title: "学校介绍与描述",
			dataIndex:"college_description",
			key: "college_description",
		},
		{
			title: "学校地点",
			dataIndex:"location",
			key: "location",
		},
		{
			title: "建校时间",
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

export type CollegePaginationData = {
    total: number
    list: CollegeData[]
}

export type CollegePaginationResp = {
    code: number
    msg: string
    data: CollegePaginationData
}

export type CollegeListResp = {
    code: number
    msg: string
    data: CollegeData[]
}

export type CollegeResp = {
    code: number
    msg: string
    data: CollegeData
}

export type CollegeOpResp = {
    code: number
    msg: string
    data: string
}

export type AddCollegeReq = {
	college_name: string
	college_description: string
	location: string
	year_established: number
}

export function addCollege(req: AddCollegeReq, callback: (success: boolean, resp?: CollegeOpResp) => void) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
    };

    fetch(COLLEGE_BASE_SERVER_URL + "/addCollege", options)
        .then(response => response.json())
        .then(res => {
            try {
                let resp = res as CollegeOpResp;
                callback(resp.code === 200, resp);
            } catch (e) {
                callback(false, undefined);
            }
        })
}

export type UpdateCollegeByIdReq = {
	college_description: string
	location: string
	year_established: number
	id: number
}

export function updateCollegeById(req: UpdateCollegeByIdReq, callback: (success: boolean, resp?: CollegeOpResp) => void) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
    };

    fetch(COLLEGE_BASE_SERVER_URL + "/updateCollegeById", options)
        .then(response => response.json())
        .then(res => {
            try {
                let resp = res as CollegeOpResp;
                callback(resp.code === 200, resp);
            } catch (e) {
                callback(false, undefined);
            }
        })
}

export type DeleteCollegeByIdReq = {
	id: number
}

export function deleteCollegeById(req: DeleteCollegeByIdReq, callback: (success: boolean, resp?: CollegeOpResp) => void) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
    };

    fetch(COLLEGE_BASE_SERVER_URL + "/deleteCollegeById", options)
        .then(response => response.json())
        .then(res => {
            try {
                let resp = res as CollegeOpResp;
                callback(resp.code === 200, resp);
            } catch (e) {
                callback(false, undefined);
            }
        })
}

export type QueryCollegeByPageReq = {
	id: number
	college_name: string
	college_description: string
	location: string
	year_established: number
	page_num: number
	page_size: number
}

export function queryCollegeByPage(req: QueryCollegeByPageReq, callback: (success: boolean, resp?: CollegePaginationResp) => void) {
    fetch(COLLEGE_BASE_SERVER_URL + "/queryCollegeByPage" + "?page_num=" + req.page_num + "&page_size=" + req.page_size + "&" + "id=" + req.id + "&" + "college_name=" + req.college_name + "&" + "college_description=" + req.college_description + "&" + "location=" + req.location + "&" + "year_established=" + req.year_established)
        .then(response => response.json())
        .then(res => {
            try {
                let resp = res as CollegePaginationResp;
                callback(resp.code === 200, resp);
            } catch (e) {
                callback(false, undefined);
            }
        })
}

