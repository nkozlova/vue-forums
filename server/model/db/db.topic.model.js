const DB = require("./db.model.js");

module.exports = class DbTopic extends DB {
        constructor() {
                super();
                this.fields = ["id", "title", "forum_id"]
                this.updateFields = []
                this.table = "topics"
        }

        async getAllForForum(forum_id) {
                return await this.select(`SELECT * FROM ${this.table} WHERE (${this.fields[2]} = ${forum_id})`)
        }

        async addTopicToForum(title, forum_id) {
                await this.insert(`INSERT INTO ${this.table} (${this.fields[1]}, ${this.fields[2]}) VALUES ('${title}', ${forum_id})`)
        }

        async deleteTopic(id) {
                await this.dosql(`DELETE FROM ${this.table} WHERE (${this.fields[0]}='${id}')`)
        }
}
