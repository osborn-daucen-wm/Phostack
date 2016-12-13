module.exports = function (req, res, next) {
    if (req.headers.authorization === 'My6fXH16') {
        next();
    } else {
        return res.forbidden('No valid Authorize header passed.');
    }
};
