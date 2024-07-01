
require('dotenv').config()

const express = require('express')
const sequelize = require('./db')


const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path =require('path')


const port = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload());
app.use('/api', router);  // Использование роутера на пути /api
app.use(express.urlencoded({ extended: true }));

// Обработка ошибок, последний
app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(port, () => console.log(`Сервер запущен на порту ${port}`));
    } catch (e) {
        console.log(e);
    }
}

start();