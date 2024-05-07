import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from "./config.js";
import employeeRoutes from "./routes/employeeRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api', employeeRoutes.routes);

app.listen(config.port, () => {
    console.log("Service endpoint= %s", config.url);
});
