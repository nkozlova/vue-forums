const Base = require("./base.model.js");
const DBTopics = require("./db/db.topic.model.js");

module.exports = class topicModel extends Base {
    async getTopicsForForum(forumId) {
        return await (new DBTopics()).getAllForForum(forumId)
    }

    async addTopic(title, forumId) {
        await (new DBTopics()).addTopicToForum(title, forumId)
    }

    async deleteTopic(id) {
        await (new DBTopics()).deleteTopic(id)
    }

    async editTopic(id, title) {
        await (new DBTopics()).editTopic(id, title)
    }
}
