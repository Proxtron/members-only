import pool from "./pool.js";

export const createMessage = async (user_id: number, title: string, message: string) => {
    const { rows } = await pool.query<{id: number}>(`
        INSERT INTO public.message (user_id, title, message)
        VALUES ($1, $2, $3)
        RETURNING id;
    `, [user_id, title, message]);
    return rows[0]?.id;
}