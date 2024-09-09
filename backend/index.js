const { leerPost,escribir } = require("./funciones");
const cors = require("cors");
const express = require("express");
const app = express();

const fs = require("fs");
const { get } = require("http");

const port = 3000;

app.listen(port, () => console.log("servidor escuchando en nuestro puerto 3000!"));

app.use(express.json());
app.use(cors());

app.get("/posts", async (req, res) =>{
    const obtenerPost = await leerPost();
    res.json(obtenerPost);
});

app.post("/posts", async(req,res)=> {
    const {titulo,url,descripcion} =req.body;
    await escribir(titulo,url,descripcion);
    res.send("el post se agrego");
});