//ENTRY POINT OF YOUR APP
//request is used to make request to some external page
const express=require('express');
const app=express();

const request=require('request');


//Middlewares
app.set("view engine", "ejs");


/*
Routing = On what url what is shown
*/

//test comment

app.get('/', (req,res)=>{
    res.send("Home Page");
})

app.get('/jai',(req,res)=>
{
    res.render("home");
})



app.get('/student/:rollno', (req,res)=>{
    console.log(req);
    console.log(req.params);
    //template string
    
    //notice that those are backticks
    res.send(`you are viwing page for ${req.params.rollno}`);

})

app.get('/result',(req,res)=>{
    console.log(req.query.movieName);
    //res.send(`You searched for Movie, ${req.query.movieName}`);
    const url=`http://www.omdbapi.com/?apikey=85217a30&s=${req.query.movieName}`;
    request(url, function(err,response,body)
    {
        if (!err && response.statusCode===200)
        {
            //converting json to js object
            const data=JSON.parse(body);
            console.log(data);
            //res.send(data);
            //moviesDum is  a JS variable accessible in js
            res.render('result', {moviesDump:data});
        }
        else{
              res.send("Something went wrong");  
        }
    });
}); 

app.listen(3000,()=>{
    console.log("Server has Started");
})