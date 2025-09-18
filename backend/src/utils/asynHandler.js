export const asyncHandler = (asyncFunction) => (req, res, next) => { 
    return Promise.resolve(asyncFunction(req, res, next))
        .catch(next);
}