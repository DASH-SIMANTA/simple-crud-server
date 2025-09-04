const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { ObjectId } = require('mongodb');

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
    //specific user
    app.get('/users/:id', async(req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = {_id: new ObjectId(id)};
      const user = await userCollection.findOne(query);
      res.send(user);
    });

    // API: Insert a user
    app.post('/users', async (req, res) => {
      const user = req.body;
      console.log("New User:", user);

      const result = await userCollection.insertOne(user);
      res.send(result);
    });
    // API: Update a user
    app.put('/users/:id', async(req, res) => {
      const id = req.params.id;
      const UpdateUser = req.body;
      console.log(id, UpdateUser);
      const filter = {_id: new ObjectId(id)};
      const options = { upsert: true };
      const updatedUser = {
        $set: {
          name: UpdateUser.name,
          email: UpdateUser.email
        }
      };
      const result = await userCollection.updateOne(filter, updatedUser, options);
      res.send(result);
    });

    // API: Delete a user

    app.delete('/users/:id',async(req, res) => {
      const id = req.params.id;
      console.log("please delete from database:", id);
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
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
