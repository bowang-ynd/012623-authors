const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors(), express.json());

const connectDB = require('./config/mongoose.config');
connectDB();

const productRouter = require('./routes/author.routes');
app.use('/api/authors', productRouter);

const port = 8000;
app.listen(port, () => console.log(`The server is loaded on port ${port}`));

