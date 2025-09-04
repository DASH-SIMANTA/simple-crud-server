/**
 * -------------------
 * MongoDB Connection Setup
 * -------------------
 * 1. create account on mongodb.com
 * 2. create a cluster
 * 3. create a database user and password
 * 4. network access -> allow your ip address
 * 5. database -> connect -> driver -
 * > node -> view full code > connect your application -> copy connection string
 * 6. replace <password> with your database user password in the uri
 * -------------------------------
 * 1. create ---------post
 * 2. app.post('/user'/async(req, res)=>{})
 * 3. make the function async to use await inside it
 * 4. make sure you use the express.json() middleware
 * 5. access data from the body: const user = req.body
 * 6. const result = await userCollection.insertOne(user);
 * 7. res.send(result)
 * 
 * -------------------------------
 * CLIENT SIDE
 * 1. fetch('http://localhost:5000/users',
 * 2. add second parameter: {method: 'POST', headers: {'content-type': 'application/json'}, body: JSON.stringify(user)}
 * 3. .then(res => res.json())  .then(data => console.log(data))                        
 * -------------------------------
 * 1. Read/ get data --------get
 * 2. app.get('/users', async(req, res)=>{})        
 * 3. const cursor = userCollection.find();
 * 4. const result = await cursor.toArray();
 * 5. res.send(result);
 * 
 * -------------------------------
 * DELETE
 * ------------------------------
 * 1. Delete a user --------delete
 * 2. app.delete('/users/:id', async(req, res)=>{})
 * 3. const id = req.params.id;
 * 4. const query = {_id: new ObjectId(id)}
 * 5. const result = await userCollection.deleteOne(query);
 * 6. res.send(result);
 *  
 * ------------------------------
 * CLIENT 
 * 1. create dynamic url with id
 * 2. mention the DELETE method
 * 3. fetch(url, {method: 'DELETE'})
 * 4. .then(res => res.json())
 * 5. .then(data => console.log(data))
 * 6. if(data.deletedCount > 0) { ... update the ui by removing the deleted user from the users state }
 * ------------------------------
 *  
 * 
 */
 