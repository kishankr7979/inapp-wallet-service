import {errorResponseTemplate} from "../utils/index.js";
import dotenv from 'dotenv';
const validateAuth = (req, res, next) => {
    dotenv.config();
    const {SERVICE_API_KEY} = process.env;
    const {api_key} = req.headers;
    if(!api_key) return errorResponseTemplate(res, 'Authentication failed, API key required', 401);
    if(api_key === SERVICE_API_KEY) next();
    else return errorResponseTemplate(res, 'Authentication is required', 401);
}
export default validateAuth;