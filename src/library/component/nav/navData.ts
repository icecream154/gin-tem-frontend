export type NavAddIcont = "CaretDownOutlined" | "DownOutlined"

export type NavLinkItem = {
    name: string,
    key: string,
    description?: string,
    link: string,
    selected?: boolean,
    onClick?: () => void,
    subItems: NavLinkItem[]
    addIcon?: NavAddIcont
}