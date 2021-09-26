export interface Paginate{
    total?: number;
    limit?: number;
    totalPages?: number;
    currentPage?: number;
    pagingCounter?: number;
    hasPrevPage?: boolean;
    hasNextPage?: boolean;
    prevPage?: number;
    nextPage?: number;
}