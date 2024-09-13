const { Pool } = require('pg');
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '123',
    database: 'likeme', 
    allowExitOnIdle: true
});

const leerPost = async () => {
    const { rows } = await pool.query("SELECT * FROM posts;");
    return rows;
};

const escribir = async (titulo, url, descripcion) => {
    const consulta = "INSERT INTO posts VALUES (DEFAULT, $1, $2, $3, 0)";
    const values = [titulo, url, descripcion];
    await pool.query(consulta, values);
    console.log("Post agregado");
};

// Función paralos likes
const likePost = async (id) => {
    const query = "UPDATE posts SET likes = likes + 1 WHERE id = $1";
    const values = [id];
    await pool.query(query, values);
};

// Función para eliminar un post
const deletePost = async (id) => {
    try {
        const query = "DELETE FROM posts WHERE id = $1";
        const values = [id];
        await pool.query(query, values);
        console.log("Post con ID ${id} eliminado");
    } catch (error) {
        console.log("Error al eliminar el post con ID ${id}: ${error.message}");
        throw error; 
    }
};

module.exports = { leerPost, escribir, likePost, deletePost };