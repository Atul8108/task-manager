const {Router} = require('express');
const TaskController = require("../controllers/task.controller");
const NumericIdMiddleware = require("../middlewares/numericId.middleware");

class TaskRoutes {
    static instance = new TaskRoutes();

    constructor(){
        this.router = Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.param("id", NumericIdMiddleware.instance.validateParam);
        this.router.get("/", TaskController.instance.listTasks);
        this.router.get("/:id", TaskController.instance.getTask);
        this.router.post("/", TaskController.instance.createTask);
        this.router.put("/:id", TaskController.instance.updateTask);
        this.router.delete("/:id", TaskController.instance.deleteTask);
    }
}

module.exports = TaskRoutes;