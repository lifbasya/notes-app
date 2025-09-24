import { pool } from "../config/db.js";

export const addNoteHandler = async (req, res) => {
  const { title, content } = req.body;

  const [insertResult] = await pool.query(
    "INSERT INTO notes (title, content) VALUES (?, ?)",
    [title, content]
  );

  res.status(201).json({
    status: "success",
    message: "Note created",
  });
};

