import { Router } from "express";
import { createUser } from "@/controllers/user";

const router = Router();

router.use("/createUser", createUser);

export default router;
