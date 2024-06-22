export interface PaginationLinks {
    first: string;
    last: string;
    prev: null;
    next: string;
}

export interface PaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    links: Link[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

interface Link {
    url: null | string;
    label: string;
    active: boolean;
}

export interface PaginationBase {
    links: PaginationLinks;
    meta: PaginationMeta;
}

export interface Pagination<T> extends PaginationBase {
    data: T[];
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
};
