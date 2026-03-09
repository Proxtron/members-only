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

export const addNewUser = async () => {

}