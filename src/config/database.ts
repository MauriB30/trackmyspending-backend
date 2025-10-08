import mongoose, { ConnectOptions } from 'mongoose';
import { appConfig } from './env';

const clientOptions: ConnectOptions = {
    serverApi: { version: '1', strict: true, deprecationErrors: true },
    dbName: 'trackmyspending-db',
    appName: 'TrackMySpending',
};

const connectDB = async () => {
    try {
        const mongoURI = appConfig.MONGO_URI;

        if (!mongoURI) {
            throw new Error(
                'La variable de entorno MONGO_URI no está definida.'
            );
        }

        await mongoose.connect(mongoURI, clientOptions);
        console.log('MongoDB se ha conectado exitosamente.');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;
