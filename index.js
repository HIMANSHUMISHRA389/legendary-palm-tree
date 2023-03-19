const express=require('express');
const app=express();



app.set('view engine','ejs');
app.get('/',(req,res)=>{
    res.render('index',{name:'Himanshu',title:'Home Page',message:'welcome to my Node.js application!'});
})

app.listen(3000,(req,res)=>{
    console.log("Nice Work");
})

