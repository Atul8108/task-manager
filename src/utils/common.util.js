const { eHttpStatusCode } = require("../enums/server.enum");

function toErrorResponse(err) {
    return {
        statusCode: err?.statusCode ?? eHttpStatusCode.INTERNAL_SERVER_ERROR,
        message: err?.message ?? "Internal server error.",
    };
}

module.exports = { toErrorResponse };
