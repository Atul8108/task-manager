const express = require('express');
const {cEnv} = require("./consts/env.const");


const app = express();

// Request logger
app.use((req, res, next) => {
    const startedAt = Date.now();
    res.on("finish", () => {
        if (cEnv.NODE_ENV !== "test") {
            console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - startedAt}ms`);
        }
    });
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Errors (must be last) ───────────────────────────────────────────────────
app.use(ErrorMiddleware.instance.notFound);
app.use(ErrorMiddleware.instance.handle);

app.listen(cEnv.PORT, (err) => {
    if (err) {
        return console.log("Something bad happened", err);
    }
    console.log(`Server is listening on ${cEnv.PORT}`);
});

module.exports = app;