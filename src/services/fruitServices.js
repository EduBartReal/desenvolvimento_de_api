import pool from '../database/fruitsDB.js';

class FruitServices {
    async getAllFruits() {
        const result = await pool.query('SELECT * FROM public."edu-bartellt_frutas"');
        return result.rows;
    }

    async getFruitById(id) {
        const result = await pool.query(
            'SELECT * FROM public."edu-bartellt_frutas" WHERE id = $1',
            [id]
        );
        return result.rows[0] || null;
    }

    async patchFruit(id, updatedFields) {
        const fields = Object.keys(updatedFields);
        const values = Object.values(updatedFields);

        const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(', ');
        const result = await pool.query(
            `UPDATE public."edu-bartellt_frutas" SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`,
            [...values, id]
        );
        return result.rows[0] || null;
    }

    async putFruit(id, newFruit) {
        const { id: _, ...fields } = newFruit;
        const result = await pool.query(
            `UPDATE public."edu-bartellt_frutas" SET name = $1, quantidade = $2 WHERE id = $3 RETURNING *`,
            [fields.name, fields.quantidade, id]
        );
        return result.rows[0] || null;
    }
}

export const fruitServices = new FruitServices();