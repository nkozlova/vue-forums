const topicModel = require('../model/topic.model');

module.exports = class topicController {
    getModel() { return new topicModel }

    // Список всех топиков для конкретного форума
    async getTopicsForForum(req, res) {
        const topic = this.getModel()
        const forumId = req.params.forum_id
        if (!forumId)
            topic.error("Incorrect forumId!")

        topic.result(res, async () => await topic.getTopicsForForum(forumId));
    }

    // Добавление нового, передается название и id форума
    async addTopic(req, res) {
        const topic = this.getModel()
        const forumId = req.params.forum_id
        if (!forumId)
            topic.error("Incorrect forumId!")
        const title = req.body.title
        if (!title)
            topic.error("Incorrect title!")

        topic.result(res, async () => await topic.addTopic(title, forumId));
    }

    // Удаление топика по id
    async deleteTopic(req, res) {
        const topic = this.getModel()
        const id = req.params.id
        if (!id)
            topic.error("Incorrect id!")

        topic.result(res, async () => await topic.deleteTopic(id));
    }

    // Редактирование топика по id
    async editTopic(req, res) {
        const topic = this.getModel()
        const id = req.params.id
        if (!id)
            topic.error("Incorrect id!")
        const title = req.body.title
        if (!title)
            topic.error("Incorrect title!")

        topic.result(res, async () => await topic.editTopic(id, title));
    }
}
