import { Router } from 'express'
import RecordController from '../controllers/RecordController'

const router = Router()

// USAR ANTES /api/record
// http://localhost:4000/api/record

router.get('/', RecordController.getAll)
router.post('/', RecordController.add)
router.put('/:id', RecordController.update)
router.delete('/:id', RecordController.remove)

export default router