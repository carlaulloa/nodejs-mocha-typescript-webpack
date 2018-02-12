import { app } from '../app';
import * as supertest from 'supertest';

export const request = supertest.agent(app);