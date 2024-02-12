const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connect')
require('dotenv').config();

//router
const productRouter = require('./routers/productRouter');

//middleware and controller
const NotFound = require('./middleware/NotFound');
const errorHandlerMiddleware = require('./middleware/ErrorHandlerMiddleware');

const port = process.env.PORT || 4000

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/product',productRouter);

app.use(NotFound);
app.use(errorHandlerMiddleware);



const start = () => {
    try{
        connectDB();
     app.listen(port,()=>{console.log(`server running on ${port}...`)})
    }catch(error){
        console.log(error);
    }
}

start();