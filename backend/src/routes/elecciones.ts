import { Router } from 'express';
import { obtenerElecciones } from '../controllers/eleccionesController';

const router = Router();

router.get('/', obtenerElecciones);

export default router;
