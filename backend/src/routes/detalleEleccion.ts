import { Router } from 'express';
import { obtenerDetalleEleccion } from '../controllers/detalleEleccionController';

const router = Router();

router.get('/:id', obtenerDetalleEleccion);

export default router;
