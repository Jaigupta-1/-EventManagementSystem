import {Request,Response} from "express";
import User from "../models/user";
import { Transaction } from "sequelize";
import bcrypt from "bcrypt";
import sequelize from "../config/database";
import RedisUtil from "../utils/redis.helper";
// import jwt from "jsonwebtoken";
class AuthController{
    public async login(req: Request, res: Response) {
        const { email, password } = req.body;
        if (!email || !password) {
          return res.status(400).json({
            status: 0,
            error: {
              code: "BAD_REQUEST",
              message: "Please fill all required fields",
            },
          });
        }
    
        try {
          const user = await User.findOne({ where: { email } });
          if (!user) {
            return res.status(404).json({
              status: 0,
              error: {
                code: "USER_NOT_FOUND",
                message: "User not found",
              },
            });
          }
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return res.status(401).json({
              status: 0,
              error: {
                code: "INVALID_PASSWORD",
                message: "Incorrect password",
              },
            });
          }
    
          // Generate JWT
        //   const token = jwt.sign(
        //     { id: user.id, email: user.email, role: user.role },
        //     process.env.JWT_SECRET || "Jai$12345",
        //     { expiresIn: "1d" }
        //   );
    
          res.status(200).json({
            status: 1,
            message: "Login successful"
          });
        } catch (e: any) {
          res.status(500).json({
            status: 0,
            error: {
              code: "SERVER_ERROR",
              message: e.message || "Something went wrong",
            },
          });
        }
      }
      public async signup(req: Request, res: Response) {
        const { name, email, password,role} = req.body;
    
        // Validate required fields
        if (!name || !email || !password) {
          return res.status(400).json({
            status: 0,
            error: {
              code: "BAD_REQUEST",
              message: "Please fill all required fields",
            },
          });
        }
    
        const transaction: Transaction = await sequelize.transaction();
        try {
            
          const isAdminCreated = await this.getCacheKeyForAdmin("IsAdminExist");
          const userRole = isAdminCreated ? role:"admin";
          const hashedPassword = await bcrypt.hash(password, 10);
            
          await User.create(
            {
              name,
              email,
              password: hashedPassword,
              userRole
            },
            {
              transaction,
              fields: ["name", "email", "password","role"],
            }
          );
    
          await transaction.commit();
          
          res.status(201).json({
            status: 1,
            message: "User registered successfully",
          });
        } catch (e: any) {
          await transaction.rollback();
          res.status(500).json({
            status: 0,
            error: {
              code: "DB_ERROR",
              message: e.message || "Something went wrong",
            },
          });
        }
      }
    
    public profile(req:Request,res:Response){
        try{

        }
        catch(e){
            res.status(200).send(e);
        }
    }
    private async getCacheKeyForAdmin(key){
        const value = await RedisUtil.getCache(key);
        if(!value){
            const user =await User.findAll({
                where:{}
              });
            if(user.length==0){
                await RedisUtil.setCache(key,"1");
                return false;
            }
            else
            {
                await RedisUtil.setCache(key,"1");
                return true;
            }    
        }
        return value=="1"?true:false;

    }
}
export default new AuthController();