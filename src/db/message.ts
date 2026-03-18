import type { MessageDetail } from "../types.js";
import pool from "./pool.js";

export const createMessage = async (user_id: number, title: string, message: string) => {
    const { rows } = await pool.query<{id: number}>(`
        INSERT INTO public.message (user_id, title, message)
        VALUES ($1, $2, $3)
        RETURNING id;
    `, [user_id, title, message]);
    return rows[0]?.id;
}

export const getAllMessages = async () => {
    const { rows } = await pool.query<MessageDetail>(`
        SELECT 
            public.message.id,
            public.user.id AS poster_id,
            public.user.first_name AS poster_first_name,
            public.user.last_name AS poster_last_name,
            public.message.title,
            public.message.message,
            public.message.timestamp
        FROM public.message
            INNER JOIN public.user 
                ON public.user.id = public.message.user_id;
    `);
    return rows;
}