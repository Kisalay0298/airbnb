const express = require('express');
const hostRouter = express.Router();
hostRouter.use(express.json());
const rootDir = require('../utils/pathUtil');
const path = require('path')
const fs = require('fs');

hostRouter.get('/add-home',(req, res) => {
    res.sendFile(path.join(rootDir, 'view', 'addHome.HTML'));
});


hostRouter.post('/submit-home', (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).send('<h1>Bad Request</h1><p>Home Name is required.</p>');
    }
    fs.appendFile('listedHome.json', `${JSON.stringify(body)}\n`, (err)=>{
        if(err){
            console.log(err);
            return res.status(500).send('<h1>Oops! Something went wrong!</h1>');
        }else{
            console.log("Home listed successfully");
            res.sendFile(path.join(rootDir, 'view', 'homeAdded.HTML'));
        }
    })
})


module.exports = hostRouter;