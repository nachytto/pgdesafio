const { Pool } = require('pg');
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '123',
    database: 'likeme', 
    allowExitOnIdle: true
});
const leerPost = async() => {
    const {rows} = await pool.query("SELECT * FROM posts;");
    return rows
};
const escribir= async(
    titulo, url, descripcion
) =>{ 
    const consulta = "INSERT INTO posts values(DEFAULT,$1,$2,$3,0)"
    const values = [titulo, url, descripcion];
    await pool.query(consulta, values);
    console.log("Post agregado");

}
leerPost()
module.exports = {leerPost, escribir}