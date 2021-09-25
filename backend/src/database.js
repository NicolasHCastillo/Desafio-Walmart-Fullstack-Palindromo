import mongoose from 'mongoose';
import appConfig from './config/index';

mongoose.connect(appConfig.DB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        auth: {
            authSource: 'admin'
        },
        user:'productListUser',
        pass:'productListPassword'
    },
    (err, res) => {
        if (err) console.log('Error al conectar a la base de datos');
        else console.log(`Conexión db: ${res.connection.name} `);
});
