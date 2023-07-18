import { Router } from "express";
import oauth from "./oauth";
import user from "./user";

const router = Router();

router.use("/oauth", oauth);
router.use("/user", user);

export default router;
