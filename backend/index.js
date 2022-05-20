const Player=require('./models/Player')
const mongoose = require('mongoose');
var cors = require('cors')
var path=require("path") 
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const port = process.env.PORT || 3001

mongoose.connect('mongodb+srv://Adi:nfIVFLkhWFggLUYT@cluster0.ooc4o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',()=>{
        console.log("Connected")
    });

const express = require('express');
const { get } = require('http');
const app = express()
app.use(express.static(path.resolve(__dirname, '../build')));
app.use(cors())
app.use(express.json());
app.get('/api/players', async (req, res) => {
    const s=await Player.find({});
    res.send(s)
})

app.post('/api/addplayer', async (req, res) => {
    console.log(req.body)
    const a= await Player.findOne({ UserID: req.body.UserID})
    if(a===null){
        const silence = new Player({ UserID:req.body.UserID, Username: req.body.Username, Password: req.body.Password});
        const s=await silence.save();
        res.status(200).send("ho gaya add")
    }
    else{
        res.status(200).send("already added")
    }
    
})

app.post('/api/getrank',async (req, res) => {
    console.log(req.body)
    let rank= await getRank(req.body.user,req.body.id)
    res.send(rank)
})

async function getRank(user,id){
    console.log(`https://api.kyroskoh.xyz/valorant/v1/mmr/ap/${user}/${id}`) 
   const response = await fetch(`https://api.kyroskoh.xyz/valorant/v1/mmr/ap/${user}/${id}`, {
   method: 'GET', // *GET, POST, PUT, DELETE, etc.
 });
 const data=await response
 let a=await data.text()
 console.log(a)
 return a
} 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)})