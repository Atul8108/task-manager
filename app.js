const app = require("./src/index");
const { cEnv } = require("./src/consts/env.const");

// Only bind the port when run directly (node app.js), not when imported by tests.
if (require.main === module) {
    app.listen(cEnv.PORT, (err) => {
        if (err) {
            return console.log("Something bad happened", err);
        }
        console.log(`Server is listening on ${cEnv.PORT}`);
    });
}

module.exports = app;
