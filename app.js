const express=require('express')

const app=express()

//usar dotenv
require('dotenv').config();
const port=process.env.PORT || 3000;


// Body-parser middleware
app.use(express.urlencoded({extended:true}))
// usar jsons
app.use(express.json())


app.use(express.static(__dirname+'/public'))


app.use('/api/users',require('./routers/apiUsers'))
/* app.use('/api/comments',require('./routers/apiComments'))
app.use('/api/news',require('./routers/apiNews')) */


app.listen(port,()=>{
    
    console.log(`servidor a la escucha del ${port}`)
})
