const AppointmentModel = require('../model/Appointment');
const mongoose = require('mongoose');

const Appointment = mongoose.model('Appointment', AppointmentModel);

class AppointmentService {

    async create(name, email, description, cpf, date, time) {
        let doc = new Appointment({
            name,
            email,
            description,
            cpf,
            date,
            time,
            finished: false
        });

        try {
            await doc.save();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = new AppointmentService();
