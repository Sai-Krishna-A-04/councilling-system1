const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

const password = 'passwordmarchipoku';
const uri = `mongodb+srv://srikanthkadarla5:${password}@cluster0.sek9ked.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongzoDB:', error);
    }
}

connectToDatabase();

const db = client.db('counselling1');
const col = db.collection('register');

app.post('/register', async (req, res) => {
    try {
        const result = await col.insertOne(req.body);
        console.log('Data inserted successfully:', result.ops[0]);
        res.send('Data inserted successfully');
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).send('Internal Server Error');
    }
});

const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
