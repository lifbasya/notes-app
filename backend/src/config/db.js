import mysql2 from "mysql2/promise";

export const pool = mysql2.createPool({
  host: "sql12.freesqldatabase.com",
  user: "sql12801498",
  password: "Pfwwbtg6zD",
  database: "sql12801498",
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Database connected succesfully!");
    connection.release();
  } catch (error) {
    console.error("database connection failed");
    throw error;
  }
};
