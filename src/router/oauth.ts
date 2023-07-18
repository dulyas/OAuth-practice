import { Router } from "express";
import { authorize, token, getUserInfoAuth } from "@/controllers/OAuth";
import authenticate from "@/middleware/authenticate";

const router = Router();

router.get("/authorize", authorize);
router.post("/token", token);
router.get("/authenticate", authenticate, getUserInfoAuth);

export default router;
