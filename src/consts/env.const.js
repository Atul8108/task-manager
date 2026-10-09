const cEnv = Object.freeze({
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: Number(process.env.PORT) || 3000,
});

module.exports = { cEnv };
