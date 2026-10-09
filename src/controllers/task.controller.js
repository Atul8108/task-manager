const TaskDb = require("../db/memory/task.memory");
const TaskValidator = require("../validators/task.validator");
const { eHttpStatusCode, eResponseStatus } = require("../enums/server.enum");
const { toErrorResponse } = require("../utils/common.util");

const sendError = (res, statusCode, message) =>
    res.status(statusCode).json({ status: eResponseStatus.ERROR, message });

class TaskController {
    static instance = new TaskController();

    // GET /tasks?completed=true|false
    listTasks = (req, res) => {
        const { error, value } = TaskValidator.instance.validateListQuery(req.query);
        if (error) return sendError(res, eHttpStatusCode.BAD_REQUEST, error);

        try {
            const tasks = TaskDb.instance.find(value);
            return res.status(eHttpStatusCode.OK).json(tasks);
        } catch (err) {
            const e = toErrorResponse(err);
            return sendError(res, e.statusCode, e.message);
        }
    };

    // GET /tasks/:id
    getTask = (req, res) => {
        try {
            const task = TaskDb.instance.findById(Number(req.params.id));
            if (!task) return sendError(res, eHttpStatusCode.NOT_FOUND, "Task not found.");
            return res.status(eHttpStatusCode.OK).json(task);
        } catch (err) {
            const e = toErrorResponse(err);
            return sendError(res, e.statusCode, e.message);
        }
    };

    // POST /tasks
    createTask = (req, res) => {
        const { error, value } = TaskValidator.instance.validateTask(req.body);
        if (error) return sendError(res, eHttpStatusCode.BAD_REQUEST, error);

        try {
            const task = TaskDb.instance.create(value);
            return res.status(eHttpStatusCode.CREATED).json(task);
        } catch (err) {
            const e = toErrorResponse(err);
            return sendError(res, e.statusCode, e.message);
        }
    };

    // PUT /tasks/:id
    updateTask = (req, res) => {
        const id = Number(req.params.id);
        if (!TaskDb.instance.findById(id)) return sendError(res, eHttpStatusCode.NOT_FOUND, "Task not found.");

        const { error, value } = TaskValidator.instance.validateTask(req.body);
        if (error) return sendError(res, eHttpStatusCode.BAD_REQUEST, error);

        try {
            const task = TaskDb.instance.updateById(id, value);
            return res.status(eHttpStatusCode.OK).json(task);
        } catch (err) {
            const e = toErrorResponse(err);
            return sendError(res, e.statusCode, e.message);
        }
    };

    // DELETE /tasks/:id
    deleteTask = (req, res) => {
        try {
            const task = TaskDb.instance.deleteById(Number(req.params.id));
            if (!task) return sendError(res, eHttpStatusCode.NOT_FOUND, "Task not found.");
            return res.status(eHttpStatusCode.OK).json(task);
        } catch (err) {
            const e = toErrorResponse(err);
            return sendError(res, e.statusCode, e.message);
        }
    };
}

module.exports = TaskController;
