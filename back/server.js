const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MONGODB DATABASE CONNECTION ESTABLISHED SUCCESSFULLY");
})

const materiaisRouter = require('./routes/material');
const brandRouter = require('./routes/brand');

app.use('/material', materiaisRouter);
app.use('/brand', brandRouter);
app.use('/uploads', express.static('img'));

app.listen(port, () => {
    console.log(`Servidor na porta: ${port}`);
})