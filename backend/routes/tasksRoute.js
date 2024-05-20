const express =  require("express");
const { getTasks, createTask, getTaskById, updateTaskById, deleteTaskById } = require("../controllers/taskController");
const authGaurd = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/all").get(authGaurd,getTasks);
router.route("/create").post(authGaurd,createTask);
router.route("/:id").get(authGaurd,getTaskById).put(authGaurd,updateTaskById).delete(authGaurd,deleteTaskById)

module.exports= router;