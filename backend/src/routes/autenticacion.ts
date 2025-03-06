import { Router } from 'express';
import { autenticarUsuario } from '../controllers/autenticacionController';

const router = Router();

router.post('/login', autenticarUsuario);

export default router;
