var models  = require('./../models');

module.exports.addEntry = (req, res, next) => {
    models.entry.create(req.body).then(result => {
        return res.status(200).json(result)
    }).catch(next)
}

module.exports.getEntries = (req, res, next) => {
    models.entry.findAll({
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(results => {
        return res.status(200).json(results)
    }).catch(next)
}