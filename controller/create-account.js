import {dbConfig} from '../config/index.js'
import {errorResponseTemplate, successResponseTemplate} from "../utils/index.js";
const createAccount = async(req, res) => {
    const sql = dbConfig();
    const {user_id} = req.params;
    const {balance} = req.body;
    try {
        const data = await sql`insert into wallet(user_id, active_balance, currency) values(${user_id}, ${balance}, 'INR') returning *`;
        successResponseTemplate(res, data);
    }
    catch(error){
        console.log(error);
        errorResponseTemplate(res);
    }
}
export default createAccount;