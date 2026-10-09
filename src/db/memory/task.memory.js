const seed = require("../../../task.json");

/** @typedef {import("../../interfaces/task.interface").iTask} iTask */
/** @typedef {import("../../interfaces/task.interface").iTaskInput} iTaskInput */

// Only these fields may come from input; id is always generated/kept by the db.
const pickFields = ({ title, description, completed }) => ({ title, description, completed });

// In-memory "database" for tasks. Plays the same role as a Mongo model in db/mongo/.
class TaskDb {
    static instance = new TaskDb();

    constructor() {
        /** @type {iTask[]} */
        this.tasks = seed.tasks.map((task) => ({ ...task }));
        this.nextId = this.tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1;
    }

    /** @param {{ completed?: boolean }} [filter] @returns {iTask[]} */
    find(filter = {}) {
        if (typeof filter.completed === "boolean") {
            return this.tasks.filter((task) => task.completed === filter.completed);
        }
        return this.tasks;
    }

    /** @param {number} id @returns {iTask | undefined} */
    findById(id) {
        return this.tasks.find((task) => task.id === id);
    }

    /** @param {iTaskInput} data @returns {iTask} */
    create(data) {
        const task = { id: this.nextId++, ...pickFields(data) };
        this.tasks.push(task);
        return task;
    }

    /** @param {number} id @param {iTaskInput} data @returns {iTask | null} */
    updateById(id, data) {
        const task = this.findById(id);
        if (!task) return null;
        Object.assign(task, pickFields(data));
        return task;
    }

    /** @param {number} id @returns {iTask | null} */
    deleteById(id) {
        const index = this.tasks.findIndex((task) => task.id === id);
        if (index === -1) return null;
        return this.tasks.splice(index, 1)[0];
    }
}

module.exports = TaskDb;
