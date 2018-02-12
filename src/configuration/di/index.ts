import { initDI } from './di';
import * as db from '../db';
/*
  you should import index.ts from models, controllers and schemas directory
*/
const container = initDI.bind(null, { db });
export { container };