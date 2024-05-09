import express from 'express';
import {
    addEmployee,
    getAllEmployees,
    getEmployee,
    // TODO 尚未完成，完成後才要打開
    // updateEmployee,
    // deleteEmployee
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
 此路由為Get, 讀取員工用
 http://localhost:3000/api/employee
 **/
router.get("/employees", getAllEmployees);

// TODO 尚未完成，完成後才要打開
// http://localhost:3000/api/employee/xxxx_employee_id
router.get("/employee/:id", getEmployee);

// TODO 尚未完成，完成後才要打開
// http://localhost:3000/api/employee/xxxx_employee_id
// router.put("/employee/:id", updateEmployee);

// TODO 尚未完成，完成後才要打開
// http://localhost:3000/api/employee/xxxx_employee_id
// router.delete("/employee/:id", deleteEmployee);

export default {
    routes: router
};
