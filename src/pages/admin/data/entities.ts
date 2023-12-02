export type AdminEntity = {
    name: string
    description: string
    adminUrl: string
}

export const allEntities: AdminEntity[] = [
    {
        "name": "bank_order",
        "description": "银行流水",
        "adminUrl": "/admin/bankOrder",
    },
    {
        "name": "bank_account",
        "description": "银行账户",
        "adminUrl": "/admin/bankAccount",
    }
]

export function fetchCurrEntity(): AdminEntity {
    for (let i = 0; i < allEntities.length; i++) {
        if (window.location.pathname.indexOf(allEntities[i].adminUrl) >= 0) {
            return allEntities[i];
        }
    }
    return allEntities[0]
}