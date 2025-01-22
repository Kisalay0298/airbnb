const express = require('express');
const hostRouter = require('./routes/hostRouter');
const userRouter = require('./routes/userRouter');
const rootDir = require('./utils/pathUtil');
const path = require('path');
const app = express();
const port = 2231;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add Home route
app.use(userRouter);
app.use('/host',hostRouter);

app.get('*',(req, res) =>{
    return res.status(404).sendFile(path.join(rootDir, 'view', '404.HTML'))
})


app.listen(port, (err)=>{
    if(err){
        console.log(`Oops! something went wrong.. ${err}`)
    }else{
        console.log(`Server is running on port ${port} URL: http://localhost:${port}`)
    }
})