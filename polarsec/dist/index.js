"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_service_1 = require("./services/database.service");
const users_router_1 = require("./routes/users.router");
const port = 9001;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
(0, database_service_1.connectToDatabase)().then(() => {
    app.use(users_router_1.router);
    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });
})
    .catch((error) => {
    console.error("Database connection failed", error);
    process.exit();
});
