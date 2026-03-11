import type { User, UserAddInterface } from "../types.js";
import pool from "./pool.js";

export const getUserCountWithNameCombo = async (first_name: string, last_name: string) => {
    const {rows}  = await pool.query<{count: number}>(`
        SELECT COUNT(*)
        FROM public.user 
        WHERE LOWER(first_name) = LOWER($1) AND LOWER(last_name) = LOWER($2);`,
        [first_name, last_name]
    );

    return rows[0]?.count ?? 0;
}

export const getUserWithNameCombo = async (first_name: string, last_name: string) => {
    const { rows }  = await pool.query<User>(`
        SELECT *
        FROM public.user 
        WHERE LOWER(first_name) = LOWER($1) AND LOWER(last_name) = LOWER($2);`,
        [first_name, last_name]
    );

    return rows[0];
}

export const getUserWithId = async (id: number) => {
    const { rows }  = await pool.query<User>(`
        SELECT *
        FROM public.user 
        WHERE id = $1;`,
        [id]
    );

    return rows[0];
}

export const addNewUser = async (user: UserAddInterface) => {
    await pool.query(`
        INSERT INTO public.user (first_name, last_name, password)
        VALUES($1, $2, $3);
    `, [user.first_name, user.last_name, user.password]);
    
}