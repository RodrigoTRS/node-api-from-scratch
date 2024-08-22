import { PGClient } from "../lib/pg-client.js"

export class TasksRepository {
    static _tableName = "tasks"

    static async fetchAll() {
        const response = await PGClient.execute(`
            SELECT * FROM ${this._tableName}
        `)
        return response
    }

    static async create({ title, description }) {
        const values = [title, description]
        const response = await PGClient.execute(`
            INSERT INTO ${this._tableName}(title, description)
            VALUES ($1, $2)
            RETURNING *
        `, values)
        return response
    }

    static async update(id, { title, description }) {
        const updatedAt = new Date()
        const values = [title, description, updatedAt, id]
        const response = await PGClient.execute(`
            UPDATE ${this._tableName}
            SET title = $1, description = $2, updated_at = $3
            WHERE id = $4
            RETURNING *
        `, values)
        return response
    }

    static async remove(id) {
        const values = [id]
        const response = await PGClient.execute(`
            DELETE FROM ${this._tableName}
            WHERE id = $1
            RETURNING *
        `, values)
        return response
    }

    static async toggleCompletion(id) {
        const currentDate = new Date()
        const values = [id, currentDate]
        const response = await PGClient.execute(`
            UPDATE ${this._tableName}
            SET
                updated_at = $2,
                completed_at = CASE
                    WHEN completed_at IS NULL THEN NOW()
                    ELSE NULL
                END
            WHERE id = $1
            RETURNING *
        `, values)
        return response
    }
}