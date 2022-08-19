const service = require('../service/AppointmentService');

class AppointmentController {

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

    async findAllAppointments(req, res) {
        let appointments = await service.getAll(false);
        res.json(appointments);
    }

    async getById(req, res) {
        let appointment = await service.getById(req.params.id);
        // console.log(appointment);
        res.render('details', {'data' : appointment});
    }

    async finished(req, res) {
        let id = req.body.id
        let result = await service.finishedById(id);
        if (result) {
            res.redirect('/');
        }
    }
}

module.exports = new AppointmentController();
