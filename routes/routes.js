const express = require("express")
const app = express();
const router = express.Router();
const AgendamentoController = require('../controllers/AgendamentoController');

router.get('/', AgendamentoController.index);
router.get('/cadastro', AgendamentoController.open);
router.post('/create', AgendamentoController.create);

module.exports = router;
