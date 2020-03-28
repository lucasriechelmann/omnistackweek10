const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

mongoose.connect('mongodb+srv://lucas:lucas@cluster0-okyjv.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

setupWebsocket(server);

app.use(cors());
app.use(express.json());
app.use(routes);
server.listen(3333);