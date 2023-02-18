import express from 'express';
import getAccountBalance from "../controller/get-account-balance.js";
import updateAccountBalance from "../controller/update-account-balance.js";
import getAccountLedger from "../controller/get-account-ledger.js";
import validateAuth from "../middleware/validate-auth.js";
import createAccount from "../controller/create-account.js";
const router = express.Router();

router.get('/account/:user_id', validateAuth, getAccountBalance)
router.post('/account/add/:user_id', validateAuth, createAccount);
router.post('/account/update/balance/:user_id', validateAuth, updateAccountBalance)
router.get('/account/ledger/:user_id', validateAuth, getAccountLedger)

export default router;