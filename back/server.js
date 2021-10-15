const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://Phillaty:54704523@cluster0.bxid8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

client.once('open', () => {
     console.log("MONGODB DATABASE CONNECTION ESTABLISHED SUCCESSFULLY");
})

// const uri = process.env.ATLAS_URI;
// mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true}
// );
// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log("MONGODB DATABASE CONNECTION ESTABLISHED SUCCESSFULLY");
// })

app.listen(port, () => {
    console.log(`Servidor na porta: ${port}`);
})