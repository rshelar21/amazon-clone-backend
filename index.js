const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');
const db = require('./config/mongoDB')
require('dotenv').config({ path: '.env'});
const userRouter = require('./routes/user');
const cookieParser = require('cookie-parser')
const productRouter = require('./routes/product')
const webhookController = require('./routes/webhook')
const orderRouter = require('./routes/orderHistory')


app.use(cors());
app.use(express.json());    // To parse the incoming requests with JSON payloads
app.use(express.urlencoded({ extended: false })); // To parse the incoming requests with urlencoded payloads
app.use(cookieParser())

app.use("/api", userRouter)
app.use("/create-checkout-session", productRouter)
app.use("/api/webhook", webhookController)
app.use('/orders', orderRouter)



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})