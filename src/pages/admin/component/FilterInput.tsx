import {RowUnit} from "../../../library/atomic/unit/RowUnit";
import {SpanText} from "../../../library/atomic/text/SpanText";

const inputStyle = {
    "marginRight": "14px",
    "marginLeft": "14px",
    "marginTop": "7px",
    "marginBottom": "7px",
    "fontSize": "1.12em"
}

export function InputString(desc: string, value: string, setValue: (v: string) => void) {
    return (
        <RowUnit customStyleAttr={inputStyle}>
            <SpanText customStyleAttr={{"marginRight": "6px"}}>
                {desc}
            </SpanText>
            <input type={"text"}
                   value={value} onChange={(e) => {
                setValue(e.target.value)
            }}/>
        </RowUnit>
    )
}

export function InputLongtext(desc: string, value: string, setValue: (v: string) => void) {
    return (
        <RowUnit customStyleAttr={inputStyle}>
            <SpanText customStyleAttr={{"marginRight": "6px"}}>
                {desc}
            </SpanText>
            <textarea
                rows={10}
                value={value} onChange={(e) => {
                setValue(e.target.value)
            }}/>
        </RowUnit>
    )
}

export function InputNumber(desc: string, value: number, setValue: (v: number) => void) {
    return (
        <RowUnit customStyleAttr={inputStyle}>
            <SpanText customStyleAttr={{"marginRight": "6px"}}>
                {desc}
            </SpanText>
            <input type={"text"}
                   value={value + ""} onChange={(e) => {
                setValue(Number(e.target.value))
            }}/>
        </RowUnit>
    )
}

export function InputBoolean(desc: string, value: boolean, setValue: (v: boolean) => void) {
    return (
        <RowUnit customStyleAttr={inputStyle}>
            <SpanText customStyleAttr={{"marginRight": "6px"}}>
                {desc}
            </SpanText>
            <select onChange={(e) => {
                setValue(e.target.value === "true")
            }}>
                <option selected={value} value="true">√</option>
                <option selected={!value} value="false">×</option>
            </select>
        </RowUnit>
    )
}