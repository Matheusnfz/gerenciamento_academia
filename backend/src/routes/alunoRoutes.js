const express = require('express');
const router = express.Router();
const alunoCtrl = require('../controllers/alunoController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

router.post('/', auth, role('recepcao'), alunoCtrl.create);
router.get('/', auth, alunoCtrl.list);
router.get('/:id', auth, alunoCtrl.get);
router.put('/:id', auth, role('recepcao'), alunoCtrl.update);
router.delete('/:id', auth, role('admin'), alunoCtrl.remove);

module.exports = router;
