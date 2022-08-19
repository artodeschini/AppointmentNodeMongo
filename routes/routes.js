const express = require("express")
const app = express();
const router = express.Router();
const AppointmentController = require('../controllers/AppointmentController');

router.get('/', AppointmentController.index);
router.get('/cadastro', AppointmentController.open);
router.post('/cadastro', AppointmentController.create);
router.get('/findAll', AppointmentController.findAllAppointments);
router.get('/event/:id', AppointmentController.getById); 
router.post('/finished', AppointmentController.finished);
router.get('/list', AppointmentController.list);
router.get('/search', AppointmentController.search);

module.exports = router;
