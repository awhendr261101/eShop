import { createPool } from "mysql2";

import { config } from "dotenv";
config();

let connection = createPool({
    host: process.env.HOSTDB,
    user: process.env.USERDB,
    password: process.env.DBPWD,
    database: process.env.DBNAME,
    multipleStatements: true,
    connectionLimit: 30
})

connection.on('connection', (pool)=>{
    if(!pool) throw new Error(
        `Could not connect to database, please try again later`
    ); 
})

connection.on('error', (err) => {
    console.error(`Error connecting to database: ${err.stack}`);
    process.exit(1);
})

export{
    connection
}