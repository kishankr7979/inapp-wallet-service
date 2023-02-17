import {dbConfig} from '../config/index.js'
import {v4 as uuidv4} from 'uuid';
import {errorResponseTemplate} from "../utils/index.js";

const updateLedger = async (req, res, user_id, operation, payment_method, amount) => {
    const sql = dbConfig();
    try {
        const transaction_id = uuidv4();
        await sql`insert into wallet_ledger(transaction_id, user_id, operation, payment_method, amount) values(
        ${transaction_id},
        ${user_id},
        ${operation},
        ${payment_method},
        ${amount}
)`
    } catch (error) {
        return errorResponseTemplate(res, {message: 'operation unsuccessfull'});
    }

}
export default updateLedger;