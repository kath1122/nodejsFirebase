import db from "../db.js";
import {collection, doc, addDoc, deleteDoc, getDocs, getDoc, runTransaction} from "firebase/firestore";

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
            console.log(itemSnap.id);
            let item = itemSnap.data();
            item.id = itemSnap.id
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


export const updateEmployee = async (req, res, next) => {
    try {
        // 從 request 的參數部分 取得 id
        const id = req.params.id;
        console.log("Updating employee= %s", id);

        await runTransaction(db, async (transaction) => {
            const docRef = doc(db, "employees", id);
            const sfDoc = await transaction.get(docRef);

            if (!sfDoc.exists()) {
                throw "Document does not exist!";
            }
            // 從 body 給的內容全部更新！
            console.log(req.body)
            transaction.update(docRef, req.body);
        });
        res.status(200).json({ message: "Transaction successfully committed!" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteEmployee = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log("Deleting employee= %s", id);

        await deleteDoc(doc(db, "employees", id));
        res.status(204).json({ message: "Record deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
