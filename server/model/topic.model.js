const Base = require("./base.model.js");
const DBTopics = require("./db/db.topic.model.js");

module.exports = class topicModel extends Base {
        async getTopicsForForum(forum_id) {
                return await (new DBTopics()).getAllForForum(forum_id)
        }

        async addTopic(title, forum_id) {
                await (new DBTopics()).addTopicToForum(title, forum_id)
        }

        async deleteTopic(id) {
                await (new DBTopics()).deleteTopic(id)
        }
}
