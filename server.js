const express = require('express');
const app = express();
const port = 5000;
const connectdb = require('./config/connect');
const mongoose = require('mongoose');
const User=require('./model/user')
require('dotenv').config({path:'./config/.env'});





// Function to create many users using async/await
async function createUsers() {
  try {
    const arrayOfUsers = [
      { name: 'Hamza', age: 29 , favoriteFoods: ['Lablebi'] },
      { name: 'Alice', age: 25 , favoriteFoods: ['Pizza'] },
      { name: 'Mary', age: 12 , favoriteFoods: ['burritos'] },
    ];
    const users = await User.create(arrayOfUsers);

    console.log('Users created:', users);
  } catch (err) {
    console.error(err);
  }
}

// Middleware to parse JSON data
app.use(express.json());

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.send({msg:users});
  } catch (error) {
   console.log(error);
  }
});
app.post('/users', async (req, res) => {

 try {
    const newUser = new User(req.body);
    await newUser.save();
    res.send(newUser);
  } catch (error) {
console.log(error);
  }
});
app.put('/users/:id', async (req, res) => {
 try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {name:req.body.name} );
    res.send(updatedUser);
  } 
  catch (error) {
 console.log(error);
  }
});
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    result=await User.findByIdAndRemove(id);
    res.send({ message: result });
  } catch (error) {
 
    console.log(error);
  }
});




//createUsers();
connectdb()
app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server is running on port ${port}`);
  }
})