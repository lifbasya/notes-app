import { pool } from "../config/db.js";

export const updateNoteByIdHandler = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    await pool.query(
        "UPDATE notes SET title = ?, content = ? WHERE id = ?",
        [title, content, id]
    );

    if (!title || !title.trim()) {
        return res.status(400).json({
            status: "fail",
            message: "Title is required",
        });
    }

    if (!content || !content.trim()) {
        return res.status(400).json({
            status: "fail",
            message: "Content is required",
        });
    }

    const [notes] = await pool.query("SELECT * FROM notes WHERE id = ?", [id]);

    if (notes.length === 0) {
        return res.status(404).json({
            status: "fail",
            message: "Note not found",
        });
    }

    res.status(200).json({
        status: "success",
        message: `Note updated successfully`,
        data: notes[0],
    });
}