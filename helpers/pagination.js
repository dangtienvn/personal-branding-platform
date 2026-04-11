module.exports = (query, countItems, options) => {
    const objectPagination = {
        currentPage: 1,
        limitItem: options.limitDefault || 4,
        skip: 0,
        totalPage: 0
    };

    if (query.page) {
        const page = parseInt(query.page);
        if (!isNaN(page) && page > 0) {
            objectPagination.currentPage = page;
        }
    }

    if (query.limit) {
        const limit = parseInt(query.limit);
        if (!isNaN(limit) && limit > 0) {
            objectPagination.limitItem = limit;
        }
    }

    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem;
    objectPagination.totalPage = Math.ceil(countItems / objectPagination.limitItem);

    // Pagination window logic
    const windowSize = options.windowSize || 5;
    let start = Math.max(1, objectPagination.currentPage - Math.floor(windowSize / 2));
    let end = Math.min(objectPagination.totalPage, start + windowSize - 1);

    if (end - start + 1 < windowSize) {
        start = Math.max(1, end - windowSize + 1);
    }

    objectPagination.pages = [];
    for (let i = start; i <= end; i++) {
        objectPagination.pages.push(i);
    }

    objectPagination.hasPrev = objectPagination.currentPage > 1;
    objectPagination.hasNext = objectPagination.currentPage < objectPagination.totalPage;
    objectPagination.prevPage = objectPagination.hasPrev ? objectPagination.currentPage - 1 : null;
    objectPagination.nextPage = objectPagination.hasNext ? objectPagination.currentPage + 1 : null;
    objectPagination.firstPage = 1;
    objectPagination.lastPage = objectPagination.totalPage;

    return objectPagination;
}
