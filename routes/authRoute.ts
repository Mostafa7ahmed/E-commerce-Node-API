import { Router } from "express";
import { forgetPassword, login, resetCode, signUp, VerifyResetCode } from "../controllers/auth";
import { loginValidator, restPasswordValidator, singUpValidator } from "../utils/validator/authValidator";



const authRoute:Router = Router()


authRoute.post('/login', loginValidator,login);
authRoute.post('/signup', singUpValidator,signUp);

authRoute.post('/forgetPassword', forgetPassword);
authRoute.post('/verify', VerifyResetCode);
authRoute.post('/restCode', restPasswordValidator, resetCode);





export default authRoute;