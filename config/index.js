import { createPool } from "mysql2";

import { config } from "dotenv";
config();

let connection = createPool({
    host: process.env.HOSTDB,
    user: process.env.USERDB,
    password: process.env.DBPWD,
    database: process.env.DBNAME,
    connectionLimit: 30,
    multipleStatements: true
})

// connection.on('connection', (err)=>{
//     if(err) throw new Error(
//         `Could not connect to database, please try again later`
//     ); 
// })

connection.on('error', (err) => {
    console.error(`Error connecting to database: ${err.stack}`);
    process.exit(1);
})

export{
    connection
}