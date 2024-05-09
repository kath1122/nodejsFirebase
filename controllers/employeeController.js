import db from "../db.js";
import {collection, doc, addDoc, getDocs, getDoc} from "firebase/firestore";

// TODO
import Employee from "../models/employee.js";

export const addEmployee = async (req, res, next) => {
    try {
        console.log("Adding new employee");
        const data = req.body;

        // 去firebase取資料
        const docRef = await addDoc(collection(db, "employees"), data);
        console.log("Document written with ID: ", docRef.id);

        res.status(201).json({
            message: "Record saved successfully",
        });
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

export const getAllEmployees = async (req, res, next) => {
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

export const getEmployee = async (req, res, next) => {
    try {
        // 從 request 的參數部分 取得 id
        const id = req.params.id;
        console.log("Getting employee by Document ID = %s", id);
        const docRef = doc(db, "employees", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            res.status(200).json(docSnap.data());
        } else {
            // docSnap.data() will be undefined in this case
            res.status(404).json({ message: "No such document!" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


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
    addEmployee,
    getAllEmployees,
    getEmployee,
    // TODO
    // updateEmployee,
    // deleteEmployee
};
