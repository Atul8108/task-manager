const { cGlobal } = require("../consts/global.const");

// Plain-JS validator. Returns { error, value } like Joi's schema.validate().
class TaskValidator {
    static instance = new TaskValidator();

    validateTask(body) {
        const { title, description, completed } = body || {};

        if (typeof title !== "string" || title.trim() === "") {
            return { error: "\"title\" is required and must be a non-empty string." };
        }
        if (title.trim().length > cGlobal.TITLE_MAX_LENGTH) {
            return { error: `"title" must be at most ${cGlobal.TITLE_MAX_LENGTH} characters.` };
        }
        if (typeof description !== "string" || description.trim() === "") {
            return { error: "\"description\" is required and must be a non-empty string." };
        }
        if (description.trim().length > cGlobal.DESCRIPTION_MAX_LENGTH) {
            return { error: `"description" must be at most ${cGlobal.DESCRIPTION_MAX_LENGTH} characters.` };
        }
        if (typeof completed !== "boolean") {
            return { error: "\"completed\" is required and must be a boolean." };
        }

        return { value: { title: title.trim(), description: description.trim(), completed } };
    }

    validateListQuery(query) {
        const { completed } = query || {};
        if (completed === undefined) return { value: {} };
        if (completed !== "true" && completed !== "false") {
            return { error: "\"completed\" must be either \"true\" or \"false\"." };
        }
        return { value: { completed: completed === "true" } };
    }
}

module.exports = TaskValidator;