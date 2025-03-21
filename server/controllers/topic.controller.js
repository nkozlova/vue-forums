const topicModel = require('../model/topic.model');

module.exports = class topicController {
    getModel() { return new topicModel }

    // Список всех топиков для конкретного форума
    async getTopicsForForum(req, res) {
        let topic = this.getModel()
        let forum_id = req.params.forum_id
        if (!forum_id)
            topic.error("Incorrect forum_id!")

        topic.result(res, async () => await topic.getTopicsForForum(forum_id));
    }

    // Добавление нового, передается название и id форума
    async addTopic(req, res) {
        let topic = this.getModel()
        let forum_id = req.params.forum_id
        if (!forum_id)
            topic.error("Incorrect forum_id!")
        let title = req.body.title
        if (!title)
            topic.error("Incorrect title!")

        topic.result(res, async () => await topic.addTopic(title, forum_id));
    }

    // Удаление топика по id
    async deleteTopic(req, res) {
        let topic = this.getModel()
        let id = req.params.id
        if (!id)
            topic.error("Incorrect id!")

        topic.result(res, async () => await topic.deleteTopic(id));
    }
}
