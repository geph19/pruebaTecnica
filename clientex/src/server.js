const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

//middlwares
app.use(bodyparser.json());
app.use(cors())

//connection to mongo
mongoose.connect('mongodb://localhost:27017/empresax', {
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

//Client Model
const clientSchema = new mongoose.Schema({
    name:String,
    addresses: [{
        street:String,
        city:String,
        country:String
    }]
});

const Client = mongoose.model('client', clientSchema);

//routes
app.get('/clients', async(req, res) => {
    const clients = await Client.find();
    res.json(clients);
});

app.post('/clients', async(req, res) => {
    const newClient = new Client(req.body)
    await newClient.save();
    res.json(newClient)
})

app.get('/clients/:id', async(req, res) => {
    const client = await Client.findById(req.params.id)
    res.json(client);
})

app.put('/clients/:id', async (req, res) => {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(client);
});

app.delete('/clients/:id', async (req, res) => {
    await Client.findByIdAndDelete(res.params.id)
    res.json({ message : 'Client deleted' })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})

