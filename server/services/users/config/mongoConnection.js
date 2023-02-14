const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ibnusyadzali:G4pakepasswood@cluster0.s2xy49j.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

let db

async function runConnection() {
    try {
        db = client.db('HackShoes')
        return db
    } catch (error) {
        await client.close()
        throw error
    }
}

function getDatabase() {
    return db
}

module.exports = {runConnection, getDatabase}