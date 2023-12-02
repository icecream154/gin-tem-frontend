export type LanguageEnKey = "English" | "Simplified Chinese" | "Dutch"

const languageStorageKey = "cloudyhub-demo-websites-language-enKey"

export class Language {
    enKey: LanguageEnKey // 该语言的英语表示
    chKey: string // 该语言的中文表示
    lanKey: string // 该语言在该语言中的表示

    constructor(enKey: LanguageEnKey, chKey: string, lanKey: string) {
        this.enKey = enKey;
        this.chKey = chKey;
        this.lanKey = lanKey;
    }

    isEnglish(): boolean {
        return this.enKey === "English";
    }

    static fetchLanByEnKey(enKey: LanguageEnKey): Language {
        switch (enKey) {
            case "English":
                return new Language(enKey, "英语", "English");
            case "Simplified Chinese":
                return new Language(enKey, "简体中文", "简体中文");
            case "Dutch":
                return new Language(enKey, "荷兰语", "");
        }
    }

    static storageLanguageEnKey(enKey: LanguageEnKey) {
        localStorage.setItem(languageStorageKey, enKey);
    }

    static fetchLanguageEnKeyFromStorage(): LanguageEnKey {
        let localStorageLanguageEnKey = localStorage.getItem(languageStorageKey);
        return localStorageLanguageEnKey ? localStorageLanguageEnKey as LanguageEnKey : "Simplified Chinese";
    }
}
