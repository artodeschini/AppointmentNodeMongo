const AppointmentModel = require('../model/Appointment');
const AppointmentFactory = require('../factory/AppointmentFactory');
const mongoose = require('mongoose');
const mailer = require('nodemailer');

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
            finished: false,
            notified: false
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

    async sendNotification() {
        let now = new Date();
        const oneHour = 1000 * 60 * 60;

        let transporter = mailer.createTransport({
            //host: 'smtp://smtp.mailtrap.io',
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: '5228b8de4c680f',
                pass: '98baf81f6651db'
            }
        });
        
        // agendamentos do dia
        // let models = await Appointment.find({
        //     date : {
        //         $gte: new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0),
        //         $lt: new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59, 0)
        //     }
        // });
        let models = await Appointment.find();
        // let appointments = [];

        console.log(models);
        
        models.forEach(async a => {
            if (!a.notified) {
                let m = AppointmentFactory.build(a);
                let date = m.start;
                let gap = date - now;

                if (gap <= oneHour) {
                    console.log(a);
                    console.log('send notification');

                    // curl --ssl-reqd \
                    // --url 'smtp://smtp.mailtrap.io:2525' \
                    // --user '5228b8de4c680f:98baf81f6651db' \
                    // --mail-from from@example.com \
                    // --mail-rcpt to@example.com \

                    transporter.sendMail({
                        from: 'Artur Todeschini <artodeschini@yahoo.com.br>',
                        to: a.email,
                        subject: `Sua Consulta ${a.description} irá acontecer em 1h`,
                        text: `Ola ${a.nome} a sua nsulta ${a.description} irá acontecer hoje`
                    }).then(() => {
                        Appointment.findByIdAndUpdate(a._id).update({
                            notified: true
                        })
                    }).catch(error => {
                        console.log(error);
                    });
                }   
            }        
        });
    }
}

module.exports = new AppointmentService();
