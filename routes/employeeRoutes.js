import express from 'express';
import {
    addTask,
    getAllTasks,
    getTask,
    deleteTask,
    updateTask,
} from "../controllers/employeeController.js";

const router = express.Router();

/**
 此路由測試用expressJS有無正常運作
 http://localhost:3000/api/ 會得到 {message: 'Hello World'}
**/
router.get("/", (req, res, next) => {
    res.status(200).json({message: 'Hello World'});
});


/**
 此路由為Post, 增加員工用
 http://localhost:3000/api/task
 **/
router.post("/task", addTask);

/**
 此路由為Get, 讀取全部員工用
 http://localhost:3000/api/tasks
 **/
router.get("/tasks", getAllTasks);

/**
 此路由為Get, 讀取特定員工用
 http://localhost:3000/api/task
 **/
router.get("/task/:id", getTask);

/**
 此路由為delete, 刪除特定員工用
 http://localhost:3000/api/task
 **/
router.delete("/task/:id", deleteTask);

/**
 此路由為put, 更新特定員工用
 http://localhost:3000/api/task/xxxx_task_id
 **/
router.put("/task/:id", updateTask);

export default {
    routes: router
};
