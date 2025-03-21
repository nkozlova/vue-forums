const Base = require("./base.model.js");
const DBForum = require("./db/db.forum.model.js");

module.exports = class forumModel extends Base {
        async getForums() {
                return await (new DBForum()).getAll()
        }

        async addForum(title) {
                await (new DBForum()).addForum(title)
        }

        async deleteForum(id) {
                await (new DBForum()).deleteForum(id)
        }
}
