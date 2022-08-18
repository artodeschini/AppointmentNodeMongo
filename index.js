const mongoose =  require('mongoose');

mongoose.connect('mongodb://localhost:27017/agendamentos');
// mongoose.connect(
//     'mongodb://localhost:27017/agendamentos',
//     {userNewUrlParser: true, useUniedTopology: true
// });