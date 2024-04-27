import {ReactNode} from "react";
import {WindowParam} from "../../context/WindowContext";
import {ColumnUnit} from "../../atomic/unit/ColumnUnit";
import {BoxUnit, sepLineHorizontal, sepLineVertical} from "../../atomic/unit/BoxUnit";
import {RowUnit} from "../../atomic/unit/RowUnit";

export type TableRow = ReactNode[];

export function BaseTableUnit(wp: WindowParam, rows: TableRow[], lineWidth: string, lineColor?: string) {
    if (!rows) return <BoxUnit />;

    let cLineColor = lineColor ? lineColor : "black";
    return (
        <ColumnUnit>
            {sepLineHorizontal(wp, lineWidth, cLineColor)}
            {
                rows.map((r) => {
                    return (
                        <ColumnUnit>
                            <RowUnit>
                                {sepLineVertical(wp, lineWidth, cLineColor)}
                                {
                                    r.map((n) => {
                                        return (
                                            <RowUnit>
                                                {n}
                                                {sepLineVertical(wp, lineWidth, cLineColor)}
                                            </RowUnit>
                                        )
                                    })
                                }
                            </RowUnit>
                            {sepLineHorizontal(wp, lineWidth, cLineColor)}
                        </ColumnUnit>
                    )
                })
            }
        </ColumnUnit>
    )
}