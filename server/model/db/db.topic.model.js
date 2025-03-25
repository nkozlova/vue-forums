const DB = require("./db.model.js");

module.exports = class DbTopic extends DB {
    constructor() {
        super();
        this.fields = ["id", "title", "forum_id"]
        this.updateFields = []
        this.table = "topics"
    }

    async getAllForForum(forumId) {
        return await this.select(`SELECT * FROM ${this.table} WHERE (${this.fields[2]} = ${forumId})`)
    }

    async addTopicToForum(title, forumId) {
        await this.insert(`INSERT INTO ${this.table} (${this.fields[1]}, ${this.fields[2]}) VALUES ('${title}', ${forumId})`)
    }

    async deleteTopic(id) {
        await this.dosql(`DELETE FROM ${this.table} WHERE (${this.fields[0]}='${id}')`)
    }

    async editTopic(id, title) {
        await this.dosql(`UPDATE ${this.table} SET ${this.fields[1]} = '${title}' WHERE (${this.fields[0]}='${id}')`)
    }
}
