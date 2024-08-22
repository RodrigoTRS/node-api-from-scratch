import pg from "pg"

export class PGClient {
    static _user = "docker"
    static _password = "docker"
    static _host = "localhost"
    static _port = 5432
    static _database = "scratchapi"

    static async execute(query, value = null) {
        const client = new pg.Client({
            user: this._user,
            password: this._password,
            host: this._host,
            port: this._port,
            database: this._database
        })

        await client.connect()

        try {
            const data = await client.query(query, value)
            return data
        } catch (err) {
            console.error(err)
        } finally {
            await client.end()
        }
    }
}