const AppointmentModel = require('../model/Appointment');
const AppointmentFactory = require('../factory/AppointmentFactory');
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

    async prepareAppointments(models) {
        let appointments = [];

        models.forEach(a => {
            if (a.date != undefined && a.time != undefined) {
                appointments.push(AppointmentFactory.build(a));
            }
        });

        return appointments;
    }


    async getAll(showFinished) {
        if (showFinished) {
            try {
                let models = await Appointment.find();
                let appointments = await this.prepareAppointments(models);

                return appointments;

            } catch (error) {
                console.log(error);
                
                return [];
            }
        } else {
            try {
                let models = await Appointment.find({'finished': false});
                let appointments = await this.prepareAppointments(models);
                
                return appointments;
            } catch (error) {
                console.log(error);
                
                return [];
            }
        }
    }

    async getById(id) {
        try {
            let appointment = await Appointment.findOne({'_id': id});
            return appointment;
        } catch (error) {
            console.log(error);
            return {_id: 0};
           
        }
    }

    async finishedById(id) {
        try {
            await Appointment.findByIdAndUpdate((id + ''), {'finished': true});
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async list() {
        try {
            return await Appointment.find();
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async search(param) {
        console.log(param)
        try {
            let appointments = await Appointment.find().or([
                {cpf: param},
                {name: param},
                {email: param}
            ]);
            
            return appointments;
        } catch (error) {
            console.log(error);
            
            return [];
        }
    }
}

module.exports = new AppointmentService();
