"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// const { authenticateJwt, SECRET } = require("../middleware/index");
const middleware_1 = require("../middleware/");
const index_1 = require("../db/index");
// const { Todo } = require("../db");
const router = express_1.default.Router();
router.post("/todos", middleware_1.authenticateJwt, (req, res) => {
    const { title, description } = req.body;
    const done = false;
    const userId = req.headers["userId"];
    const newTodo = new index_1.Todo({ title, description, done, userId });
    newTodo
        .save()
        .then((savedTodo) => {
        res.status(201).json(savedTodo);
    })
        .catch((err) => {
        res.status(500).json({ error: "Failed to create a new todo" });
    });
});
router.get("/todos", middleware_1.authenticateJwt, (req, res) => {
    const userId = req.headers["userId"];
    index_1.Todo.find({ userId })
        .then((todos) => {
        res.json(todos);
    })
        .catch((err) => {
        res.status(500).json({ error: "Failed to retrieve todos" });
    });
});
router.patch("/todos/:todoId/done", middleware_1.authenticateJwt, (req, res) => {
    const { todoId } = req.params;
    const userId = req.headers["userId"];
    index_1.Todo.findOneAndUpdate({ _id: todoId, userId }, { done: true }, { new: true })
        .then((updatedTodo) => {
        if (!updatedTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.json(updatedTodo);
    })
        .catch((err) => {
        res.status(500).json({ error: "Failed to update todo" });
    });
});
module.exports = router;
// export default router;
// -`module.exports = mongoose.model('Todo', todoSchema); to ` -
//   `export default mongoose.model('Todo', todoSchema);`;
