import { Router } from 'express'
import RecordController from '../controllers/RecordController'

const router = Router()

// USAR ANTES /api/record
// http://localhost:4000/api/record

router.get('/', RecordController.getAll)
router.get('/:id', RecordController.getId)
router.post('/', RecordController.add)
router.put('/:id', RecordController.update)
router.delete('/:id', RecordController.remove)
router.get('/exportRecords/:id', RecordController.exportRecords)

export default router