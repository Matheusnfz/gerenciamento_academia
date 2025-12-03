const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/presencaController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, ctrl.create); // qualquer usuário autenticado pode registrar presença
router.get('/', auth, ctrl.list);
router.get('/:id', auth, ctrl.get);
router.delete('/:id', auth, ctrl.remove);

module.exports = router;
