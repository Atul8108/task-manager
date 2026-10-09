const { eHttpStatusCode } = require("../enums/server.enum");

function toErrorResponse(err) {
    const statusCode = err?.statusCode ?? eHttpStatusCode.INTERNAL_SERVER_ERROR;
    // Only expose messages for client errors; hide internals on 5xx.
    const message = statusCode < 500 && err?.message ? err.message : "Internal server error.";
    return { statusCode, message };
}

module.exports = { toErrorResponse };
