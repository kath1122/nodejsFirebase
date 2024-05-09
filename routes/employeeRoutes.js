import express from 'express';
import {
    addEmployee,
    getAllEmployees,
    getEmployee,
    deleteEmployee,
    updateEmployee,
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
 http://localhost:3000/api/employee
 **/
router.post("/employee", addEmployee);

/**
 此路由為Get, 讀取全部員工用
 http://localhost:3000/api/employees
 **/
router.get("/employees", getAllEmployees);

/**
 此路由為Get, 讀取特定員工用
 http://localhost:3000/api/employee
 **/
router.get("/employee/:id", getEmployee);

/**
 此路由為delete, 刪除特定員工用
 http://localhost:3000/api/employee
 **/
router.delete("/employee/:id", deleteEmployee);

/**
 此路由為put, 更新特定員工用
 http://localhost:3000/api/employee/xxxx_employee_id
 **/
router.put("/employee/:id", updateEmployee);

export default {
    routes: router
};
