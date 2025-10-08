import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';
import 'dotenv/config';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import connectDB from './config/database';
import { appConfig } from './config/env';
import { errorHandler } from './middleware/errorHandler';
import authRouter from './routes/auth.routes';
import userRoutes from './routes/user.routes';

const corsOptions: CorsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors(corsOptions));
app.use(limiter);

app.get('/', (req, res) => {
    res.send({ message: '¡El backend está funcionando!' });
});

app.use('/api/auth', authRouter);
app.use('/api/users', userRoutes);

app.use(errorHandler);

async function startServer() {
    await connectDB();
    app.listen(appConfig.PORT, () => {
        console.log(`Servidor escuchando en el puerto ${appConfig.PORT}`);
    });
}

startServer();
