import {dbConfig} from '../config/index.js'
import {errorResponseTemplate, successResponseTemplate} from "../utils/index.js";

const getAccountLedger = async (req, res) => {
    const {user_id} = req.params;
    if(!user_id) return errorResponseTemplate(res, 'user id is required', 501);
    let {pageSize, pageNo} = req.query
    const pageLimit = pageSize || 10;
    let currPage = pageNo || 1;
    const sql = dbConfig();
    try {
        const data = await sql`select * from wallet_ledger where user_id=${user_id} ORDER BY created_at DESC LIMIT ${pageLimit} OFFSET ${(currPage - 1) * pageLimit}`
        return successResponseTemplate(res, data);

    } catch (error) {
        console.log(error);
        return errorResponseTemplate(res);
    }

}
export default getAccountLedger;