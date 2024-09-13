const { leerPost, escribir, likePost, deletePost } = require("./funciones"); // Importar funciones correctamente
const cors = require("cors");
const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => console.log("Servidor escuchando en el puerto 3000!"));

app.use(express.json());
app.use(cors());

app.get("/posts", async (req, res) => {
    try {
        const obtenerPost = await leerPost();
        res.json(obtenerPost);
    } catch (error) {
        console.error("Error al obtener los posts:", error);
        res.status(500).json({ error: "Error al obtener los posts." });
    }
});

app.post("/posts", async (req, res) => {
    try {
        const { titulo, url, descripcion } = req.body;
        await escribir(titulo, url, descripcion);
        res.send("El post se agregó");
    } catch (error) {
        console.error("Error al agregar el post:", error);
        res.status(500).json({ error: "Error al agregar el post." });
    }
});

// Ruta PUT para el número de likes
app.put("/posts/like/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Intentando dar like al post con ID:", id);
        await likePost(id); // Usar la función likePost
        res.send("Post con ID ${id} ha recibido un like.");
    } catch (error) {
        console.error("Error al dar like al post:", error);
        res.status(500).json({ error: "Error al dar like al post." });
    }
});

// Ruta DELETE para eliminar un post
app.delete("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Intentando eliminar el post con ID:", id);
        await deletePost(id); // Usar la función deletePost
        res.send("Post con ID ${id} ha sido eliminado.");
    } catch (error) {
        console.error("Error al eliminar el post:", error);
        res.status(500).json({ error: "Error al eliminar el post." });
    }
});