const express = require("express");
const app = express();
const fs = require("fs");


class Contenedor{
    constructor (producto){
        this.list = producto;
    }

    async getAll(){
        try{
            const data = await fs.promises.readFile(this.list, "utf-8")
            const objetos = await data ? (JSON.parse(data)) : []
            return objetos;
        } 
        catch(err) {
            console.log(err)
        }
    }
}

const prod = new Contenedor("productos.txt");

app.get("/productos", async (req, res) =>{
    res.json(await prod.getAll());
})

const random = (max) => {
    return Math.floor(Math.random() * (max));
}

app.get('/productoRandom', async (req, res) => {
    let datos = await prod.getAll();
    res.json(datos[random(datos.length)])
})

const PORT = 8080;

app.listen(PORT, () =>{
    console.log(`Servidor http escuchando en el puerto 8080`)
});