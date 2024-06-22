import { getItem, setItem } from "@/Utils/storage/index";
import type { PaginationMeta } from "@/types/index";

function getActualArray(meta: PaginationMeta) {
    const { ceil } = Math;
    const { total, per_page, current_page } = meta;

    const TOTAL_PAGES = ceil(total / per_page);
    const TOTAL_SAVES = [];

    // saved num bidimensinals array
    for (let index = 0; index < TOTAL_PAGES; index++) {
        TOTAL_SAVES.push([]);
    }

    return { arrays: TOTAL_SAVES, index: (current_page - 1) };
}

function setSelectedRows(key: string, meta: PaginationMeta, data: number[]) {
    const currentSelecteds = getItem(key) ?? [];
    // check if exist
    // setItem(key, [...new Set([...currentSelecteds, ...data])]);
    setItem(key, data);
    console.log(getItem(key));

}

function getSelectedRows(key: string, meta: PaginationMeta) {
    const currentSelecteds = getItem(key) ?? [];
    return currentSelecteds;
}

export { getSelectedRows, setSelectedRows }