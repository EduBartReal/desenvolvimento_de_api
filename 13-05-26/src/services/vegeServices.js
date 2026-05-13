import pool from '../database/vegeDB.js';

class VegeServices {
    async getAllVegetais() {
        const result = await pool.query('SELECT * FROM vegetais');
        return result.rows;
    }

    async getVegetalById(id) {
        const result = await pool.query(
            'SELECT * FROM vegetais WHERE id = $1',
            [id]
        );
        return result.rows[0] || null;
    }

    async postVegetal(vegetal) {
        const { name, preco } = vegetal;
        const result = await pool.query(
            'INSERT INTO vegetais (name, preco) VALUES ($1, $2) RETURNING *',
            [name, preco]
        );
        return result.rows[0];
    }

    async patchVegetal(id, updatedFields) {
        const fields = Object.keys(updatedFields);
        const values = Object.values(updatedFields);
        const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(', ');
        const result = await pool.query(
            `UPDATE vegetais SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`,
            [...values, id]
        );
        return result.rows[0] || null;
    }

    async putVegetal(id, vegetal) {
        const { name, preco } = vegetal;
        const result = await pool.query(
            'UPDATE vegetais SET name = $1, preco = $2 WHERE id = $3 RETURNING *',
            [name, preco, id]
        );
        return result.rows[0] || null;
    }

    async deleteVegetal(id) {
        const result = await pool.query(
            'DELETE FROM vegetais WHERE id = $1 RETURNING *',
            [id]
        );
        return result.rows[0] || null;
    }
}

export const vegeServices = new VegeServices();