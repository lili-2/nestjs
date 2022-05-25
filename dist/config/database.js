"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
exports.default = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'sql_blog',
    entities: [(0, path_1.join)(__dirname, '../', '**/**.entity{.ts,.js}')],
    synchronize: true
};
//# sourceMappingURL=database.js.map