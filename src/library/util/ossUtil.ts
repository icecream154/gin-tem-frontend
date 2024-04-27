import OSS from "ali-oss"

const OSS_STS_SERVER_BASE_URL = "https://cloudyhub.cn/cloudyhub-backend/getOssSts"
const OSS_STS_LOCAL_STORAGE_KEY = "cloudyhub-oss-sts-key"
const OSS_FILE_BASE_URL = "https://cloudyhub-test-static.oss-cn-shanghai.aliyuncs.com/"

export type OssStsTokenResp = {
    code: number,
    StatusCode: number,
    AccessKeyId: string,
    AccessKeySecret: string,
    SecurityToken: string,
    Expiration: string
}

function isOssStsTokenExpiredSoon(ossStsToken: OssStsTokenResp): boolean {
    // 将输入的ISO 8601格式时间字符串转换为日期对象
    const inputDate = new Date(ossStsToken.Expiration);
    // 获取当前UTC时间
    const currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() + 3);
    // 比较两个时间点，如果当前时间大于或等于输入时间，则返回true
    return currentDate >= inputDate;
}

function fetchOssStsTokenFromLocal(): OssStsTokenResp | undefined {
    let accountStr = localStorage.getItem(OSS_STS_LOCAL_STORAGE_KEY);
    if (!accountStr) return undefined;
    return JSON.parse(accountStr);
}

function saveOssStsTokenToLocal(ossStsToken: OssStsTokenResp) {
    localStorage.setItem(OSS_STS_LOCAL_STORAGE_KEY, JSON.stringify(ossStsToken));
}

function removeOssStsTokenFromLocal() {
    localStorage.removeItem(OSS_STS_LOCAL_STORAGE_KEY);
}

export function fetchOssSts(callback: (success: boolean, ossStsToken: OssStsTokenResp | undefined) => void) {
    let localStsToken = fetchOssStsTokenFromLocal()
    if (localStsToken != undefined && !isOssStsTokenExpiredSoon(localStsToken)) {
        callback(true, localStsToken)
    } else {
        fetch(OSS_STS_SERVER_BASE_URL)
            .then(response => response.json())
            .then(res => {
                try {
                    let resp = res as OssStsTokenResp;
                    saveOssStsTokenToLocal(resp)
                    callback(resp.code === 200 && resp.StatusCode === 200, resp);
                } catch (e) {
                    callback(false, undefined);
                }
            })
    }
}

function generateUniqueFileName(originalFilename: string, uniqueId: string): string {
    // 获取当前时间戳（毫秒级）
    const timestamp = Date.now();
    // 根据原始文件名、时间戳、随机数构造新的文件名
    let fileSuffix = "ossf"
    if (originalFilename.lastIndexOf(".") > 0) {
        fileSuffix += originalFilename.substring(originalFilename.lastIndexOf("."))
    }
    return `${uniqueId}_${timestamp}_${fileSuffix}`
}

export function uploadFileToOss(file: File, uniqueId: string, ossStsToken: OssStsTokenResp,
                                statusUpdate: (uniqueId: string, fileUrl: string, progress: number, uploadResult: boolean) => void) {
    const client = new OSS({
        region: "oss-cn-shanghai",
        accessKeyId: ossStsToken.AccessKeyId,
        accessKeySecret: ossStsToken.AccessKeySecret,
        stsToken: ossStsToken.SecurityToken,
        // 填写Bucket名称，例如examplebucket。
        bucket: "cloudyhub-test-static",
        secure: true
    });

    const name = generateUniqueFileName(file.name, uniqueId);
    const fileUrl = OSS_FILE_BASE_URL + name
    const headers = {
        "Access-Control-Allow-Origin": "*",
        // 指定该Object被下载时的网页缓存行为。
        "Cache-Control": "no-cache",
        // 指定该Object被下载时的名称。TODO: 根据业务含义生成文件名称
        "Content-Disposition": name,
        // 指定Object的存储类型。
        // "x-oss-storage-class": "Standard",
        // 指定初始化分片上传时是否覆盖同名Object。此处设置为true，表示禁止覆盖同名Object。
        "x-oss-forbid-overwrite": "true",
    };

    // 指定上传到bucket的Object名称
    console.log("update file name: [" + name + "]")
    const options = {
        // 获取分片上传进度、断点和返回值。
        progress: (p: number, cpt: any, res: any) => {
            console.log(p);
            statusUpdate(uniqueId, fileUrl, p, false)
        },
        // 设置并发上传的分片数量。
        parallel: 4,
        // 设置分片大小。默认值为1 MB，最小值为100 KB。
        partSize: 4 * 1024 * 1024,
    };

    try {
        console.log(("file data fetch over"))
        // 分片上传。
        client.multipartUpload(name, file, {...options, headers: headers}).then(r => {
            console.log("upload over: " + r.res.status)
            console.log("upload result: " + r)
            statusUpdate(uniqueId, fileUrl, 1, r.res.status == 200)
        })
    } catch (err) {
        console.log(err);
        statusUpdate(uniqueId, fileUrl, 1, false)
    }
}