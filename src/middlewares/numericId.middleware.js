const { eHttpStatusCode, eResponseStatus } = require("../enums/server.enum");

const NUMERIC_ID_PATTERN = /^[1-9]\d*$/;

class NumericIdMiddleware {
    static instance = new NumericIdMiddleware();

    validateParam = (req, res, next, value, name) => {
        if (!NUMERIC_ID_PATTERN.test(value)) {
            return res
                .status(eHttpStatusCode.BAD_REQUEST)
                .json({ status: eResponseStatus.ERROR, message: `Invalid ${name} provided.` });
        }
        next();
        return null;
    };
}

module.exports = NumericIdMiddleware;
