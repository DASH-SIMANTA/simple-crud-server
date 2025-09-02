const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = "mongodb+srv://csesimantadash_db_user:ozP9PqeB8kfg76fh@cluster0.uv6lmjb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("✅ MongoDB Connected");

    // Choose DB + Collection
    // const database = client.db("usersDB");
    // const userCollection = database.collection("users");
    const userCollection = client.db("usersDB").collection("users");

    app.get('/users', async(req, res) => {
      const cursor =userCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // API: Insert a user
    app.post('/users', async (req, res) => {
      const user = req.body;
      console.log("New User:", user);

      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    // API: Get all users
    app.get('/users', async (req, res) => {
      const users = await userCollection.find().toArray();
      res.send(users);
    });

  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err);
  }
}

run().catch(console.dir);

// Root route
app.get('/', (req, res) => {
  res.send('Simple CRUD Server is running');
});

app.listen(port, () => {
  console.log(`🚀 Server running on port: ${port}`);
});
