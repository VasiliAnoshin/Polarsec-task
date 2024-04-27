import express from "express";
import bodyParser from 'body-parser';
import { connectToDatabase } from "./services/database.service"
import { router } from "./routes/users.router";

const port = 9001;
const app = express();
app.use(bodyParser.json());

connectToDatabase().then(() => {
    app.use(router);
    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });
})
.catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
});
