const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/pagamentoController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

router.post('/', auth, role('recepcao'), ctrl.create);
router.get('/', auth, ctrl.list);
router.get('/:id', auth, ctrl.get);
router.delete('/:id', auth, role('admin'), ctrl.remove);

module.exports = router;
