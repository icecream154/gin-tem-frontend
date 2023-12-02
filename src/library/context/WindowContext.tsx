import React, {createContext, useEffect, useState} from 'react'
import {Language, LanguageEnKey} from "./LanguageContext";

export type WindowMillParam = {
    expandPcWidth: number
    mediaPanelWidth: number
    phoneWidth: number
    minPhoneWidth: number
    expandPcHeight: number
    minPhoneHeight: number
};

export type WindowConfig = {
    windowWidth: number
    windowHeight: number
}

function getWindowConfig(): WindowConfig {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    return {
        windowWidth: windowWidth,
        windowHeight: windowHeight
    }
}

export class WindowParam {
    currWidth: number
    currHeight: number
    version: string
    mileParam: WindowMillParam
    language: Language

    constructor(currWidth?: number, currHeight?: number, version?: string, mileParam?: WindowMillParam,
                language?: Language) {
        this.currWidth = currWidth ? currWidth : getWindowConfig().windowWidth;
        this.currHeight = currHeight ? currHeight : getWindowConfig().windowHeight;
        this.version = version ? version :getWindowConfig().windowWidth + "";
        this.mileParam = mileParam ? mileParam : wpMillDefault;
        this.language = language ? language : Language.fetchLanByEnKey(Language.fetchLanguageEnKeyFromStorage())
    }

    switchLanguage(enKey: LanguageEnKey): WindowParam {
        Language.storageLanguageEnKey(enKey);
        return new WindowParam(
            this.currWidth, this.currHeight, this.currWidth + "-" + enKey, this.mileParam,
            Language.fetchLanByEnKey(enKey)
        );
    }

    pcSmall(mile?: number): boolean {
        return this.currWidth < (mile ? mile : this.mileParam.expandPcWidth);
    }

    mediumSmall(mile?: number): boolean {
        return this.currWidth < (mile ? mile : (this.mileParam.mediaPanelWidth + this.mileParam.expandPcWidth) / 2);
    }

    mediaSmall(mile?: number): boolean {
        return this.currWidth < (mile ? mile : this.mileParam.mediaPanelWidth);
    }

    phoneSmall(mile?: number): boolean {
        return this.currWidth < (mile ? mile : this.mileParam.phoneWidth);
    }
}

export const wpMillDefault: WindowMillParam = {
    expandPcWidth: 1440,
    mediaPanelWidth: 900,
    phoneWidth: 660,
    minPhoneWidth: 280,
    expandPcHeight: 1000,
    minPhoneHeight: 900
}

type WindowParamContextType = {
    param: WindowParam
    setParam: React.Dispatch<React.SetStateAction<WindowParam>>
}

type WindowParamContextProviderProps = {
    children: React.ReactNode
}

export const WindowParamContext = createContext({} as WindowParamContextType)

export const WindowParamContextProvider = ({children}: WindowParamContextProviderProps) => {
    const [param, setParam] = useState<WindowParam>(
        new WindowParam())

    useEffect(() => {
        const updateWindowDimensions = () => {
            const newWidth = getWindowConfig().windowWidth;
            const newHeight =getWindowConfig().windowHeight;
            setParam(new WindowParam(newWidth, newHeight, newWidth + "-" + param.language.enKey,
                wpMillDefault, Language.fetchLanByEnKey(Language.fetchLanguageEnKeyFromStorage())))
        };
        window.addEventListener("resize", updateWindowDimensions);

        window.onbeforeunload = () => {
            sessionStorage.clear();
        }

        return () => window.removeEventListener("resize", updateWindowDimensions)
    }, []);

    return (
        <WindowParamContext.Provider value={{param, setParam}}>
            {children}
        </WindowParamContext.Provider>
    )
}
