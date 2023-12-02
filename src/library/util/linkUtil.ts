import {WindowParam} from "../context/WindowContext";

export function toLink(wp: WindowParam, link: string | undefined) {
    if (link) window.location.href = link;
}