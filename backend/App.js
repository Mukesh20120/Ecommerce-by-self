const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connect')
const cookieParser = require('cookie-parser')
require('dotenv').config();

//router
const productRouter = require('./routers/productRouter');
const userRouter = require('./routers/userRouter');

//middleware and controller
const NotFound = require('./middleware/NotFound');
const errorHandlerMiddleware = require('./middleware/ErrorHandlerMiddleware');

const port = process.env.PORT || 4000

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors());

app.use('/api/v1/product',productRouter);
app.use('/api/v1/user',userRouter);

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