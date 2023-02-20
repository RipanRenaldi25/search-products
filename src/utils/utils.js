export const uniqCategory = (duplicateCategories)=>{
    const category = duplicateCategories.map(value=>value.category);
    return [...new Set(category)];
}
export const getCategoryFromSearchParams = (query)=>{
    const queries = query.split(',');
    const trimmedQuery = queries.map((query)=>{
        return query.trim()
    })
    return trimmedQuery;
}