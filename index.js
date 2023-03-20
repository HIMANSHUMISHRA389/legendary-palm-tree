const express=require('express');
const app=express();
const path=require('path');


//using middlewares
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({extended:true}));


//Setting up view engine
app.set('view engine','ejs');


//all routes
app.get('/',(req,res)=>{
    res.render('index',{title:'HomePage'});
})
app.post('/',(req,res)=>{
    console.log(req.body);
   res.send("posted");
  
})

app.listen(3000,(req,res)=>{
    console.log("Server is up");
})

