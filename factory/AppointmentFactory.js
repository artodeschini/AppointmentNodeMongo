class AppointmentFactory {

    build(appointment) {

        let day = appointment.date.getUTCDate();
        let month = appointment.date.getUTCMonth();
        let year = appointment.date.getUTCFullYear();

        let time = appointment.time.split(':');
        let hour = Number.parseInt(time[0]);
        let minute = Number.parseInt(time[1]);

        let startDate = new Date(year, month, day, hour, minute, 0, 0);
        //ajuste gmt -3 horario de brasilia
        //startDate.setHours( startDate.getHours() -3);
        //let endDate = new Date(year, month, day, (hour + 1), minute, 0, 0);

        let a = {
            id: appointment._id,
            title: `${appointment.name} - ${appointment.description}`,
            start: startDate,
            end : startDate
        }

        return a;
    }
}

module.exports = new AppointmentFactory();
