const DB = require("./db.model.js");

module.exports = class DbForum extends DB {
    constructor() {
        super();
        this.fields = ["id", "title"]
        this.updateFields = []
        this.table = "forums"
    }

    async getAll() {
        return await this.select(`SELECT * FROM ${this.table}`)
    }

    async addForum(title) {
        await this.insert(`INSERT INTO ${this.table} (${this.fields[1]}) VALUES ('${title}')`)
    }

    async deleteForum(id) {
        await this.dosql(`DELETE FROM ${this.table} WHERE (${this.fields[0]}='${id}')`)
    }

    async editForum(id, title) {
        await this.dosql(`UPDATE ${this.table} SET ${this.fields[1]} = '${title}' WHERE (${this.fields[0]}='${id}')`)
    }
}
