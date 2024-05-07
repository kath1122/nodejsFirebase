import db from "../db.js";
import {collection, addDoc, getDocs} from "firebase/firestore";

import Employee from "../models/employee.js";

// performing crud operations in the firebase firestore
// add
// get all
// get
// update
// delete
export const addEmployee = async (req, res, next) => {

    console.log('db', db);

    try {
        console.log("Adding new employee");
        const data = req.body;
        const docRef = await addDoc(collection(db, "employees"), data);
        console.log("Document written with ID: ", docRef.id);
        res.status(201).json({message: "Record saved successfully"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

export const getAllEmployees = async (req, res, next) => {
    // try {
    console.log("Getting all employees");

    const querySnapshot = await getDocs(collection(db, "employees"));

    const arr = [];
    if (querySnapshot.empty) {
        res.status(200).json({message: "No records found"});
    } else {
        querySnapshot.forEach(itemSnap => {
            const item = itemSnap.data();
            console.log({item});
            arr.push(item)
        })

        res.status(200).json({
            listing: arr,
            count: arr.length
        });
    }
}

// const getEmployee = async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         console.log("Getting employee= %s", id);
//         const employee = await fireStore.collection("employees").doc(id);
//         const data = await employee.get();
//         if (!data.exists) {
//             res.status(404).json({ message: "Record not found" });
//         } else {
//             res.status(200).json(data.data());
//         }
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };
// const updateEmployee = async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         console.log("Updating employee= %s", id);
//         const data = req.body;
//         const employee = await fireStore.collection("employees").doc(id);
//         await employee.update(data);
//         res.status(204).json({ message: "Record updated successfully" });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// const deleteEmployee = async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         console.log("Deleting employee= %s", id);
//         await fireStore.collection("employees").doc(id).delete();
//         res.status(204).json({ message: "Record deleted successfully" });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };
export default {
    addEmployee: addEmployee,
    getAllEmployees: getAllEmployees,
    // getEmployee,
    // updateEmployee,
    // deleteEmployee
};
