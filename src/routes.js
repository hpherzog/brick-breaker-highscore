
module.exports.routes = [
    ['get', '/', require('./controllers/index').controller],
    ['get', '/scores/top10', require('./controllers/score/top10').controller],
    ['post', '/scores', require('./controllers/score/post').controller]
];
