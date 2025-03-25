const forumModel = require('../model/forum.model');

module.exports = class forumController {
    getModel() { return new forumModel }

    // Список всех форумов
    async getForums(res) {
        const forum = this.getModel()
        forum.result(res, async () => await forum.getForums());
    }

    // Добавление нового, передается название
    async addForum(req, res) {
        const forum = this.getModel()
        const title = req.body.title
        if (!title)
            forum.error("Incorrect title!")

        forum.result(res, async () => await forum.addForum(title));
    }

    // Удаление форума по id
    async deleteForum(req, res) {
        const forum = this.getModel()
        const id = req.params.id
        if (!id)
            forum.error("Incorrect id!")

        forum.result(res, async () => await forum.deleteForum(id));
    }

    // Редактирование форума по id
    async editForum(req, res) {
        const forum = this.getModel()
        const id = req.params.id
        if (!id)
            forum.error("Incorrect id!")
        const title = req.body.title
        if (!title)
            forum.error("Incorrect title!")

        forum.result(res, async () => await forum.editForum(id, title));
    }
}
