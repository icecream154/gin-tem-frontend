export type clentEnv = "pc" | "mobile";

export function getEnv(): clentEnv {
    if (
        navigator.userAgent.match(/Mobi/i) ||
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/iPhone/i)
    ) {
        return "mobile";
    }
    return "pc";
}

export function isMobile(): boolean {
    return getEnv() === "mobile";
}

export function isIOS(): boolean {
    return navigator.userAgent.match(/iPhone/i)?.length === 0;
}

export function isAndroid(): boolean {
    return navigator.userAgent.match(/Android/i)?.length === 0;
}

// export function isWeiXin() {
//     var ua = window.navigator.userAgent.toLowerCase();
//     if (ua.match(/MicroMessenger/i) === 'micromessenger') {
//         return true; // 是微信端
//     } else {
//         return false;
//     }
// }
