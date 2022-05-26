import {Request, Response} from 'express'
import Record, { IRecord } from '../models/Record'
import Petition, { IPetition } from '../models/Petition'

class RecordController {
    async getAll(_req: Request, res: Response) {
        try {
            const response = await Record.findAll({
                attributes: { exclude: ['createdAt'] },
                include: { 
                    model: Petition,
                    attributes: { exclude: ['id'] }
                },
                order: [ ['createdAt', 'DESC'] ]
            });

            if(!response) res.status(400).json({ msg: 'Lo siento no pudimos encontrar la informacion', type: 'error', data: [] })
            res.status(200).json({ msg: 'Todos los registros', type: 'success', data: response })
        
        } catch (error) {
            res.status(500).json({ msg: `Error de proceso: ${error}`, type: 'warning', data: [] })
        }
    }

    async add(req: Request, res: Response){
        const { date, method, url, returned_data } = req.body
        try {
            const responsePetition = await Petition.create({ date, method, url })
            const responseRecord = await Record.create({ id_petition: responsePetition.id, returned_data })
            res.status(200).json({ msg: 'Registro creado', type: 'success', data: responseRecord })
    
        } catch (error) {
            res.status(500).json({ msg: `Error de proceso: ${error}`, type: 'warning', data: [] })
        }
    }

    async update(req: Request, res: Response){
        const { id } = req.params
        const { date, method, url, returned_data } = req.body

        try {
            await Petition.update({ date, method, url }, { where: { id } })
            await Record.update({ returned_data }, { where: { id_petition: id } })
            res.status(200).json({ msg: 'Se actualizo el registro', type: 'success', data: { id } })
    
        } catch (error) {
            res.status(500).json({ msg: `Error de proceso: ${error}`, type: 'warning', data: [] })
        }
    }

    async remove(req: Request, res: Response){
        const { id } = req.params
        try {
            const response = await Petition.destroy({ where: { id } })
            if(!response) res.status(400).json({ msg: 'El registro no existe', type: 'error', data: [] })
            res.status(200).json({ msg: 'Registro eliminado permanentemente', type: 'success', data: { id } })
    
        } catch (error) {
            res.status(500).json({ msg: `Error de proceso: ${error}`, type: 'warning', data: [] })
        }
    }
}

export default new RecordController()