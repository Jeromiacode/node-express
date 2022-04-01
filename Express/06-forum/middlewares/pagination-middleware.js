const defaultPagination = {
    defaultLimit: 20,
    maxLimit: 50
}
/**
 * 
 * @param {defaultLimit: number?, maxLimit: number?} options 
 * @returns 
 */
const pagination = (options) => {
    // Si on rajoute rien, il prends les valeurs de defaultPagination, sinon il écrase ces données avec celles passées en options
    const {defaultLimit, maxLimit} = {...defaultPagination, ...options}
    return (req, res, next) => {
        const userOffset = parseInt(req.query.offset);
        const userLimit = parseInt(req.query.limit);
        const offset = !isNaN(userOffset) && userOffset > 0 ? parseInt(userOffset) : 0;
        // Math.min(nb reçu, valeur retournée si nb reç est plus grand) : set la valeur maximum en 2eme paramettre
        const limit = !isNaN(userLimit) && userLimit > 0 ? Math.min(parseInt(userLimit), maxLimit) : defaultLimit;

        req.pagination = { offset, limit };
        next();
    };
};
// to : app.js
module.exports = pagination;