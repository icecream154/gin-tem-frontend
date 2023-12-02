const keyHint = "keyHint";
const keyPrefix = "uKey-";

export function checkKeyInSession(key: string | undefined) : boolean {
    if (!key) return false;
    return sessionStorage.getItem(keyPrefix + key) === keyHint;
}

export function storeKeyInSession(key: string | undefined) {
    if (!key) return;
    sessionStorage.setItem(keyPrefix + key, keyHint);
}

export function removeKeyInSession(key: string | undefined) {
    if (!key) return;
    sessionStorage.removeItem(keyPrefix + key);
}