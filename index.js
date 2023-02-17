import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import {successResponseTemplate} from "./utils/index.js";
import walletRoutes from "./routes/wallet.routes.js";
const app = express();
const PORT = 4000;

app.use(bodyParser(), cors({origin: '*'}));

app.get('/', (req, res) => {
    successResponseTemplate(res, {message: 'server is healthy and running'});
})

app.use('/wallet', walletRoutes)

app.listen(PORT, () => {
    console.log(`server listeing on port`, PORT);
})