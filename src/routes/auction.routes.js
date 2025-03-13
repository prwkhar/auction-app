import { Router } from "express";
import { hostAuction, getAuctions, getAuction, placeBid } from "../controllers/auction.controller.js";
import { verifyJWT } from "../middlewares/auth.midlewares.js";

const router = Router();

router.route("/host").post(verifyJWT, hostAuction);
router.route("/").get(getAuctions);
router.route("/:id").get(getAuction);
router.route("/bid").post(verifyJWT, placeBid);

export default router;
