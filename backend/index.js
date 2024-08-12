import express from "express";
import mysql from 'mysql';
import cors from "cors";
import cookieParser from "cookie-parser";
import env from "dotenv";

const app = express ();
const salt =10;
app.use(express.json());
app.use(cors());
app.use(cookieParser());
env.config();
const db = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    database:process.env.DATABASE
});

app.get("/bannar_data",(req,res) => {
    const sql = "SELECT * FROM bannar ";
    db.query(sql,(err,result) => {

        if(err) {
            console.log(err)
            return res.json({Error:err});}

        return res.json(result);
    })
    //return res.json({Status:"Success"});
})

app.put("/update_bannar",(req,res) => {
    const sql = "UPDATE bannar SET duration = ?, alert = ?, description = ? ,link = ?";
    const values =[
        req.body.duration,
        req.body.alert,
        req.body.description,
        req.body.link
    ]
    //query to update the bannar data.
    db.query(sql,values,(err,result) => {

        if(err) {
            console.log(err)
            return res.json({Error:err});}

        
    })
// query to get new updated data of bannar.
    const sql2 = "SELECT * FROM bannar ";
    db.query(sql2,(err,result) => {

        if(err) {
            console.log(err)
            return res.json({Error:err});}

        return res.json(result);
    })
})

//app running on this port
app.listen(process.env,()=>{
console.log("Running...");
})
