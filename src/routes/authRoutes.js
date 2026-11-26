import { Router } from 'express';
import { registerAuthRoutes } from './registerAuthRoutes.js';

export function authRoutes(authService) { return registerAuthRoutes(Router(), authService); }
