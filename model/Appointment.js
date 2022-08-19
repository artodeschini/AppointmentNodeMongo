const mongoose =  require('mongoose');

const Appointment = new mongoose.Schema({

    name: String,
    email: String,
    description: String,
    cpf: String,
    date: {type: Date, default: Date.now},
    time: String,
    finished: Boolean
});

module.exports = Appointment;