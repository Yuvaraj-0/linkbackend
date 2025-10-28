import express from "express";
import { signup, signin } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", (req, res, next) => {
    console.log("📩 /signup route hit");
    next(); // passes control to the controller
  }, signup);
  
  router.post("/signin", (req, res, next) => {
    console.log("📩 /signin route hit");
    next(); // passes control to the controller
  }, signin);
export default router;
