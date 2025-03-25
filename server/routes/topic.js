const topicC = require('../controllers/topic.controller');

let router = function (app) {
      app.post('/topics/getTopics/:forum_id', (req, res) => (new topicC).getTopicsForForum(req, res))
      app.post('/topics/add/:forum_id', (req, res) => (new topicC).addTopic(req, res))
      app.post("/topics/delete/:id", (req, res) => (new topicC).deleteTopic(req, res))
      app.post("/topics/edit/:id", (req, res) => (new topicC).editTopic(req, res))
}

module.exports = router;
