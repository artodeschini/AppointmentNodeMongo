const service = require('../service/AppointmentService');

class AgendamentoController {

    async index(req, res) {
        res.render('index');
    }

    async open(req, res) {
        res.render('create');
    }

    async create(req, res) {
        let status = await service.create(
            req.body.name,
            req.body.email,
            req.body.description,
            req.body.cpf,
            req.body.date,
            req.body.time
        )

        if (status) {
            res.redirect('/');
        } else {
            res.send('Ocorreu uma falha');
        }
    }
}

module.exports = new AgendamentoController();