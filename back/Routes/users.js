import express from "express";
import { getUsers, addUser, deleteUser, updateUser, getUserById } from "../Controllers/users.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/user/:id", getUserById);
router.post("/", addUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

export default router;
