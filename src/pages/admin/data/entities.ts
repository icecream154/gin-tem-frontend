export type AdminEntity = {
    name: string
    description: string
    adminUrl: string
}

export const allEntities: AdminEntity[] = [
]

export function fetchCurrType(): AdminEntity {
    for (let i = 0; i < allEntities.length; i++) {
        if (window.location.pathname.indexOf(allEntities[i].adminUrl) >= 0) {
            return allEntities[i];
        }
    }
    return allEntities[0]
}