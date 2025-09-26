import { pool } from "../config/db.js";

export const deleteNoteByIdHandler = async (req, res) => {
    const { id } = req.params;

    const [deleteNote] = await pool.query(
        "DELETE FROM notes WHERE id = ?",
        [id]
    );

    if (deleteNote.affectedRows === 0) {
        return res.status(404).json({
            status: "fail",
            message: "Note not found",
        });
    }

    res.status(200).json({
        status: "success",
        message: "Note deleted successfully",
    });
}