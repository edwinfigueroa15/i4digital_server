import {Request, Response} from 'express'
import Record, { IRecord } from '../models/Record'

class RecordController {
    async getAll(_req: Request, res: Response) {
        try {
            const response: IRecord[] = await Record.findAll();
            if(!response) res.status(400).json({ msg: 'Lo siento no pudimos encontrar la informacion', type: 'error', data: [] })
            res.status(200).json({ msg: 'Todos los registros', type: 'success', data: response })
        
        } catch (error) {
            res.status(500).json({ msg: `Error de proceso: ${error}`, type: 'warning', data: [] })
        }
    }

    async getId(req: Request, res: Response) {
        const { id } = req.params
        try {
            const response: IRecord | null = await Record.findOne({ where: { id } });
            if(!response) res.status(400).json({ msg: 'El registro no existe', type: 'error', data: [] })
            res.status(200).json({ msg: 'Registro encontrado', type: 'success', data: response })
        
        } catch (error) {
            res.status(500).json({ msg: `Error de proceso: ${error}`, type: 'warning', data: [] })
        }
    }

    async add(req: Request, res: Response){
        const { body } = req
        try {
            const response: IRecord = await Record.create(body)
            res.status(200).json({ msg: 'Registro creado', type: 'success', data: response })
    
        } catch (error) {
            res.status(500).json({ msg: `Error de proceso: ${error}`, type: 'warning', data: [] })
        }
    }

    async update(req: Request, res: Response){
        const { params: { id }, body } = req
        try {
            await Record.update(body, { where: { id } })
            res.status(200).json({ msg: 'Se actualizo el registro', type: 'success', data: { id } })
    
        } catch (error) {
            res.status(500).json({ msg: `Error de proceso: ${error}`, type: 'warning', data: [] })
        }
    }

    async remove(req: Request, res: Response){
        const { id } = req.params
        try {
            await Record.destroy({ where: { id } })
            res.status(200).json({ msg: 'Registro eliminado permanentemente', type: 'success', data: { id } })
    
        } catch (error) {
            res.status(500).json({ msg: `Error de proceso: ${error}`, type: 'warning', data: [] })
        }
    }

    async exportRecords(req: Request, res: Response) {
        const { id } = req.params
        try {
            const response: IRecord | null = await Record.findOne({ where: { id } });
            if(!response) res.status(400).json({ msg: 'El registro no existe', type: 'error', data: [] })

            const dataArray = JSON.parse(response!.returned_data)

            res.status(200).json({ msg: 'Registros en Base64', type: 'success', data: [] })
        
        } catch (error) {
            res.status(500).json({ msg: `Error de proceso: ${error}`, type: 'warning', data: [] })
        }
    }
}

export default new RecordController()