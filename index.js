import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from "./config.js";
import employeeRoutes from "./routes/employeeRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

/**
 * 這裡將/api 變成API路由的前綴
 */
app.use('/api', employeeRoutes.routes);


/**
 * 然後開始啟用ExpressJs服務
 */
app.listen(config.port, () => {
    console.log("Service endpoint= %s", config.url);
});
