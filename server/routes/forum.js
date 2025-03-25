const forumC = require('../controllers/forum.controller');

let router = function (app) {
      app.post('/forums/getForums', (_, res) => (new forumC).getForums(res))
      app.post('/forums/add', (req, res) => (new forumC).addForum(req, res))
      app.post("/forums/delete/:id", (req, res) => (new forumC).deleteForum(req, res))
      app.post("/forums/edit/:id", (req, res) => (new forumC).editForum(req, res))

      app.get('', (_, res) => res.render('index'))
}

module.exports = router;
