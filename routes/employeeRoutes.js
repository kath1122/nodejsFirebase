import express from 'express';
import {
    addEmployee,
    getAllEmployees,
    // getEmployee,
    // updateEmployee,
    // deleteEmployee
} from "../controllers/employeeController.js";

const router = express.Router();

router.get("/", (req, res, next)=>{
    try {
        res.status(200).json({message:'hello world'});
    } catch (error) {
        res.status(400).json({ message: 'error' });
    }
});

// http://localhost:3000/api/employee
router.post("/employee", addEmployee);

// http://localhost:3000/api/employees
router.get("/employees", getAllEmployees);

// http://localhost:3000/api/employee/xxxx_employee_id
// router.get("/employee/:id", getEmployee);

// http://localhost:3000/api/employee/xxxx_employee_id
// router.put("/employee/:id", updateEmployee);

// http://localhost:3000/api/employee/xxxx_employee_id
// router.delete("/employee/:id", deleteEmployee);

export default {
    routes: router
};
