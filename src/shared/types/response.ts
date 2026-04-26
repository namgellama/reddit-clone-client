export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    skip: number;
    limit: number;
    has_more: boolean;
}
