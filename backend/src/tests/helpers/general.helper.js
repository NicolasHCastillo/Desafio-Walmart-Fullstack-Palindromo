import supertest from 'supertest';
import mongoose from 'mongoose';
import { app, server } from '../../index';

export const api = supertest(app);

export const REGEX_APPLICATION_JSON = /application\/json/;

export const closeOpenHandles = async() => {
    await server.close();
    await mongoose.connection.close();
};
