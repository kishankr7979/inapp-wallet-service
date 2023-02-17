import {dbConfig} from '../config/index.js'
import {errorResponseTemplate, successResponseTemplate} from "../utils/index.js";
import updateLedger from "./update-ledger.js";
const updateAccountBalance = async(req, res) => {
    const sql = dbConfig();
    const {balance} = req.body;
    const {user_id}  = req.params;
    const {type} = req.query;
    if(!balance) return errorResponseTemplate(res, 'balance is a required field', 501);
    if(!user_id) return errorResponseTemplate(res, 'user id is required', 501);
    if(!['CREDIT', 'DEBIT'].includes(type)) return errorResponseTemplate(res, 'type is required', 501);
    try {
        if(type === 'CREDIT'){
            const data = await sql`update wallet set active_balance = active_balance + ${balance} where user_id=${user_id} returning *`;
            await updateLedger(req, res, user_id, type, 'UPI', balance);
            return successResponseTemplate(res, {message: 'balance credited successfully', data});
        }
        else {
            try {
                const data = await sql`update wallet set active_balance = case when active_balance > ${balance} then active_balance - ${balance} end where user_id=${user_id} returning *`
                await updateLedger(req, res, user_id, type, '', balance);
                return successResponseTemplate(res, {message: 'balance debited successfully', data});
            }
            catch(error){
                return errorResponseTemplate(res, 'invalid amount');
            }
        }
    }
    catch(error){
        return errorResponseTemplate(res);
    }
}
export default updateAccountBalance;