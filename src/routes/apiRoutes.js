import { Router } from 'express';
import { registerApiRoutes } from './registerApiRoutes.js';

export function apiRoutes(oficina) { return registerApiRoutes(Router(), oficina); }
