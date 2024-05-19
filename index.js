const express = require('express')
const app = express()

app.use('/',(req,res)=>{
    res.send('OKOK')
})

app.listen(9001,()=>{
    console.log('running')
})