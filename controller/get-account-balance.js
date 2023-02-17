import {dbConfig} from '../config/index.js'
import {errorResponseTemplate, successResponseTemplate} from "../utils/index.js";
const getAccountBalance = async(req, res) => {
    const sql = dbConfig();
    const {user_id} = req.params;
    try {
        const data = await sql`select * from wallet where user_id = ${user_id}`;
        successResponseTemplate(res, data);
    }
    catch(error){
        console.log(error);
        errorResponseTemplate(res);
    }
}
export default getAccountBalance;