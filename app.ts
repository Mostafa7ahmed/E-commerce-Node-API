import express from 'express';
import dotenv from 'dotenv';
import dbConnection from './config/db';
import mountRoute from './routes';
import { Server } from 'http';
import cors from 'cors'
import compression from 'compression'
import mongoSanitize from 'express-mongo-sanitize'
import hpp from 'hpp';
import helmet from 'helmet';
import { I18n } from 'i18n';
import path from 'path';
import cookieParser from 'cookie-parser'
import csurf from 'csurf'

const app: express.Application = express()
app.use(express.json({limit: '3kb'}));
app.use(cors({
    origin: ['http://localhost:4200'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token', 'X-API-KEY'],
    credentials:true
}));
app.use(cookieParser());
// app.use(csurf({
//     cookie:{
//         httpOnly: true,
//         secure:true,
//         sameSite: 'strict'
//     }
// }))
app.use(express.static('uploads'));
dotenv.config()
app.use(compression())
app.use(mongoSanitize());
app.use(hpp({whitelist: ['price', 'category', 'subcategory']}))
app.use(helmet({ crossOriginResourcePolicy: { policy: 'same-origin' } }));
const i18n = new I18n({
    locales: ['en', 'ar'],
    directory: path.join(__dirname, 'locales'),
    defaultLocale: 'en',
    queryParameter: 'lang'
})
app.use(i18n.init)
dbConnection()

mountRoute(app)

let server: Server;


server = app.listen(process.env.PORT, () => {
    console.log(`Server listen on Port ${process.env.PORT}`)
});

process.on('unhandledRejection', (err: Error)=>{
    server.close(()=>{
        console.log(`unhandledRejection error: ${err.name} || ${err.message} `);
        process.exit(1)
    })
});
process.on('unhandledRejection', (err: Error) => {
    console.error(`unhandledRejection Error : ${err.name} | ${err.message}`);
    server.close(() => {
    console.error('Application is shutting down...')
    process.exit(1);
    });
});
