const eResponseStatus = Object.freeze({
    SUCCESS: "success",
    ERROR: "error",
});

const eHttpStatusCode = Object.freeze({
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
});

module.exports = { eResponseStatus, eHttpStatusCode };
