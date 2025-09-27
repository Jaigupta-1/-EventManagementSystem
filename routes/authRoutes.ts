import {Request,Response} from "express";
import { Router } from "express";
import AuthController from "../controllers/authController";
const router = Router();

router.post("/signup",(req:Request,res:Response)=>{
  AuthController.signup(req,res);
});

router.post("/login",(req:Request,res:Response)=>{
  AuthController.login(req,res);
});

router.get("/profile",(req:Request,res:Response)=>{
  AuthController.profile(req,res);
})

export default router;