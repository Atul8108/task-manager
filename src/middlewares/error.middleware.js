const { eHttpStatusCode, eResponseStatus } = require("../enums/server.enum");
const { toErrorResponse } = require("../utils/common.util");

class ErrorMiddleware {
    static instance = new ErrorMiddleware();

    // Unknown routes
    notFound = (req, res) => {
        return res
            .status(eHttpStatusCode.NOT_FOUND)
            .json({ status: eResponseStatus.ERROR, message: `Route ${req.method} ${req.originalUrl} not found.` });
    };

    handle = (err, req, res, next) => {
        if (err.type === "entity.parse.failed") {
            return res
                .status(eHttpStatusCode.BAD_REQUEST)
                .json({ status: eResponseStatus.ERROR, message: "Invalid JSON payload." });
        }
        console.error(err);
        const error = toErrorResponse(err);
        return res.status(error.statusCode).json({ status: eResponseStatus.ERROR, message: error.message });
    };
}

module.exports = ErrorMiddleware;
